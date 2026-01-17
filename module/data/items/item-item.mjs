import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Item extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // Defines the quantity of the item in the inventory
    schema.quantity = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
    });

    // Defines the reliability of the item
    // Each time the item is used heavily or damaged, remove 1 from the reliability value (not the max)
    // Each time the item can or can broke, roll a dice and if the result is higher than the reliability, the item is broken)
    schema.reliability = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0, max: 10 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0, max: 10 }),
    });

    // Defines rarity for the loot actions value (criteria)
    schema.rarity = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 3, min: 3, max: 10 }),
      criteria: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2 }),
    });

    // Break down roll formula into three independent fields
    schema.roll = new fields.SchemaField({
      diceNum: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
      diceSize: new fields.StringField({ initial: "d10" }),
      diceBonus: new fields.StringField({ initial: "+@str.mod+ceil(@lvl / 2)" }),
      operator: new fields.StringField({ initial: "<" }),
      difficulty: new fields.StringField({ initial: "7" })
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