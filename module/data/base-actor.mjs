import Vermin2047DataModel from "./base-model.mjs";

export default class Vermin2047ActorBase extends Vermin2047DataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.wounds = new fields.SchemaField({
      light: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        limit: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        threshold: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 })
      }),
      serious: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        limit: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
        threshold: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 })
      }),
      lethal: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        limit: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
        threshold: new fields.NumberField({ ...requiredInteger, initial: 8, min: 0 })
      })
    })

    schema.health = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 10, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 10 })
    });
    schema.power = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 }),
      max: new fields.NumberField({ ...requiredInteger, initial: 5 })
    });
    schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    return schema;
  }

}