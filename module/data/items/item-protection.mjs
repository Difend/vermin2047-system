import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Protection extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    /* Defines the index of protection
     * value: number of standard damage reduced
     * special: number of damage reduced (value) for the specified type (type)
     * Type of damage can be shock (S), blade (L), fire (F) or bullet (B)
     */
    schema.index = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 10 }),
      special: new fields.SchemaField({
        value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 10 }),
        type: new fields.StringField({ required: true, blank: false, initial: 'sho' })
      })
    });

    // Defines the reliability of the protection, value is reduced by 1 each time a damage is absorbed
    schema.reliability = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 10 }),
      max: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 10 }),
    });

    // Defines the mobility handicap for the protection. 0 = no handicap, 3 = high handicap
    schema.mobility = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 3 }),
    });

    // Defines rarity for the loot actions value (criteria). It is the skill check required to find the item compared to the rarity of the item into the location.
    schema.rarity = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 3, max: 10 }),
      criteria: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 2 }),
    });

    return schema;
  }
}