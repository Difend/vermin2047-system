/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/vermin-2047/templates/actor/parts/actor-traits.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-skills.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-specialities.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-identity.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-pools.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-special-features.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-items.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-weapons.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-protections.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-injuries.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-effects.hbs',
    'systems/vermin-2047/templates/actor/parts/actor-wounds.hbs',
    // Item partials
    'systems/vermin-2047/templates/item/parts/item-effects.hbs',
    // Roll partials
    'systems/vermin-2047/templates/rolls/skills.hbs',
  ]);
};
