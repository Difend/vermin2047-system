export const VERMIN_2047 = {};

/* -------------------------------------------- */
/*  Labels config                               */
/* -------------------------------------------- */

/**
 * Display values for all the actors and item sheets
 * @enum {labels}
 */
VERMIN_2047.labels = {
  name: 'VERMIN_2047.Labels.Name',
  traits: 'VERMIN_2047.Labels.Traits',
  identity: 'VERMIN_2047.Labels.Identity',
  skills: 'VERMIN_2047.Labels.Skills',
  skill: 'VERMIN_2047.Labels.Skill',
  wounds: 'VERMIN_2047.Labels.Wounds',
  archetype: 'VERMIN_2047.Labels.Archetype',
  specialities: 'VERMIN_2047.Labels.Specialities',
  speciality: 'TYPES.Item.speciality',
  rarity: 'VERMIN_2047.Labels.Rarity',
  description: 'VERMIN_2047.Labels.Description',
  attributes: 'VERMIN_2047.Labels.Attributes',
  features: 'VERMIN_2047.Labels.Features',
  pools: 'VERMIN_2047.Labels.Pools',
  pool: 'VERMIN_2047.Labels.Pool',
  items: 'VERMIN_2047.Labels.Items',
  effects: 'VERMIN_2047.Labels.Effects',
  experience: 'VERMIN_2047.Labels.Experience',
  range: 'VERMIN_2047.Labels.Range',
  damage: 'VERMIN_2047.Labels.Damage',
  threshold: 'VERMIN_2047.Wound.Threshold',
  count: 'VERMIN_2047.Wound.Count',
  limit: 'VERMIN_2047.Wound.Limit',
  type: 'VERMIN_2047.Labels.Type',
  impact: 'VERMIN_2047.Labels.Impact',
  symptoms: 'VERMIN_2047.Labels.Symptoms',
  virulence: 'VERMIN_2047.Labels.Virulence',
  healing: 'VERMIN_2047.Labels.Healing',
  protections: 'VERMIN_2047.Labels.Protections',
  capacities: 'VERMIN_2047.Labels.Capacities',
  capacity: 'TYPES.Item.capacity',
  weapons: 'VERMIN_2047.Labels.Weapons',
  injuries: 'VERMIN_2047.Labels.Injuries',
  inventory: 'VERMIN_2047.Labels.Inventory',
  biography: 'VERMIN_2047.Labels.Biography',
  learning: 'VERMIN_2047.Labels.Learning',
  level: 'VERMIN_2047.Labels.Level',
  reliability:'VERMIN_2047.Labels.Reliability',
  mobility: 'VERMIN_2047.Labels.Mobility',
  special: 'VERMIN_2047.Labels.Special',
  quantity: 'VERMIN_2047.Labels.Quantity',
  specialFeatures: 'VERMIN_2047.Labels.SpecialFeatures',
  index: 'VERMIN_2047.Labels.Index',
  moral: 'VERMIN_2047.Labels.Moral',
  deadline: 'VERMIN_2047.Labels.Deadline',
  objectives: 'VERMIN_2047.Labels.Objectives',
  size:'VERMIN_2047.Labels.Size',
  status: 'VERMIN_2047.Labels.Status',
  gauges: 'VERMIN_2047.Labels.Gauges',
  workforce: 'VERMIN_2047.Labels.Workforce',
  profile: 'VERMIN_2047.Labels.Profile',
  personnality: 'VERMIN_2047.Labels.Personnality',
  objective: 'VERMIN_2047.Labels.Objective',
  threat: 'VERMIN_2047.Labels.Threat',
  companies: 'VERMIN_2047.Labels.Companies',
  figures: 'VERMIN_2047.Labels.Figures',
  maintenance: 'VERMIN_2047.Labels.Maintenance',
  speed: 'VERMIN_2047.Labels.Speed',
  distance: 'VERMIN_2047.Labels.Distance',
  kilometers: 'VERMIN_2047.Labels.Kilometers',
  parry: 'VERMIN_2047.Labels.Parry',
  dodge: 'VERMIN_2047.Labels.Dodge'
};

