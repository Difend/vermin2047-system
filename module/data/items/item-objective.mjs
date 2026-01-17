import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Objective extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    // Defines the type of objective (major, minor or optionnal)
    schema.type = new fields.StringField({ required: true, blank: false, initial: 'maj' });

    // Defines the deadline of the objective (none, few days, a week, a month or a year)
    schema.deadline = new fields.StringField({ required: true, blank: true, initial: 'non' });

    return schema;
  }
}