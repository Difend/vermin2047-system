import VerminRoll from "./base.mjs";

export default class SkillRoll extends VerminRoll {
  /**
   * @param {string} [formula="1d10"]        Default skill check is a flat 1d10.
   * @param {Record<string, any>} [data]     Roll data.
   * @param {{ flavor?: string, successThreshold?: number, handicap?: number }} [options]  Options to modify roll display.
   */
  constructor(formula = "1d10", data = {}, options = {}) {
    super(formula, data, options);
  }

  /* -------------------------------------------------- */

  static CHAT_TEMPLATE = "systems/vermin-2047/templates/rolls/skills.hbs"

  /* -------------------------------------------------- */

  /**
   * The threshold that each die needs to be equal or higher to
   * @returns {number}
   * @defaultValue `7`
   */
  get difficulty() {
    return this.options.difficulty ?? 7;
  }

  /**
   * Number of additionnal success to get
   * @returns {number}
   * @defaultValue `0`
   */
  get handicap() {
    return this.options.handicap ?? 0;
  }

  /* -------------------------------------------------- */

  /**
   * Did the skill check succeed
   * @returns {boolean}
   */
  get comparison() {
    let successes = 0;

    for(let term of this.terms) {
      if(Object.hasOwn(term,'results') && term.results.length > 0) {
        for(let die of term.results) {
          if(die.result !== undefined && die.result >= this.difficulty) successes++;
        }
      }
    }
    this.successes = successes;
    return this.successes >= this.handicap+1;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  async _prepareChatRenderContext({ flavor, isPrivate = false, ...options } = {}) {
    const context = await super._prepareChatRenderContext({ flavor, isPrivate, ...options });
    let handicap_txt = ''
    if(this.handicap > 0) handicap_txt = ' ('+'I'.repeat(this.handicap)+')';

    if (!isPrivate) {
      context.flavor ??= game.i18n.localize('VERMIN_2047.Labels.Difficulty')+' '+this.difficulty+handicap_txt
      context.result = this.comparison ? game.i18n.localize('VERMIN_2047.Labels.Success') : game.i18n.localize('VERMIN_2047.Labels.Failure');
      context.result_class = this.comparison ? 'success' : 'failure';
      context.handicap = this.handicap ?? 0;
    }

    return context;
  }

  /* -------------------------------------------------- */

  /** @inheritdoc */
  async toMessage(messageData, messageOptions) {
    // Skill checks always create Skill check messages
    // `system.effect` is expected to be passed; if not it will throw in construction
    //messageData.type = "test";
    return super.toMessage(messageData, messageOptions);
  }
}