/* -------------------------------------------- */
/*  Common config                               */
/* -------------------------------------------- */

/**
 * Scale used to rank the difficulty of actions, to retrieve an item etc...
 * @enum {difficulty}
 */
VERMIN_2047.difficulty = {
  3: 'VERMIN_2047.RollDifficulty.VeryEasy',
  5: 'VERMIN_2047.RollDifficulty.Easy',
  7: 'VERMIN_2047.RollDifficulty.Medium',
  9: 'VERMIN_2047.RollDifficulty.Hard',
  10: 'VERMIN_2047.RollDifficulty.VeryHard'
}

/**
 * Scale used to rank handicaps of actions, rarity of items etc...
 * @enum {handicaps}
 */
VERMIN_2047.handicaps = {
  0: "VERMIN_2047.Labels.None",
  1: "(I)",
  2: "(II)",
  3: "(III)"
}

/**
 * Scale used to rank handicaps of actions, rarity of items etc...
 * @enum {ranks}
 */
VERMIN_2047.ranks = [
  "-",
  "(I)",
  "(II)",
  "(III)",
  "(IV)"
]

/**
 * Scale used to rank the distance of a shot
 * @enum {range}
 */
VERMIN_2047.range = {
  5: 'VERMIN_2047.Range.Short',
  7: 'VERMIN_2047.Range.Medium',
  9: 'VERMIN_2047.Range.Long'
}

/**
 * Scale used to rank the cover of a target
 * @enum {cover}
 */
VERMIN_2047.cover = {
  0: 'VERMIN_2047.Cover.None',
  1: 'VERMIN_2047.Cover.Minor',
  2: 'VERMIN_2047.Cover.Partial',
  3: 'VERMIN_2047.Cover.Major'
}

/* -------------------------------------------- */
/*  Character & NPC config                      */
/* -------------------------------------------- */

/**
 * The sets of wounds for NPC and Characters (light, serious and lethal)
 * @enum {wounds}
 */
VERMIN_2047.wounds = {
  lig: 'VERMIN_2047.Wound.Lig',
  ser: 'VERMIN_2047.Wound.Ser',
  let: 'VERMIN_2047.Wound.Let',
}

/* -------------------------------------------- */
/*  Character config                            */
/* -------------------------------------------- */

/**
 * Identity categories for Characters (Totem, Reputation and Age)
 * @enum {identity}
 */
VERMIN_2047.identity = {
  tot: 'VERMIN_2047.Identity.Tot',
  rep: 'VERMIN_2047.Identity.Rep',
  age: 'VERMIN_2047.Identity.Age'
};

/**
 * Identity values for Characters (Totem, Reputation and Age)
 * Totem and Reputation values are also used for Communities and Parties
 * @enum {identityValues}
 */
VERMIN_2047.identityValues = {
  tot: {
    hum: 'VERMIN_2047.Totem.Hum',
    ada: 'VERMIN_2047.Totem.Ada',
    pre: 'VERMIN_2047.Totem.Pre',
    sca: 'VERMIN_2047.Totem.Sca',
    sym: 'VERMIN_2047.Totem.Sym',
    par: 'VERMIN_2047.Totem.Par',
    bui: 'VERMIN_2047.Totem.Bui',
    hor: 'VERMIN_2047.Totem.Hor',
    hiv: 'VERMIN_2047.Totem.Hiv',
    lon: 'VERMIN_2047.Totem.Lon',
  },
  rep: {
    clo: 'VERMIN_2047.Reputation.Clo',
    com: 'VERMIN_2047.Reputation.Com',
    vil: 'VERMIN_2047.Reputation.Vil',
    cit: 'VERMIN_2047.Reputation.Cit',
    big: 'VERMIN_2047.Reputation.Big',
    dep: 'VERMIN_2047.Reputation.Dep',
    reg: 'VERMIN_2047.Reputation.Reg',
    cou: 'VERMIN_2047.Reputation.Cou',
    con: 'VERMIN_2047.Reputation.Con',
    wor: 'VERMIN_2047.Reputation.Wor'
  },
  age: {
    non: 'VERMIN_2047.Age.Non',
    new: 'VERMIN_2047.Age.New',
    adu: 'VERMIN_2047.Age.Adu',
    old: 'VERMIN_2047.Age.Old'
  }
}

