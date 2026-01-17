import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Figure extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const blankString = { required: true, blank: true };
    const schema = super.defineSchema();

    // Defines the age of the community figure
    schema.age = new fields.StringField({ ...blankString });

    // Defines the personnality of the community figure
    schema.personnality = new fields.StringField({ ...blankString });

    // Defines the profile of the community figure
    schema.profile = new fields.StringField({ ...blankString });

    // Defines the best skill of the community figure
    schema.skill = new fields.StringField({ ...blankString });

    // Defines the speciality of the community figure
    schema.speciality = new fields.StringField({ ...blankString });

    // Defines the objective of the community figure
    schema.objective = new fields.StringField({ ...blankString });

    // Defines the threat of the community figure (dark secret or hidden objective)
    schema.threat = new fields.StringField({ ...blankString });

    return schema;
  }
}