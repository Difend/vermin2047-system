import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class Vermin2047ActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['vermin-2047', 'sheet', 'actor'],
      width: 600,
      height: 600,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'features',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/vermin-2047/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();


    // Use a safe clone of the actor data for further operations.
    const actorData = this.document.toPlainObject();

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Adding a pointer to CONFIG.VERMIN_2047
    context.config = CONFIG.VERMIN_2047;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Enrich biography info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedBiography = await TextEditor.enrichHTML(
      this.actor.system.biography,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.actor.getRollData(),
        // Relative UUID resolution
        relativeTo: this.actor,
      }
    );

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Character-specific context modifications
   *
   * @param {object} context The context object to mutate
   */
  _prepareCharacterData(context) {
    // This is where you can enrich character-specific editor fields
    // or setup anything else that's specific to this type
  }

  /**
   * Organize and classify Items for Actor sheets.
   *
   * @param {object} context The context object to mutate
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const special = [];
    const injuries = [];
    const weapons = [];
    const protections = [];
    const specialities = [];
    

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;

      switch(i.type) {
        case 'item':
        case 'consumable':
        case 'tool':
          gear.push(i);
          break;
        case 'special':
        case 'capacity':
          special.push(i);
          break;
        case 'injury':
        case 'disease':
          injuries.push(i);
          break;
        case 'weapon':
          weapons.push(i);
          break;
        case 'protection':
          protections.push(i);
          break;
        case 'speciality':
          specialities.push(i);
          break;
        default:
          gear.push(i);
      }
    }

    // Assign and return
    context.gear = gear;
    context.special = special;
    context.injuries = injuries;
    context.weapons = weapons;
    context.protections = protections;
    context.specialities = specialities;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    html.find('.check-pool').click(ev => {
      let harmValue = parseInt(ev.target.value)
      switch(ev.target.name) {
        case 'wounds.light.value':
          if(this.actor.system.wounds.light.value == harmValue)
            this.actor.update({'system.wounds.light.value': harmValue-1});
          else
            this.actor.update({'system.wounds.light.value': harmValue});
          break;
        case 'wounds.serious.value':
          if(this.actor.system.wounds.serious.value == harmValue)
            this.actor.update({'system.wounds.serious.value': harmValue-1});
          else
            this.actor.update({'system.wounds.serious.value': harmValue});
          break;
        case 'wounds.lethal.value':
          if(this.actor.system.wounds.lethal.value == harmValue)
            this.actor.update({'system.wounds.lethal.value': harmValue-1});
          else
            this.actor.update({'system.wounds.lethal.value': harmValue});
          break;
        case 'pools.ner.value':
          if(this.actor.system.pools.ner.value == harmValue)
            this.actor.update({'system.pools.ner.value': harmValue-1});
          else
            this.actor.update({'system.pools.ner.value': harmValue});
          break;
        case 'pools.str.value':
          if(this.actor.system.pools.str.value == harmValue)
            this.actor.update({'system.pools.str.value': harmValue-1});
          else
            this.actor.update({'system.pools.str.value': harmValue});
          break;
      }
    })

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Rollable abilities.
    html.on('click', '.skill-check', this._onSkillCheck.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

    /**
   * Handle clickable rolls for skills.
   * @param {Event} event   The originating click event
   * @private
   */
  async _onSkillCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    console.log(dataset)

    const fields = foundry.applications.fields;

    const textInput = fields.createNumberInput({
      name: 'bonus',
      value: 0
    });

    const textGroup = fields.createFormGroup({
      input: textInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Bonus')
    });

    const selectInput = fields.createSelectInput({
      options: [
        {
          label: game.i18n.localize('VERMIN_2047.Trait.Vig'),
          value: '(@vig.mod)d10'
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Acc'),
          value: '(@acc.mod)d10'
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Kno'),
          value: '(@kno.mod)d10'
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Wil'),
          value: '(@wil.mod)d10'
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Hea'),
          value: '(@hea.mod)d10'
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Ref'),
          value: '(@ref.mod)d10'
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Per'),
          value: '(@per.mod)d10'
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Emp'),
          value: '(@emp.mod)d10'
        }
      ],
      name: 'trait'
    })

    const selectGroup = fields.createFormGroup({
      input: selectInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Trait')
    })

    const content = `${selectGroup.outerHTML} ${textGroup.outerHTML}`

    const results =  await foundry.applications.api.DialogV2.input({
      window: { title: game.i18n.localize('VERMIN_2047.Labels.SkillCheck')+': '+dataset.label },
      content: content,
      ok: {
        label: game.i18n.localize('VERMIN_2047.Labels.Roll'),
        icon: "fa-solid fa-dice",
      }
    })

    if(results.bonus==null) results.bonus=0;
    const test = results.trait+'+'+dataset.roll+'+'+results.bonus+'d10'

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `${dataset.label}` : '';
      let roll = new Roll(test, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }
}
