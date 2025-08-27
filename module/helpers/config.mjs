export const VERMIN_2047 = {};

/**
 * The set of Traits Scores used within the system.
 * @type {Object}
 */
VERMIN_2047.traits = {
  vig: 'VERMIN_2047.Trait.Vig.long',
  hea: 'VERMIN_2047.Trait.Hea.long',
  acc: 'VERMIN_2047.Trait.Acc.long',
  ref: 'VERMIN_2047.Trait.Ref.long',
  per: 'VERMIN_2047.Trait.Per.long',
  kno: 'VERMIN_2047.Trait.Kno.long',
  wil: 'VERMIN_2047.Trait.Wil.long',
  emp: 'VERMIN_2047.Trait.Emp.long',
};

VERMIN_2047.traitAbbreviations = {
  vig: 'VERMIN_2047.Trait.Vig.abbr',
  hea: 'VERMIN_2047.Trait.Hea.abbr',
  acc: 'VERMIN_2047.Trait.Acc.abbr',
  ref: 'VERMIN_2047.Trait.Ref.abbr',
  per: 'VERMIN_2047.Trait.Per.abbr',
  kno: 'VERMIN_2047.Trait.Kno.abbr',
  wil: 'VERMIN_2047.Trait.Wil.abbr',
  emp: 'VERMIN_2047.Trait.Emp.abbr',
};

VERMIN_2047.domains = {
  man: 'VERMIN_2047.Domain.Man.long',
  bea: 'VERMIN_2047.Domain.Bea.long',
  mac: 'VERMIN_2047.Domain.Mac.long',
  wea: 'VERMIN_2047.Domain.Wea.long',
  sur: 'VERMIN_2047.Domain.Sur.long',
  ear: 'VERMIN_2047.Domain.Ear.long',
};

VERMIN_2047.domainSkills = {
  man: {
    art: 'VERMIN_2047.Skill.Art.long',
    civ: 'VERMIN_2047.Skill.Civ.long',
    psy: 'VERMIN_2047.Skill.Psy.long',
    rum: 'VERMIN_2047.Skill.Rum.long',
    hel: 'VERMIN_2047.Skill.Hel.long'
  },
  bea: {
    ani: 'VERMIN_2047.Skill.Ani.long',
    dis: 'VERMIN_2047.Skill.Dis.long',
    anl: 'VERMIN_2047.Skill.Anl.long',
    rep: 'VERMIN_2047.Skill.Rep.long',
    tra: 'VERMIN_2047.Skill.Tra.long'
  },
  mac: {
    cra: 'VERMIN_2047.Skill.Cra.long',
    jur: 'VERMIN_2047.Skill.Jur.long',
    mec: 'VERMIN_2047.Skill.Mec.long',
    ste: 'VERMIN_2047.Skill.Ste.long',
    tec: 'VERMIN_2047.Skill.Tec.long'
  },
  wea: {
    fir: 'VERMIN_2047.Skill.Fir.long',
    ran: 'VERMIN_2047.Skill.Ran.long',
    smi: 'VERMIN_2047.Skill.Smi.long',
    thr: 'VERMIN_2047.Skill.Thr.long',
    clo: 'VERMIN_2047.Skill.Clo.long'
  },
  sur: {
    nou: 'VERMIN_2047.Skill.Nou.long',
    ath: 'VERMIN_2047.Skill.Ath.long',
    bra: 'VERMIN_2047.Skill.Bra.long',
    sne: 'VERMIN_2047.Skill.Sne.long',
    vig: 'VERMIN_2047.Skill.Vig.long'
  },
  ear: {
    env: 'VERMIN_2047.Skill.Env.long',
    pla: 'VERMIN_2047.Skill.Pla.long',
    roa: 'VERMIN_2047.Skill.Roa.long',
    tox: 'VERMIN_2047.Skill.Tox.long',
    rui: 'VERMIN_2047.Skill.Rui.long'
  }
};

VERMIN_2047.skills = {
  art: 'VERMIN_2047.Skill.Art.long',
  civ: 'VERMIN_2047.Skill.Civ.long',
  psy: 'VERMIN_2047.Skill.Psy.long',
  rum: 'VERMIN_2047.Skill.Rum.long',
  hel: 'VERMIN_2047.Skill.Hel.long',
  ani: 'VERMIN_2047.Skill.Ani.long',
  dis: 'VERMIN_2047.Skill.Dis.long',
  anl: 'VERMIN_2047.Skill.Anl.long',
  rep: 'VERMIN_2047.Skill.Rep.long',
  tra: 'VERMIN_2047.Skill.Tra.long',
  cra: 'VERMIN_2047.Skill.Cra.long',
  jur: 'VERMIN_2047.Skill.Jur.long',
  mec: 'VERMIN_2047.Skill.Mec.long',
  ste: 'VERMIN_2047.Skill.Ste.long',
  tec: 'VERMIN_2047.Skill.Tec.long',
  fir: 'VERMIN_2047.Skill.Fir.long',
  ran: 'VERMIN_2047.Skill.Ran.long',
  smi: 'VERMIN_2047.Skill.Smi.long',
  thr: 'VERMIN_2047.Skill.Thr.long',
  clo: 'VERMIN_2047.Skill.Clo.long',
  nou: 'VERMIN_2047.Skill.Nou.long',
  ath: 'VERMIN_2047.Skill.Ath.long',
  bra: 'VERMIN_2047.Skill.Bra.long',
  sne: 'VERMIN_2047.Skill.Sne.long',
  vig: 'VERMIN_2047.Skill.Vig.long',
  env: 'VERMIN_2047.Skill.Env.long',
  pla: 'VERMIN_2047.Skill.Pla.long',
  roa: 'VERMIN_2047.Skill.Roa.long',
  tox: 'VERMIN_2047.Skill.Tox.long',
  rui: 'VERMIN_2047.Skill.Rui.long'
};

