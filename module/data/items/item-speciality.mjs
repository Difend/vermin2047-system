import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Speciality extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    // Defines the rarity of the speciality
    schema.rarity = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 2 });

    // Defines the skill where this speciality can apply (speciality is not restricted to 1 skill only)
    schema.skill = new fields.SchemaField({
      value: new fields.StringField({ required: true, blank: false, initial: 'art' })
    });

    return schema;
  }
}