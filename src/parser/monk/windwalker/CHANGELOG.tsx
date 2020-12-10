import { Juko8, Abelito75 } from 'CONTRIBUTORS';

import React from 'react';
import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import { change, date } from 'common/changelog';

export default [
  change(date(2020, 12, 6), 'Converted most Windwalker modules to TypeScript', Juko8),
  change(date(2020, 11, 25), <>Added <SpellLink id={SPELLS.JADE_IGNITION.id} /></>, Juko8),
  change(date(2020, 10, 20), <>Added <SpellLink id={SPELLS.EXPEL_HARM.id} icon /> cast efficiency to checklist</>, Juko8),
  change(date(2020, 10, 19), <>Added <SpellLink id={SPELLS.LAST_EMPERORS_CAPACITOR.id} /></>, Juko8),
  change(date(2020, 10, 17), <>Minor changes, <SpellLink id={SPELLS.ENERGIZING_ELIXIR_TALENT.id} icon /> GCD removed, <SpellLink id={SPELLS.BLACKOUT_KICK.id} icon /> CDR during Serenity updated, and cast efficiency for <SpellLink id={SPELLS.EXPEL_HARM.id} icon /> added </>, Juko8 ),
  change(date(2020, 10, 6), <>Added Fallen Order statistic.</>, Abelito75),
  change(date(2020, 9, 9), 'Updated for 9.0 Shadowlands', Juko8),
];