/**
 * Pools categories for Characters (Strain and Nerve)
 * Strain category is also used for Vehicules (Mounts)
 * @enum {pools}
 */
VERMIN_2047.pools = {
  str: 'VERMIN_2047.Pools.Str',
  ner: 'VERMIN_2047.Pools.Ner'
};

/**
 * The set of Traits Scores used within the system
 * (Vigor, Accuracy, Knowledge, Willpower, Heal, Reflexes, Perception and Empathy)
 * @type {traits}
 */
VERMIN_2047.traits = {
  vig: 'VERMIN_2047.Trait.Vig',
  acc: 'VERMIN_2047.Trait.Acc',
  kno: 'VERMIN_2047.Trait.Kno',
  wil: 'VERMIN_2047.Trait.Wil',
  hea: 'VERMIN_2047.Trait.Hea',
  ref: 'VERMIN_2047.Trait.Ref',
  per: 'VERMIN_2047.Trait.Per',
  emp: 'VERMIN_2047.Trait.Emp',
};

/**
 * The set of Character Domains used within the system
 * (Man, Machine, Weapon, Beast, Survival and Earth)
 * @type {domains}
 */
VERMIN_2047.domains = {
  man: 'VERMIN_2047.Domain.Man',
  mac: 'VERMIN_2047.Domain.Mac',
  wea: 'VERMIN_2047.Domain.Wea',
  bea: 'VERMIN_2047.Domain.Bea',
  sur: 'VERMIN_2047.Domain.Sur',
  ear: 'VERMIN_2047.Domain.Ear',
};

/**
 * The set of Skill per Domains used within the system
 * (Arts... Craft... Firearms... Animalism... Nourrishment etc...)
 * @type {domainSkills}
 */
VERMIN_2047.domainSkills = {
  man: {
    art: 'VERMIN_2047.Skill.Art',
    civ: 'VERMIN_2047.Skill.Civ',
    psy: 'VERMIN_2047.Skill.Psy',
    rum: 'VERMIN_2047.Skill.Rum',
    hel: 'VERMIN_2047.Skill.Hel'
  },
  mac: {
    cra: 'VERMIN_2047.Skill.Cra',
    jur: 'VERMIN_2047.Skill.Jur',
    mec: 'VERMIN_2047.Skill.Mec',
    ste: 'VERMIN_2047.Skill.Ste',
    tec: 'VERMIN_2047.Skill.Tec'
  },
  wea: {
    fir: 'VERMIN_2047.Skill.Fir',
    ran: 'VERMIN_2047.Skill.Ran',
    smi: 'VERMIN_2047.Skill.Smi',
    thr: 'VERMIN_2047.Skill.Thr',
    clo: 'VERMIN_2047.Skill.Clo'
  },
  bea: {
    ani: 'VERMIN_2047.Skill.Ani',
    dis: 'VERMIN_2047.Skill.Dis',
    anl: 'VERMIN_2047.Skill.Anl',
    rep: 'VERMIN_2047.Skill.Rep',
    tra: 'VERMIN_2047.Skill.Tra'
  },
  sur: {
    nou: 'VERMIN_2047.Skill.Nou',
    ath: 'VERMIN_2047.Skill.Ath',
    bra: 'VERMIN_2047.Skill.Bra',
    sne: 'VERMIN_2047.Skill.Sne',
    vig: 'VERMIN_2047.Skill.Vig'
  },
  ear: {
    env: 'VERMIN_2047.Skill.Env',
    pla: 'VERMIN_2047.Skill.Pla',
    roa: 'VERMIN_2047.Skill.Roa',
    tox: 'VERMIN_2047.Skill.Tox',
    rui: 'VERMIN_2047.Skill.Rui'
  }
};

