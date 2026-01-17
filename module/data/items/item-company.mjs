import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Company extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    
    const schema = super.defineSchema();

    // Defines the workforce of the Company (number of people inside the company)
    schema.workforce = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1 });

    // Defines the speciality of the company (gives +1D in bonus for skill)
    schema.speciality = new fields.StringField({ initial: '' });

    // Defines the number of dices sent for the skill roll
    schema.pool = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 1 });

    return schema;
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    data.pool = foundry.utils.deepClone(this.pool);

    return data
  }
}