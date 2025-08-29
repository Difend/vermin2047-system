import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047Character extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const requiredString = { required: true, blank: false };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    schema.arc = new fields.SchemaField({
      value: new fields.StringField({ initial: '' })
    });

    schema.identity = new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.identity).reduce((obj, info) => {
      obj[info] = new fields.SchemaField({
        value: new fields.StringField({ initial: '' })
      });
      return obj;
    }, {}));

    // Iterate over pools names and create a new SchemaField for each.
    schema.pools = new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.pools).reduce((obj, pool) => {
      obj[pool] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
        total: new fields.NumberField({ ...requiredInteger, initial: 4, min: 4, max: 10 })
      });
      return obj;
    }, {}));

    // Iterate over traits names and create a new SchemaField for each.
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

  prepareBaseData() {

  }

  prepareDerivedData() {

    for(const key in this.traits) {
      // Handle ability label localization.
      this.traits[key].label = game.i18n.localize(CONFIG.VERMIN_2047.traits[key]) ?? key;
      this.traits[key].mod = this.traits[key].value;
    }

    // Loop through domain scores, and add their modifiers to our sheet output.
    for(const key in this.domains) {
      // Handle ability label localization.
      this.domains[key].label = game.i18n.localize(CONFIG.VERMIN_2047.domains[key]) ?? key;
      for(const key2 in this.domains[key].skills) {
        // Handle ability label localization.
        this.domains[key].skills[key2].label = game.i18n.localize(CONFIG.VERMIN_2047.skills[key2]) ?? key;

        // Add modifier and reroll according to skill level and area of expertise
        switch(this.domains[key].skills[key2].value) {
          case 'non':
            this.domains[key].skills[key2].mod = 0 + this.domains[key].value;
            this.domains[key].skills[key2].rer = 0;
            break;
          case 'beg':
            this.domains[key].skills[key2].mod = 1 + this.domains[key].value;
            this.domains[key].skills[key2].rer = 0;
            break;
          case 'adv':
            this.domains[key].skills[key2].mod = 1 + this.domains[key].value;
            this.domains[key].skills[key2].rer = 1;
            break;
          case 'exp':
            this.domains[key].skills[key2].mod = 2 + this.domains[key].value;
            this.domains[key].skills[key2].rer = 1;
            break;
          case 'mas':
            this.domains[key].skills[key2].mod = 2 + this.domains[key].value;
            this.domains[key].skills[key2].rer = 2;
            break;
          default:
            this.domains[key].skills[key2].mod = 0 + this.domains[key].value;
            this.domains[key].skills[key2].rer = 0;
            break;
        }
      }
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
      for (const i in this.domains) {
        for (let [k,v] of Object.entries(this.domains[i].skills)) {
          data[k] = foundry.utils.deepClone(v);
        }
      }
    }

    console.log(data)
    data.lvl = this.attributes.level.value;

    return data
  }
}