import ManaTracker from 'parser/core/healingEfficiency/ManaTracker';
import AbilityTracker from 'parser/shared/modules/AbilityTracker';
import ManaLevelChart from 'parser/shared/modules/resources/mana/ManaLevelChart';
import ManaUsageChart from 'parser/shared/modules/resources/mana/ManaUsageChart';
import SpellManaCost from 'parser/shared/modules/SpellManaCost';
import BaseCombatLogParser from 'parser/tbc/CombatLogParser';
import lowRankSpellsSuggestion from 'parser/tbc/suggestions/lowRankSpells';

import lowRankSpells from './lowRankSpells';
import Abilities from './modules/Abilities';

class CombatLogParser extends BaseCombatLogParser {
  static specModules = {
    abilities: Abilities,
    spellManaCost: SpellManaCost,
    abilityTracker: AbilityTracker,
    manaLevelChart: ManaLevelChart,
    manaUsageChart: ManaUsageChart,
    // Mana Tab
    manaTracker: ManaTracker,
  };

  static suggestions = [...BaseCombatLogParser.suggestions, lowRankSpellsSuggestion(lowRankSpells)];
}

export default CombatLogParser;