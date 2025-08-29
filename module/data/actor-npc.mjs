import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047NPC extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.att = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    schema.vig = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    schema.dam = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    
    return schema
  }

  prepareDerivedData() {
    this.xp = this.cr * this.cr * 100;
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