/**
 * The set of Skill used within the system
 * (Arts... Craft... Firearms... Animalism... Nourrishment etc...)
 * @type {skills}
 */
VERMIN_2047.skills = {
  art: 'VERMIN_2047.Skill.Art',
  civ: 'VERMIN_2047.Skill.Civ',
  psy: 'VERMIN_2047.Skill.Psy',
  rum: 'VERMIN_2047.Skill.Rum',
  hel: 'VERMIN_2047.Skill.Hel',
  ani: 'VERMIN_2047.Skill.Ani',
  dis: 'VERMIN_2047.Skill.Dis',
  anl: 'VERMIN_2047.Skill.Anl',
  rep: 'VERMIN_2047.Skill.Rep',
  tra: 'VERMIN_2047.Skill.Tra',
  cra: 'VERMIN_2047.Skill.Cra',
  jur: 'VERMIN_2047.Skill.Jur',
  mec: 'VERMIN_2047.Skill.Mec',
  ste: 'VERMIN_2047.Skill.Ste',
  tec: 'VERMIN_2047.Skill.Tec',
  fir: 'VERMIN_2047.Skill.Fir',
  ran: 'VERMIN_2047.Skill.Ran',
  smi: 'VERMIN_2047.Skill.Smi',
  thr: 'VERMIN_2047.Skill.Thr',
  clo: 'VERMIN_2047.Skill.Clo',
  nou: 'VERMIN_2047.Skill.Nou',
  ath: 'VERMIN_2047.Skill.Ath',
  bra: 'VERMIN_2047.Skill.Bra',
  sne: 'VERMIN_2047.Skill.Sne',
  vig: 'VERMIN_2047.Skill.Vig',
  env: 'VERMIN_2047.Skill.Env',
  pla: 'VERMIN_2047.Skill.Pla',
  roa: 'VERMIN_2047.Skill.Roa',
  tox: 'VERMIN_2047.Skill.Tox',
  rui: 'VERMIN_2047.Skill.Rui'
};

/**
 * The rank of a skill (None, Beginner, Advanced, Expert and Master)
 * @type {skillValues}
 */
VERMIN_2047.skillValues = {
  non: 'VERMIN_2047.SkillLevel.Non',
  beg: 'VERMIN_2047.SkillLevel.Beg',
  adv: 'VERMIN_2047.SkillLevel.Adv',
  exp: 'VERMIN_2047.SkillLevel.Exp',
  mas: 'VERMIN_2047.SkillLevel.Mas'
}

/**
 * The skill rarity depending on the age (Young, Adult and Old)
 * @type {skillRarity}
 */
VERMIN_2047.skillRarity = {
  art: [0,0,0],
  civ: [2,2,1],
  psy: [1,1,1],
  rum: [0,0,0],
  hel: [1,1,1],
  ani: [0,1,1],
  dis: [2,2,2],
  anl: [0,1,1],
  rep: [0,0,0],
  tra: [0,0,0],
  cra: [2,2,2],
  jur: [0,0,0],
  mec: [2,2,2],
  ste: [1,1,1],
  tec: [2,2,1],
  fir: [2,2,2],
  ran: [0,0,0],
  smi: [0,0,0],
  thr: [0,0,0],
  clo: [0,0,0],
  nou: [0,0,0],
  ath: [0,0,0],
  bra: [0,0,0],
  sne: [0,0,0],
  vig: [0,0,0],
  env: [1,1,1],
  pla: [0,1,1],
  roa: [0,0,0],
  tox: [2,2,2],
  rui: [1,1,0],
};

