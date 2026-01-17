import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047Party extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const blankString = { required: true, blank: true };
    const schema = super.defineSchema();

    // Defines party level (1, 2 or 3)
    schema.lvl = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 3 }),
    })

    // Defines party totem (Predator, Horde, etc...)
    schema.totem = new fields.SchemaField({
      value: new fields.StringField({ ...blankString }),
    })

    // Defines party reputation (Famous or not)
    schema.reputation = new fields.SchemaField({
      value: new fields.StringField({ ...blankString }),
    })

    // Defines party pool (dices that can be used by characters)
    schema.pool = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0 }),
    })

    // Defines party moral (gives advantages or disaventages)
    schema.moral = new fields.SchemaField({
      value: new fields.StringField({ ...blankString }),
    })

    return schema;
  }

  prepareDerivedData() {
    // Calculate the moral of the party based on the dice pool value
    if(this.pool.value > 6) 
      this.moral.value = 'hig'
    else if (this.pool.value < 7 && this.pool.value > 2) 
      this.moral.value = 'reg'
    else if (this.pool.value < 3 && this.pool.value > 0)
      this.moral.value = 'low'
    else this.moral.value = 'cri'
  }

  getRollData() {
    const data = {};

    return data
  }
}