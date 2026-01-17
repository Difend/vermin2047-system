import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Disease extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // Defines the infectiousness of the disease (Health trait check against virulence)
    schema.virulence = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0, max: 10 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0, max: 10 }),
    });

    // Defines the symptoms of the disease
    schema.symptoms = new fields.StringField({ required: true, blank: true, initial: '' });

    // Defines how much treatment or days are required to cure the disease
    schema.healing = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 10 }),
      total: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0, max: 10 }),
    });

    return schema;
  }
}