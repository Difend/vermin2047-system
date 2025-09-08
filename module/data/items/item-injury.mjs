import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Injury extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.type = new fields.StringField({ required: true, blank: false, initial: 'sho' });

    schema.wound = new fields.StringField({ required: true, blank: false, initial: 'lig' });

    schema.impact = new fields.StringField({ required: true, blank: true, initial: '' });

    return schema;
  }
}