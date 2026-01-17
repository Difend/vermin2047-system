import Vermin2047DataModel from "../base-model.mjs";

export default class Vermin2047HumanBase extends Vermin2047DataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    // Tracks the wounds for each living actor
    schema.wounds = new fields.SchemaField({
      light: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        limit: new fields.NumberField({ ...requiredInteger, initial: 4, min: 0 }),
        threshold: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 })
      }),
      serious: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        limit: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0 }),
        threshold: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0 })
      }),
      lethal: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        limit: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0 }),
        threshold: new fields.NumberField({ ...requiredInteger, initial: 8, min: 0 })
      })
    })
    
    schema.biography = new fields.StringField({ required: true, blank: true }); // equivalent to passing ({initial: ""}) for StringFields

    return schema;
  }

}