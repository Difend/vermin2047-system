import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Injury extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredString = { required: true, blank: false };
    const schema = super.defineSchema();

    // Defines the type of injury (Scratches, Brushes, Open wound, etc...)
    schema.type = new fields.StringField({ ...requiredString, initial: 'sho' });

    // Defines the type of wound (light, serious or lethal)
    schema.wound = new fields.StringField({ ...requiredString, initial: 'lig' });

    // Defines the impact of the injury (-1D for physical actions for example)
    schema.impact = new fields.StringField({ required: true, blank: true, initial: '' });

    return schema;
  }
}