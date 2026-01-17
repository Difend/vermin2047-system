import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047Vehicule extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const blankString = { required: true, blank: true };
    const schema = super.defineSchema();

    // Defines vehicule speed (cruising / top speed_unit per time time_unit => 10 / 15 km par 1 hour for example)
    schema.speed = new fields.SchemaField({
      cruising: new fields.NumberField({...requiredInteger, initial: 5, min: 0 }),
      top: new fields.NumberField({...requiredInteger, initial: 10, min: 0 }),
      speed_unit: new fields.StringField({ required: true, initial: "km" }),
      time: new fields.NumberField({...requiredInteger, initial: 10, min: 0 }),
      time_unit: new fields.StringField({ required: true, initial: "h" })
    });

    // Defines vehicule distance per day (in kilometers)
    schema.distance = new fields.SchemaField({
      value: new fields.StringField({ required: true, initial: "100" })
    });

    // Defines if the vehicule is motorized or animal
    schema.type = new fields.SchemaField({
      value: new fields.StringField({ required: true, initial: "mot" })
    });

    // Defines reliability for motorized vehicules
    schema.reliability = new fields.SchemaField({
      value: new fields.NumberField({...requiredInteger, initial: 1, min: 0, max: 10 }),
      max: new fields.NumberField({...requiredInteger, initial: 1, min: 0, max: 10 }),
    });

    // Defines strain pool for animal vehicules
    schema.strain = new fields.SchemaField({
      value: new fields.NumberField({...requiredInteger, initial: 1, min: 0, max: 10 }),
      max: new fields.NumberField({...requiredInteger, initial: 1, min: 0, max: 10 }),
    });

    // Defines maintenance skill for vehicule
    schema.maintenance = new fields.SchemaField({
      primary: new fields.StringField({...blankString}),
      secondary: new fields.StringField({...blankString})
    });

    // Defines rarity for the loot actions value (criteria)
    schema.rarity = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 3, min: 3, max: 10 }),
      criteria: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2 }),
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