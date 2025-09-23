import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Capacity extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.level = new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 3 });

    schema.learning = new fields.SchemaField({
      difficulty: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 20 }),
      handicap: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 4 }),
    });

    schema.totem = new fields.StringField({ required: true, blank: false, initial: 'hum' });

    return schema;
  }
}