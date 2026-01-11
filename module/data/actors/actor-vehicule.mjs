import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047Vehicule extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.speed = new fields.SchemaField({
      cruising: new fields.NumberField({...requiredInteger, initial: 5, min: 0 }),
      top: new fields.NumberField({...requiredInteger, initial: 10, min: 0 }),
      speed_unit: new fields.StringField({ initial: "km" }),
      time: new fields.NumberField({...requiredInteger, initial: 10, min: 0 }),
      time_unit: new fields.StringField({ initial: "h" })
    });

    schema.distance = new fields.SchemaField({
      value: new fields.StringField({ initial: "100 km" })
    });

    schema.type = new fields.SchemaField({
      value: new fields.StringField({ initial: "mot" })
    });

    schema.reliability = new fields.SchemaField({
      value: new fields.NumberField({...requiredInteger, initial: 1, min: 0, max: 10 }),
      max: new fields.NumberField({...requiredInteger, initial: 1, min: 0, max: 10 }),
    });

    schema.strain = new fields.SchemaField({
      value: new fields.NumberField({...requiredInteger, initial: 1, min: 0, max: 10 }),
      max: new fields.NumberField({...requiredInteger, initial: 1, min: 0, max: 10 }),
    });

    schema.maintenance = new fields.SchemaField({
      primary: new fields.StringField({ initial: "" }),
      secondary: new fields.StringField({ initial: "" })
    });

    // Defines rarity for the loot actions value (criteria)
    schema.rarity = new fields.SchemaField({
      value: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 3, min: 3, max: 10 }),
      criteria: new fields.NumberField({ required: true, nullable: false, integer: true, initial: 0, min: 0, max: 2 }),
    });

    return schema;
  }

  isVehicule = function() {
    return this.system.type.value == 'mot';
  }

  isMount = function() {
    return this.system.type.value == 'ani';
  }
}