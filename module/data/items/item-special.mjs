import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Special extends Vermin2047ItemBase {


    static defineSchema() {
        const fields = foundry.data.fields;
        const schema = super.defineSchema();

        // Defines the type of special feature (historical element, trauma, adaptation, mutation, etc...)
        schema.type = new fields.StringField({ required: true, blank: false, initial: 'his' });

        return schema;
    }
}