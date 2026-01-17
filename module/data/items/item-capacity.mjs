import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Capacity extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // Defines the level of the capacity
    schema.level = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 3 });

    // Defines the difficulty to learn the capacity
    schema.learning = new fields.SchemaField({
      difficulty: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 20 }),
      handicap: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 4 }),
    });

    // Defines the totem attached to the capacity
    schema.totem = new fields.StringField({ required: true, blank: false, initial: 'hum' });

    return schema;
  }
}