import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047Party extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.lvl = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 3 })
    })
    schema.totem = new fields.SchemaField({
      value: new fields.StringField({ initial: '' }),
    })

    schema.pool = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0 }),
    })
    schema.moral = new fields.SchemaField({
      value: new fields.StringField({ initial: '' }),
    })
    schema.reputation = new fields.SchemaField({
      value: new fields.StringField({ initial: '' }),
    })

    return schema;
  }

  prepareDerivedData() {
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