/* -------------------------------------------- */
/*  Character config - Injuries subconfig       */
/* -------------------------------------------- */

/**
 * The injury types for Injuries (Scratches, Bruises etc....)
 * @type {injuryTypes}
 */
VERMIN_2047.injuryTypes = {
  scr: 'VERMIN_2047.Injury.Scr',
  bru: 'VERMIN_2047.Injury.Bru',
  ope: 'VERMIN_2047.Injury.Ope',
  cut: 'VERMIN_2047.Injury.Cut',
  bit: 'VERMIN_2047.Injury.Bit',
  bur: 'VERMIN_2047.Injury.Bur',
  sun: 'VERMIN_2047.Injury.Sun',
  fro: 'VERMIN_2047.Injury.Fro',
  con: 'VERMIN_2047.Injury.Con',
}

/* -------------------------------------------- */
/*  Character config - Special Feature config   */
/* -------------------------------------------- */

/**
 * The set of categories for the special feature (historical element, adaptation, etc...)
 * @enum {featureType}
 */
VERMIN_2047.featureType = {
  his: 'VERMIN_2047.Feature.His',
  ada: 'VERMIN_2047.Feature.Ada',
  mut: 'VERMIN_2047.Feature.Mut',
  tra: 'VERMIN_2047.Feature.Tra',
  sha: 'VERMIN_2047.Feature.Sha'
}

/* -------------------------------------------- */
/*  Vehicule config                             */
/* -------------------------------------------- */

/**
 * The type of vehicules used in the system (Motorized or Animal)
 * @type {vehiculeTypes}
 */
VERMIN_2047.vehiculeTypes = {
  mot: 'VERMIN_2047.VehiculeType.Mot',
  ani: 'VERMIN_2047.VehiculeType.Ani'
}

/**
 * The skill required for the maintenance of the vehicule (Animalism, Craft, Jury-Rig, Mecanics or Technology)
 * @type {maintenanceSkills}
 */
VERMIN_2047.maintenanceSkills = {
  non: '-',
  ani: 'VERMIN_2047.Skill.Ani',
  cra: 'VERMIN_2047.Skill.Cra',
  jur: 'VERMIN_2047.Skill.Jur',
  mec: 'VERMIN_2047.Skill.Mec',
  tec: 'VERMIN_2047.Skill.Tec'
}

/* -------------------------------------------- */
/*  Weapon config                               */
/* -------------------------------------------- */

/**
 * The skill used to fight with a weapon (Firearms, Ranged weapons, Close combat or Brawl)
 * @type {fightSkills}
 */
VERMIN_2047.fightSkills = {
  fir: 'VERMIN_2047.Skill.Fir',
  ran: 'VERMIN_2047.Skill.Ran',
  thr: 'VERMIN_2047.Skill.Thr',
  clo: 'VERMIN_2047.Skill.Clo',
  bra: 'VERMIN_2047.Skill.Bra',
};

/**
 * The damage types for weapons (Shock, Blade, Fire and Bullet)
 * @type {damageTypes}
 */
VERMIN_2047.damageTypes = {
  sho: 'VERMIN_2047.Damage.Sho.abbr',
  bla: 'VERMIN_2047.Damage.Bla.abbr',
  fir: 'VERMIN_2047.Damage.Fir.abbr',
  bul: 'VERMIN_2047.Damage.Bul.abbr',
};

/* -------------------------------------------- */
/*  Party config                                */
/* -------------------------------------------- */

/**
 * The moral threshold for a party (high, regular, low, crisis)
 * @enum {moral}
 */
VERMIN_2047.moral = {
  hig: 'VERMIN_2047.Moral.Hig',
  reg: 'VERMIN_2047.Moral.Reg',
  low: 'VERMIN_2047.Moral.Low',
  cri: 'VERMIN_2047.Moral.Cri',
}

