import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Company extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.workforce = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1 });
    schema.speciality = new fields.StringField({ initial: '' });
    schema.pool = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 1 });

    return schema;
  }
}