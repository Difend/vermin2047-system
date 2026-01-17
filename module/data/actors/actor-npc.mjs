import Vermin2047HumanBase from "./base-human.mjs";

export default class Vermin2047NPC extends Vermin2047HumanBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // Defines NPC attack, vigor and damage values
    schema.att = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    schema.vig = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    schema.dam = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    
    return schema
  }

  prepareDerivedData() {
    // Set empty wounds arrays (no pools for NPC)
    this.arrays = {
      wounds: {
        light: [],
        serious: [],
        lethal: []
      }
    };

    // Filling empty wounds arrays with 0 or 1 depending on the current wounds values
    for(let i = 1; i <= this.wounds.light.limit; i++) {
      this.arrays.wounds.light[i] = (i <= this.wounds.light.value)
    }
    for(let i = 1; i <= this.wounds.serious.limit; i++) {
      this.arrays.wounds.serious[i] = (i <= this.wounds.serious.value)
    }
    for(let i = 1; i <= this.wounds.lethal.limit; i++) {
      this.arrays.wounds.lethal[i] = (i <= this.wounds.lethal.value)
    }
  }

  getRollData() {
    const data = {};

    // Copy the traits scores to the top level, so that rolls can use
    // formulas like `@vig`.
    data.att = this.att;
    data.vig = this.vig;

    return data
  }
}