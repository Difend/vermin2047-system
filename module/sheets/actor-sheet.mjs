import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';
import { FeatureRoll, ExperienceRoll, FightRoll, DefenseRoll, NpcRoll } from '../rolls/_module.mjs';

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

    // Prepare NPC, party and community data and items.
    if (actorData.type == 'npc' || actorData.type == 'party' || actorData.type == 'community') {
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
    const objectives = [];
    const companies = [];
    const figures = [];
    

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
        case 'objective':
          objectives.push(i);
          break;
        case 'company':
          companies.push(i)
          break;
        case 'figure':
          figures.push(i)
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
    context.objectives = objectives;
    context.companies = companies;
    context.figures = figures;
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

    // Rollable default abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Rollable skills abilities.
    html.on('click', '.skill-check', this._onFeatureCheck.bind(this));

    // Rollable traits abilities.
    html.on('click', '.trait-check', this._onFeatureCheck.bind(this));

    // Rollable experience gains.
    html.on('click', '.experience-test', this._onExperienceCheck.bind(this));

    // Rollable attacks.
    html.on('click', '.fight-roll', this._onFightRoll.bind(this));

    // Rollable defense.
    html.on('click', '.defense-roll', this._onDefenseRoll.bind(this));

    // Rollable NPC actions.
    html.on('click', '.npc-roll', this._onNpcRoll.bind(this));

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

  getFeatureModalContent(displayTraits) {
    const fields = foundry.applications.fields;

    const bonusGroup = fields.createFormGroup({
      input: fields.createNumberInput({ name: 'bonus', value: 0}),
      label: game.i18n.localize('VERMIN_2047.Labels.Bonus')
    });

    const difficultyInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.difficulty),
      name: 'difficulty'
    })

    const difficultyGroup = fields.createFormGroup({
      input: difficultyInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Difficulty')
    });

    const handicapInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.handicaps),
      name: 'handicap'
    })

    const handicapGroup = fields.createFormGroup({
      input: handicapInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Handicap')
    });

    if(displayTraits) {
      const traitInput = fields.createSelectInput({
        options: [
          {
            label: game.i18n.localize('VERMIN_2047.Trait.Vig'),
            value: '@vig.mod;'+game.i18n.localize('VERMIN_2047.Trait.Vig')
          }, {
            label: game.i18n.localize('VERMIN_2047.Trait.Acc'),
            value: '@acc.mod;'+game.i18n.localize('VERMIN_2047.Trait.Acc')
          }, {
            label: game.i18n.localize('VERMIN_2047.Trait.Kno'),
            value: '@kno.mod;'+game.i18n.localize('VERMIN_2047.Trait.Kno')
          }, {
            label: game.i18n.localize('VERMIN_2047.Trait.Wil'),
            value: '@wil.mod;'+game.i18n.localize('VERMIN_2047.Trait.Wil')
          }, {
            label: game.i18n.localize('VERMIN_2047.Trait.Hea'),
            value: '@hea.mod;'+game.i18n.localize('VERMIN_2047.Trait.Hea')
          }, {
            label: game.i18n.localize('VERMIN_2047.Trait.Ref'),
            value: '@ref.mod;'+game.i18n.localize('VERMIN_2047.Trait.Ref')
          }, {
            label: game.i18n.localize('VERMIN_2047.Trait.Per'),
            value: '@per.mod;'+game.i18n.localize('VERMIN_2047.Trait.Per')
          }, {
            label: game.i18n.localize('VERMIN_2047.Trait.Emp'),
            value: '@emp.mod;'+game.i18n.localize('VERMIN_2047.Trait.Emp')
          }
        ],
        name: 'trait'
      })

      const traitGroup = fields.createFormGroup({
        input: traitInput,
        label: game.i18n.localize('VERMIN_2047.Labels.Trait'),
      })

      return `${traitGroup.outerHTML} ${bonusGroup.outerHTML} ${difficultyGroup.outerHTML} ${handicapGroup.outerHTML}`
    }

    return `${bonusGroup.outerHTML} ${difficultyGroup.outerHTML} ${handicapGroup.outerHTML}`
  }

  getExperienceModalContent(expDices) {
    const fields = foundry.applications.fields;

    const poolGroup = fields.createFormGroup({
      input: fields.createNumberInput({ name: 'pool', value: expDices, max: expDices}),
      label: game.i18n.localize('VERMIN_2047.Labels.Pool')
    });

    const difficultyInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.difficulty),
      name: 'difficulty'
    })

    const difficultyGroup = fields.createFormGroup({
      input: difficultyInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Difficulty')
    });

    const handicapInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.handicaps),
      name: 'handicap'
    })

    const handicapGroup = fields.createFormGroup({
      input: handicapInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Handicap')
    });

    /*
    const skillInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.skills),
      name: 'skills'
    })

    const skillGroup = fields.createFormGroup({
      input: skillInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Skill')
    })

    const skillLevelInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.skillValues),
      name: 'skillLevels'
    })

    const skillLevelGroup = fields.createFormGroup({
      input: skillLevelInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Level')
    })
      
    ${skillGroup.outerHTML} ${skillLevelGroup.outerHTML}*/

    return `${poolGroup.outerHTML} ${difficultyGroup.outerHTML} ${handicapGroup.outerHTML}`
  }

  getFightModalContent(maxShortRange, maxMediumRange) {
    const fields = foundry.applications.fields;

    let difficultyConfig = CONFIG.VERMIN_2047.range
    let difficultyLabel = 'VERMIN_2047.Labels.Range'
    let handicapConfig = CONFIG.VERMIN_2047.cover
    let handicapLabel = 'VERMIN_2047.Labels.Cover'

    const bonusGroup = fields.createFormGroup({
      input: fields.createNumberInput({ name: 'bonus', value: 0}),
      label: game.i18n.localize('VERMIN_2047.Labels.Bonus')
    });

    if(parseInt(maxShortRange)==0 && parseInt(maxMediumRange)==0) {
      difficultyConfig = CONFIG.VERMIN_2047.difficulty
      difficultyLabel = 'VERMIN_2047.Labels.Difficulty'
      handicapConfig = CONFIG.VERMIN_2047.handicaps
      handicapLabel = 'VERMIN_2047.Labels.Handicap'
    }

    const traitInput = fields.createSelectInput({
      options: [
        {
          label: game.i18n.localize('VERMIN_2047.Trait.Vig'),
          value: '@vig.mod;'+game.i18n.localize('VERMIN_2047.Trait.Vig')
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Acc'),
          value: '@acc.mod;'+game.i18n.localize('VERMIN_2047.Trait.Acc')
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Kno'),
          value: '@kno.mod;'+game.i18n.localize('VERMIN_2047.Trait.Kno')
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Wil'),
          value: '@wil.mod;'+game.i18n.localize('VERMIN_2047.Trait.Wil')
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Hea'),
          value: '@hea.mod;'+game.i18n.localize('VERMIN_2047.Trait.Hea')
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Ref'),
          value: '@ref.mod;'+game.i18n.localize('VERMIN_2047.Trait.Ref')
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Per'),
          value: '@per.mod;'+game.i18n.localize('VERMIN_2047.Trait.Per')
        }, {
          label: game.i18n.localize('VERMIN_2047.Trait.Emp'),
          value: '@emp.mod;'+game.i18n.localize('VERMIN_2047.Trait.Emp')
        }
      ],
      name: 'trait'
    })

    const traitGroup = fields.createFormGroup({
      input: traitInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Trait'),
    })

    const difficultyInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(difficultyConfig),
      name: 'difficulty'
    })

    const handicapInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(handicapConfig),
      name: 'handicap'
    })

    const difficultyGroup = fields.createFormGroup({
      input: difficultyInput,
      label: game.i18n.localize(difficultyLabel)
    });

    const handicapGroup = fields.createFormGroup({
      input: handicapInput,
      label: game.i18n.localize(handicapLabel)
    });

    return `${traitGroup.outerHTML} ${bonusGroup.outerHTML} ${difficultyGroup.outerHTML} ${handicapGroup.outerHTML}`
  }

  getDefenseModalContent() {
    const fields = foundry.applications.fields;

    const bonusGroup = fields.createFormGroup({
      input: fields.createNumberInput({ name: 'bonus', value: 0}),
      label: game.i18n.localize('VERMIN_2047.Labels.Bonus')
    });

    const skillInput = fields.createSelectInput({
      options: [
        {
          label: game.i18n.localize('VERMIN_2047.Skill.Fir'),
          value: '@wea.skills.fir;'+game.i18n.localize('VERMIN_2047.Skill.Fir')
        }, {
          label: game.i18n.localize('VERMIN_2047.Skill.Ran'),
          value: '@wea.skills.ran;'+game.i18n.localize('VERMIN_2047.Skill.Ran')
        }, {
          label: game.i18n.localize('VERMIN_2047.Skill.Thr'),
          value: '@wea.skills.thr;'+game.i18n.localize('VERMIN_2047.Skill.Thr')
        }, {
          label: game.i18n.localize('VERMIN_2047.Skill.Clo'),
          value: '@wea.skills.clo;'+game.i18n.localize('VERMIN_2047.Skill.Clo')
        }, {
          label: game.i18n.localize('VERMIN_2047.Skill.Bra'),
          value: '@wea.skills.bra;'+game.i18n.localize('VERMIN_2047.Skill.Bra')
        }
      ],
      name: 'skill'
    })

    const skillGroup = fields.createFormGroup({
      input: skillInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Skill'),
    })

    const difficultyInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.difficulty),
      name: 'difficulty'
    })

    const handicapInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.handicaps),
      name: 'handicap'
    })

    const difficultyGroup = fields.createFormGroup({
      input: difficultyInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Difficulty')
    });

    const handicapGroup = fields.createFormGroup({
      input: handicapInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Handicap')
    });

    return `${skillGroup.outerHTML} ${bonusGroup.outerHTML} ${difficultyGroup.outerHTML} ${handicapGroup.outerHTML}`
  }

  getNpcModalContent() {
const fields = foundry.applications.fields;

    const bonusGroup = fields.createFormGroup({
      input: fields.createNumberInput({ name: 'bonus', value: 0}),
      label: game.i18n.localize('VERMIN_2047.Labels.Bonus')
    });

    const difficultyInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.difficulty),
      name: 'difficulty'
    })

    const handicapInput = fields.createSelectInput({
      options: this.getOptionsFromConfig(CONFIG.VERMIN_2047.handicaps),
      name: 'handicap'
    })

    const difficultyGroup = fields.createFormGroup({
      input: difficultyInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Difficulty')
    });

    const handicapGroup = fields.createFormGroup({
      input: handicapInput,
      label: game.i18n.localize('VERMIN_2047.Labels.Handicap')
    });

    return `${bonusGroup.outerHTML} ${difficultyGroup.outerHTML} ${handicapGroup.outerHTML}`
  }

  getOptionsFromConfig(fullPath) {
    let optionsValues = []
    Object.entries(fullPath).forEach(([key, value]) => {
      optionsValues.push({
        label: game.i18n.localize(value),
        value: key
      })
    });
    return optionsValues;
  }

  /**
   * Handle clickable rolls for features (traits and skills).
   * @param {Event} event   The originating click event
   * @private
   */
  async _onFeatureCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    event.handleObj.selector == '.skill-check'

    const results =  await foundry.applications.api.DialogV2.input({
      window: { title: (event.handleObj.selector == '.skill-check') ? game.i18n.localize('VERMIN_2047.Labels.SkillCheck')+': '+dataset.label : game.i18n.localize('VERMIN_2047.Labels.TraitCheck')+': '+dataset.label},
      content: this.getFeatureModalContent((event.handleObj.selector == '.skill-check')),
      ok: {
        label: game.i18n.localize('VERMIN_2047.Labels.Roll'),
        icon: "fa-solid fa-dice",
      }
    })

    if(results) {
      if(results.bonus==null) results.bonus=0;
      const options = {difficulty: results.difficulty, handicap: results.handicap}
      if(results.trait!=null) {
        const split = results.trait.split(';')
        dataset.label = split[1]+'+'+dataset.label;
        results.trait = split[0];
      }

      // Handle rolls that supply the formula directly.
      if (dataset.roll) {
        let label = (event.handleObj.selector == '.skill-check') ? game.i18n.localize('VERMIN_2047.Labels.SkillCheck')+`: ${dataset.label}` : game.i18n.localize('VERMIN_2047.Labels.TraitCheck')+`: ${dataset.label}`;
        let roll = new FeatureRoll((event.handleObj.selector == '.skill-check') ? `(${results.trait}+${dataset.roll}.mod+${results.bonus})d10x${dataset.roll}.rer<${parseInt(results.difficulty)}` : `(${dataset.roll}.mod+${results.bonus})d10<${parseInt(results.difficulty)}`, this.actor.getRollData(), options);
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          flavor: label,
          rollMode: game.settings.get('core', 'rollMode'),
        });
        return roll;
      }
    }
  }

  /**
   * Handle clickable rolls for experience (skills only)
   * @param {Event} event   The originating click event
   * @private
   */
  async _onExperienceCheck(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    event.handleObj.selector == '.experience-test'

    const results =  await foundry.applications.api.DialogV2.input({
      window: { title: game.i18n.localize('VERMIN_2047.Labels.ExperienceRoll')},
      content: this.getExperienceModalContent(parseInt(dataset.pool), dataset.age),
      ok: {
        label: game.i18n.localize('VERMIN_2047.Labels.Roll'),
        icon: "fa-solid fa-dice",
      }
    })

    if(results) {
      // TODO: CONFIG.VERMIN_2047.skillRarity[results.skill] - Adding experience roll for skills
      const options = {difficulty: results.difficulty, handicap: results.handicap}
      // Handle rolls that supply the formula directly.
      if (dataset.pool) {
        let label = game.i18n.localize('VERMIN_2047.Labels.ExperienceRoll');
        let roll = new ExperienceRoll(`(${results.pool})d10<${parseInt(results.difficulty)}`, this.actor.getRollData(), options);

        // After the roll, even if it fails, remove the XP dices
        this.actor.update({'system.exp.value': this.actor.system.exp.value-results.pool})
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          flavor: label,
          rollMode: game.settings.get('core', 'rollMode'),
        });
        return roll;
      }
    }
  }

  /**
   * Handle clickable rolls for attacks
   * @param {Event} event   The originating click event
   * @private
   */
  async _onFightRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    event.handleObj.selector == '.fight-roll'

    switch(dataset.skill) {
      case 'fir':
        dataset.skill = '@wea.skills.fir;'+game.i18n.localize('VERMIN_2047.Skill.Fir')
        break;
      case 'clo':
        dataset.skill = '@wea.skills.clo;'+game.i18n.localize('VERMIN_2047.Skill.Clo')
        break;
      case 'ran':
        dataset.skill = '@wea.skills.ran;'+game.i18n.localize('VERMIN_2047.Skill.Ran')
        break;
      case 'thr':
        dataset.skill = '@wea.skills.thr;'+game.i18n.localize('VERMIN_2047.Skill.Thr')
        break;
      case 'bra':
      default:
        dataset.skill = '@wea.skills.bra;'+game.i18n.localize('VERMIN_2047.Skill.Bra')
        break;
    }    

    const results =  await foundry.applications.api.DialogV2.input({
      window: { title: game.i18n.localize('VERMIN_2047.Labels.FightRoll')},
      content: this.getFightModalContent(dataset.maxShortRange, dataset.maxMediumRange),
      ok: {
        label: game.i18n.localize('VERMIN_2047.Labels.Roll'),
        icon: "fa-solid fa-dice",
      }
    })

    if(results) {
      const trait_split = results.trait.split(';')
      const skill_split = dataset.skill.split(';')
      results.trait = trait_split[0];
      results.skill = skill_split[0];

      const options = {difficulty: results.difficulty, handicap: results.handicap}
      // Handle rolls that supply the formula directly.
      if (dataset.skill) {
        let label = game.i18n.localize('VERMIN_2047.Labels.FightRoll')+": "+trait_split[1]+'+'+skill_split[1];
        let roll = new FightRoll(`(${results.trait}+${results.skill}.mod+${results.bonus})d10x${results.skill}.rer<${parseInt(results.difficulty)}`, this.actor.getRollData(), options);
        
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          flavor: label,
          rollMode: game.settings.get('core', 'rollMode'),
        });
        return roll;
      }
    }
  }

  /**
   * Handle clickable rolls for defense
   * @param {Event} event   The originating click event
   * @private
   */
  async _onDefenseRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    event.handleObj.selector == '.defense-roll'

    const results =  await foundry.applications.api.DialogV2.input({
      window: { title: game.i18n.localize('VERMIN_2047.Labels.DefenseRoll')},
      content: this.getDefenseModalContent(),
      ok: {
        label: game.i18n.localize('VERMIN_2047.Labels.Roll'),
        icon: "fa-solid fa-dice",
      }
    })

    switch(dataset.trait) {
      case 'vig':
        dataset.trait = '@vig.mod;'+game.i18n.localize('VERMIN_2047.Trait.Vig')
        dataset.label = game.i18n.localize('VERMIN_2047.Labels.Parry')
        break;
      case 'ref':
      default:
        dataset.trait = '@ref.mod;'+game.i18n.localize('VERMIN_2047.Trait.Ref')
        dataset.label = game.i18n.localize('VERMIN_2047.Labels.Dodge')
        break;
    }  

    if(results) {
      const trait_split = dataset.trait.split(';')
      const skill_split = results.skill.split(';')
      results.trait = trait_split[0];
      results.skill = skill_split[0];

      const options = {difficulty: results.difficulty, handicap: results.handicap}
      // Handle rolls that supply the formula directly.
      if (dataset.trait) {
        let label = game.i18n.localize('VERMIN_2047.Labels.DefenseRoll')+" ("+dataset.label+"): "+trait_split[1]+'+'+skill_split[1];
        let roll = new DefenseRoll(`(${results.trait}+${results.skill}.mod+${results.bonus})d10x${dataset.skill}.rer<${parseInt(results.difficulty)}`, this.actor.getRollData(), options);
        
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          flavor: label,
          rollMode: game.settings.get('core', 'rollMode'),
        });
        return roll;
      }
    }
  }

  /**
   * Handle clickable rolls for defense
   * @param {Event} event   The originating click event
   * @private
   */
  async _onNpcRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;
    event.handleObj.selector == '.npc-roll'

    const results =  await foundry.applications.api.DialogV2.input({
      window: { title: game.i18n.localize('VERMIN_2047.Labels.NpcRoll')},
      content: this.getNpcModalContent(),
      ok: {
        label: game.i18n.localize('VERMIN_2047.Labels.Roll'),
        icon: "fa-solid fa-dice",
      }
    })

    if(results) {

      const options = {difficulty: results.difficulty, handicap: results.handicap}
      // Handle rolls that supply the formula directly.
      if (dataset.roll) {
        let label = game.i18n.localize('VERMIN_2047.Labels.NpcRoll')+": "+dataset.label
        let roll = new NpcRoll(`(${dataset.roll}+${results.bonus})d10<${parseInt(results.difficulty)}`, this.actor.getRollData(), options);
        
        roll.toMessage({
          speaker: ChatMessage.getSpeaker({ actor: this.actor }),
          flavor: label,
          rollMode: game.settings.get('core', 'rollMode'),
        });
        return roll;
      }
    }
  }
}
