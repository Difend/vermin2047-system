import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Speciality extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.specialityRarity = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 2 });

    return schema;
  }
}