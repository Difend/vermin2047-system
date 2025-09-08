import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Item extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.quantity = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0 }),
      max: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1 }),
    });

    schema.reliability = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 10 }),
      max: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 10 }),
    });

    // Defines rarity for the loot actions value (criteria)
    schema.rarity = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 3, max: 10 }),
      criteria: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 2 }),
    });

    // Break down roll formula into three independent fields
    schema.roll = new fields.SchemaField({
      diceNum: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
      diceSize: new fields.StringField({ initial: "d10" }),
      diceBonus: new fields.StringField({ initial: "+@str.mod+ceil(@lvl / 2)" })
    })

    schema.formula = new fields.StringField({ blank: true });

    return schema;
  }

  prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    const roll = this.roll;

    this.formula = `(${roll.diceNum})${roll.diceSize}${roll.diceBonus}`
  }
}