import Vermin2047DataModel from "../base-model.mjs";

export default class Vermin2047ItemBase extends Vermin2047DataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.description = new fields.StringField({ required: true, blank: true });

    return schema;
  }

}