/*
VERMIN_2047.skillDomains = {
  man: {
    label: "VERMIN_2047.SkillDomainMan",
    fullKey: "man",
    skills: [VERMIN_2047.skills.art, VERMIN_2047.skills.civ, VERMIN_2047.skills.psy, VERMIN_2047.skills.rum, VERMIN_2047.skills.hel]
  },
  beast: {
    label: "VERMIN_2047.SkillDomainBeast",
    fullKey: "beast",
    skills: [VERMIN_2047.skills.ani, VERMIN_2047.skills.dis, VERMIN_2047.skills.anl, VERMIN_2047.skills.rep, VERMIN_2047.skills.tra]
  },
  machine: {
    label: "VERMIN_2047.SkillDomainMachine",
    fullKey: "machine",
    skills: [VERMIN_2047.skills.cra, VERMIN_2047.skills.jug, VERMIN_2047.skills.mec, VERMIN_2047.skills.ste, VERMIN_2047.skills.tec]
  },
  weapon: {
    label: "VERMIN_2047.SkillDomainWeapon",
    fullKey: "weapon",
    skills: [VERMIN_2047.skills.fir, VERMIN_2047.skills.ran, VERMIN_2047.skills.smi, VERMIN_2047.skills.thr, VERMIN_2047.skills.clo]
  },
  survival: {
    label: "VERMIN_2047.SkillDomainSurvival",
    fullKey: "survival",
    skills: [VERMIN_2047.skills.nou, VERMIN_2047.skills.ath, VERMIN_2047.skills.bra, VERMIN_2047.skills.sne, VERMIN_2047.skills.vig]
  },
  earth: {
    label: "VERMIN_2047.SkillDomainEarth",
    fullKey: "earth",
    skills: [VERMIN_2047.skills.env, VERMIN_2047.skills.pla, VERMIN_2047.skills.roa, VERMIN_2047.skills.tox, VERMIN_2047.skills.rui]
  }
}
  */

/*
VERMIN_2047.manSkills = {
  art: 'VERMIN_2047.Skill.Art.long',
  civ: 'VERMIN_2047.Skill.Civ.long'
};
*/
/**
 * The set of trait Scores used within the system.
 * @enum {TraitConfiguration}
 */
/*

/**
 * Configure which trait as the base for rolls,
 * when calculating hit points per level and hit dice, and as the default modifier for
 * saving throws to maintain concentration.
 * @enum {string}
 */
VERMIN_2047.defaultTraits = {
  meleeAttack: "vig",
  rangedAttack: "acc",
  hitPoints: "het"
};

/* -------------------------------------------- */

/**
 * Configuration data for skills.
 *
 * @typedef {object} SkillConfiguration
 * @property {string} label      Localized label.
 * @property {string} trait      Key for the default trait used by this skill.
 * @property {string} fullKey    Fully written key used as alternate for enrichers.
 * @property {[int]} rarity      Rarity of the skill for [newborn, adult, elder]
 */

/**
 * The set of skill which can be trained with their default trait scores.
 * @enum {SkillConfiguration}
 */

/* -------------------------------------------- */

/**
 * Configuration data for skills domains.
 *
 * @typedef {object} SkillDomainConfiguration
 * @property {string} label        Localized label.
 * @property {string} fullKey      Fully written key used as alternate for enrichers.
 * @property {[SkillConfiguration]} skills List of included skills in the domain
 */

/**
 * The set of skill which can be trained with their default trait scores.
 * @enum {SkillDomainConfiguration}
 */
/*
VERMIN_2047.skillDomains = {
  man: {
    label: "VERMIN_2047.SkillDomainMan",
    fullKey: "man",
    skills: [VERMIN_2047.skills.art, VERMIN_2047.skills.civ, VERMIN_2047.skills.psy, VERMIN_2047.skills.rum, VERMIN_2047.skills.hel]
  },
  beast: {
    label: "VERMIN_2047.SkillDomainBeast",
    fullKey: "beast",
    skills: [VERMIN_2047.skills.ani, VERMIN_2047.skills.dis, VERMIN_2047.skills.anl, VERMIN_2047.skills.rep, VERMIN_2047.skills.tra]
  },
  machine: {
    label: "VERMIN_2047.SkillDomainMachine",
    fullKey: "machine",
    skills: [VERMIN_2047.skills.cra, VERMIN_2047.skills.jug, VERMIN_2047.skills.mec, VERMIN_2047.skills.ste, VERMIN_2047.skills.tec]
  },
  weapon: {
    label: "VERMIN_2047.SkillDomainWeapon",
    fullKey: "weapon",
    skills: [VERMIN_2047.skills.fir, VERMIN_2047.skills.ran, VERMIN_2047.skills.smi, VERMIN_2047.skills.thr, VERMIN_2047.skills.clo]
  },
  survival: {
    label: "VERMIN_2047.SkillDomainSurvival",
    fullKey: "survival",
    skills: [VERMIN_2047.skills.nou, VERMIN_2047.skills.ath, VERMIN_2047.skills.bra, VERMIN_2047.skills.sne, VERMIN_2047.skills.vig]
  },
  earth: {
    label: "VERMIN_2047.SkillDomainEarth",
    fullKey: "earth",
    skills: [VERMIN_2047.skills.env, VERMIN_2047.skills.pla, VERMIN_2047.skills.roa, VERMIN_2047.skills.tox, VERMIN_2047.skills.rui]
  }
}
  */