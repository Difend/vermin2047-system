import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Disease extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.virulence = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 0, max: 10 }),
      max: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 0, max: 10 }),
    });

    schema.symptoms = new fields.StringField({ required: true, blank: true, initial: '' });

    schema.healing = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 10 }),
      total: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 5, min: 0, max: 10 }),
    });

    return schema;
  }
}