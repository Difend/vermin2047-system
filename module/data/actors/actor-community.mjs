import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047Community extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const blankString = { required: true, blank: true };
    const schema = super.defineSchema();

    // Defines community size (1, 2 or 3)
    schema.lvl = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 3 }),
    })

    // Defines community totem (Predator, Horde, etc...)
    schema.tot = new fields.SchemaField({
      value: new fields.StringField({ ...blankString }),
    })

    // Defines community reputation
    schema.reputation = new fields.SchemaField({
      value: new fields.StringField({ ...blankString }),
    })

    // Defines community global status based on all the gauges
    schema.globalStatus = new fields.SchemaField({
      value: new fields.StringField({ required: true, initial: 'low' }),
    })

    // Iterate over domains and gauges names and create a new SchemaField for each (4 domains + 8 gauges)
    schema.domains = new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.communityDomains).reduce((obj, domain) => {
      obj[domain] = new fields.SchemaField({
        gauges: new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.communityGauges[domain]).reduce((obj, gauge) => {
          obj[gauge] = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
            status: new fields.StringField({ required: true, initial: 'low' })
          });
          return obj;
        }, {}))
      });
      return obj;
    }, {}));

    return schema;
  }

  prepareDerivedData() {
    let sum = 0;

    // Iterate over domains and gauges names to update their status (4 domains + 8 gauges)
    for(const key in this.domains) {
      for(const key2 in this.domains[key].gauges) {
        sum+=this.domains[key].gauges[key2].value
        this.domains[key].gauges[key2].status = this.getGaugeStatus(this.domains[key].gauges[key2].value)
      }
    }
    this.globalStatus.value = this.getGaugeStatus(Math.round(sum/10))
  }

  getGaugeStatus(value) {
    // Calculating the gauge status based on the gauge's value
    if(value > 5) 
      return 'opu'
    else if (value < 6 && value > 2) 
      return 'sta'
    else if (value < 3 && value > 0)
      return 'low'
    else return 'cri'
  }
}