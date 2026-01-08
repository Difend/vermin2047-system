import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Figure extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.age = new fields.StringField({ initial: '' });
    schema.personnality = new fields.StringField({ initial: '' });
    schema.profile = new fields.StringField({ initial: '' });
    schema.skill = new fields.StringField({ initial: '' });
    schema.speciality = new fields.StringField({ initial: '' });
    schema.objective = new fields.StringField({ initial: '' });
    schema.threat = new fields.StringField({ initial: '' });

    return schema;
  }
}