import Vermin2047ActorBase from "./base-actor.mjs";

export default class Vermin2047Community extends Vermin2047ActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.lvl = new fields.SchemaField({
      value: new fields.NumberField({ ...requiredInteger, initial: 1, min: 1, max: 3 }),
    })
    schema.totem = new fields.SchemaField({
      value: new fields.StringField({ initial: '' }),
    })
    schema.globalStatus = new fields.SchemaField({
      value: new fields.StringField({ initial: 'low' }),
    })

    schema.domains = new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.communityDomains).reduce((obj, domain) => {
      obj[domain] = new fields.SchemaField({
        gauges: new fields.SchemaField(Object.keys(CONFIG.VERMIN_2047.communityGauges[domain]).reduce((obj, gauge) => {
          obj[gauge] = new fields.SchemaField({
            value: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
            status: new fields.StringField({ initial: 'low' })
          });
          return obj;
        }, {}))
      });
      return obj;
    }, {}));

    schema.reputation = new fields.SchemaField({
      value: new fields.StringField({ initial: '' }),
    })

    return schema;
  }

  prepareDerivedData() {
    let sum = 0;

    for(const key in this.domains) {
      console.log(this.domains[key])
      for(const key2 in this.domains[key].gauges) {
        sum+=this.domains[key].gauges[key2].value
        this.domains[key].gauges[key2].status = this.getStatus(this.domains[key].gauges[key2].value)
      }
    }
    this.globalStatus.value = this.getStatus(Math.round(sum/10))
  }

  getStatus(value) {
    if(value > 5) 
      return 'opu'
    else if (value < 6 && value > 2) 
      return 'sta'
    else if (value < 3 && value > 0)
      return 'low'
    else return 'cri'
  }
}