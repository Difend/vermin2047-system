import Vermin2047ItemBase from "./base-item.mjs";

export default class Vermin2047Weapon extends Vermin2047ItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const schema = super.defineSchema();

    schema.skill = new fields.SchemaField({
      value: new fields.StringField({ required: true, blank: false, initial: 'art' })
    });

    schema.damage = new fields.SchemaField({
      amount: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 1, max: 20 }),
      type: new fields.StringField({ required: true, blank: false, initial: 'sho' }),
    });

    schema.reliability = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 10 }),
      max: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 1, min: 0, max: 10 }),
    });

    // 3 ranges (unit in meters):
    // - short: included between 0 and max_short
    // - medium: included between max_short and max_medium
    // - long: included between max_medium and infinite
    schema.range = new fields.SchemaField({
      max_short: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 200 }),
      max_medium: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 200 }),
    });

    // Defines rarity for the loot actions value (criteria)
    schema.rarity = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 3, max: 10 }),
      criteria: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 2 }),
    });

    schema.formula = new fields.StringField({ blank: true });

    return schema;
  }

  prepareDerivedData() {
    switch(this.skill.value) {
      case 'fir':
        this.formula = `(@acc.mod+@wea.skills.fir.mod+@wea.value)d10`;  
        break;
      case 'ran':
        this.formula = `(@acc.mod+@wea.skills.ran.mod+@wea.value)d10`;  
        break;
      case 'thr':
        this.formula = `(@vig.mod+@wea.skills.thr.mod+@wea.value)d10`;  
        break;
      case 'bra':
        this.formula = `(@vig.mod+@sur.skills.bra.mod+@sur.value)d10`;  
        break;
      default:
      case 'clo':
        this.formula = `(@vig.mod+@wea.skills.clo.mod+@wea.value)d10`;  
        break;
    }
  }
}