import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047NPC extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.att = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    schema.vig = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    schema.dam = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });
    
    return schema
  }

  prepareDerivedData() {
    this.arrays = {
      wounds: {
        light: [],
        serious: [],
        lethal: []
      }
    };

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