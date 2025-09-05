import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Weapon extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.skill = new fields.SchemaField({
      value: new fields.StringField({ required: true, blank: false, initial: 'art' })
    });

    schema.damage = new fields.SchemaField({
      amount: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 20 }),
      type: new fields.StringField({ required: true, blank: false, initial: 'sho' }),
    });

    // 3 ranges (unit in meters):
    // - short: included between 0 and max_short
    // - medium: included between max_short and max_medium
    // - long: included between max_medium and infinite
    schema.range = new fields.SchemaField({
      max_short: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 200 }),
      max_medium: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 200 }),
    });

    // Defines rarity for the loot actions value (criteria)
    schema.rarity = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 3, max: 10 }),
      criteria: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 2 }),
    });

    return schema;
  }

  getRollData() {
    const data = {};

    switch(this.skill.value) {
        case 'fir':
          data.formula = '@acc+@fir';  
          break;
        case 'ran':
          data.formula = '@acc+@ran';  
          break;
        case 'thr':
          data.formula = '@vig+@thr';  
          break;
        case 'clo':
          data.formula = '@vig+@clo';  
          break;
        case 'bra':
          data.formula = '@vig+@bra';  
          break;
        default:
          data.formula = '@vig'
    }

    return data
  }
}