/* -------------------------------------------- */
/*  Party config - Objective subconfig          */
/* -------------------------------------------- */

/**
 * The set of categories for a party objective (major, minor, optionnal)
 * @enum {objectiveType}
 */
VERMIN_2047.objectiveType = {
  maj: 'VERMIN_2047.Objective.Maj',
  min: 'VERMIN_2047.Objective.Min',
  opt: 'VERMIN_2047.Objective.Opt'
}

/**
 * The different deadlines for a party objective (none, few days, a week, etc...)
 * @enum {deadline}
 */
VERMIN_2047.deadline = {
  non: 'VERMIN_2047.Deadline.Non',
  day: 'VERMIN_2047.Deadline.Day',
  wek: 'VERMIN_2047.Deadline.Wek',
  mon: 'VERMIN_2047.Deadline.Mon',
  yea: 'VERMIN_2047.Deadline.Yea',
}

/* -------------------------------------------- */
/*  Community config                            */
/* -------------------------------------------- */

/**
 * The set of Community Domains used within the system
 * (Resources, Security, Dynamism and Relations)
 * @type {communityDomains}
 */
VERMIN_2047.communityDomains = {
  res: 'VERMIN_2047.CommunityDomain.Res',
  sec: 'VERMIN_2047.CommunityDomain.Sec',
  dyn: 'VERMIN_2047.CommunityDomain.Dyn',
  rel: 'VERMIN_2047.CommunityDomain.Rel'
};

/**
 * The set of Gauges per Domains used within the system
 * @type {communityGauges}
 */
VERMIN_2047.communityGauges = {
  res: {
    foo: 'VERMIN_2047.CommunityGauge.Foo',
    sup: 'VERMIN_2047.CommunityGauge.Sup'
  },
  sec: {
    def: 'VERMIN_2047.CommunityGauge.Def',
    car: 'VERMIN_2047.CommunityGauge.Car'
  },
  dyn: {
    coh: 'VERMIN_2047.CommunityGauge.Coh',
    pro: 'VERMIN_2047.CommunityGauge.Pro'
  },
  rel: {
    hum: 'VERMIN_2047.CommunityGauge.Hum',
    eco: 'VERMIN_2047.CommunityGauge.Eco'
  }
};

/**
 * The set of Gauges Scores used within the system
 * (Food, Supply, Defenses, Care, Cohesion, Productivity, Human and Ecology)
 * @type {gauges}
 */
VERMIN_2047.gauges = {
  foo: 'VERMIN_2047.CommunityGauge.Foo',
  sup: 'VERMIN_2047.CommunityGauge.Sup',
  def: 'VERMIN_2047.CommunityGauge.Def',
  car: 'VERMIN_2047.CommunityGauge.Car',
  coh: 'VERMIN_2047.CommunityGauge.Coh',
  pro: 'VERMIN_2047.CommunityGauge.Pro',
  hum: 'VERMIN_2047.CommunityGauge.Hum',
  eco: 'VERMIN_2047.CommunityGauge.Eco'
};

/**
 * The different values of Community gauges
 * (Opulent, Stable, Low and Crisis)
 * @type {gaugeStatus}
 */
VERMIN_2047.gaugeStatus = {
  opu: 'VERMIN_2047.GaugeStatus.Opu',
  sta: 'VERMIN_2047.GaugeStatus.Sta',
  low: 'VERMIN_2047.GaugeStatus.Low',
  cri: 'VERMIN_2047.GaugeStatus.Cri',
}

/* -------------------------------------------- */
/*  NPC config                                  */
/* -------------------------------------------- */

/**
 * The set of Traits Scores for NPC used within the system
 * @type {npcTraits}
 */
VERMIN_2047.npcTraits = {
  dam: 'VERMIN_2047.NpcTrait.Dam',
  att: 'VERMIN_2047.NpcTrait.Att',
  vig: 'VERMIN_2047.NpcTrait.Vig'
};