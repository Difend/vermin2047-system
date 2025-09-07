import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Protection extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.index = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 10 }),
      special: new fields.SchemaField({
        value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 10 }),
        type: new fields.StringField({ required: true, blank: false, initial: 'sho' })
      })
    });

    schema.reliability = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 10 }),
    });

    schema.mobility = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 3 }),
    });

    // Defines rarity for the loot actions value (criteria)
    schema.rarity = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 3, max: 10 }),
      criteria: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 2 }),
    });

    return schema;
  }
}