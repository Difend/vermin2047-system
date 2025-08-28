import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047Character extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredString = { required: true, blank: false };
    const schema = super.defineSchema();
    
    this.choices = {0: "Choice A", 1: "Choice B"};

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.traits = new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.traits).reduce((obj, trait) => {
      obj[trait] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0, max: 3 }),
      });
      return obj;
    }, {}));

    schema.domains = new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.domains).reduce((obj, domain) => {
      obj[domain] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0 }),
        skills: new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.domainSkills[domain]).reduce((obj, skill) => {
          obj[skill] = new fields.SchemaField({
            value: new fields.StringField({ ...requiredString, initial: 'non'})
          });
          return obj;
        }, {}))
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    // Loop through ability scores, and add their modifiers to our sheet output.
    for(const key in this.traits) {
      // Handle ability label localization.
      this.traits[key].label = game.i18n.localize(CONFIG.VERMIN_2047.traits[key]) ?? key;
    }

    // Loop through ability scores, and add their modifiers to our sheet output.
    for(const key in this.domains) {
      // Handle ability label localization.
      this.domains[key].label = game.i18n.localize(CONFIG.VERMIN_2047.domains[key]) ?? key;
    }
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.traits) {
      for (let [k,v] of Object.entries(this.traits)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    if (this.domains) {
      for (let [k,v] of Object.entries(this.domains)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    data.lvl = this.attributes.level.value;

    return data
  }
}