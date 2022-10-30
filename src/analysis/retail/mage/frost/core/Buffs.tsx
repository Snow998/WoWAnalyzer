import SPELLS from 'common/SPELLS';
import TALENTS from 'common/TALENTS/mage';
import BLOODLUST_BUFFS from 'game/BLOODLUST_BUFFS';
import CoreAuras from 'parser/core/modules/Auras';

class Buffs extends CoreAuras {
  auras() {
    const combatant = this.selectedCombatant;

    // This should include ALL buffs that can be applied by your spec.
    // This data can be used by various kinds of modules to improve their results, and modules added in the future may rely on buffs that aren't used today.
    return [
      {
        spellId: TALENTS.BRAIN_FREEZE_TALENT.id,
        timelineHighlight: true,
      },
      {
        spellId: TALENTS.FINGERS_OF_FROST_TALENT.id,
        timelineHighlight: true,
      },
      {
        spellId: TALENTS.ICY_VEINS_TALENT.id,
        triggeredBySpellId: TALENTS.ICY_VEINS_TALENT.id,
        timelineHighlight: true,
      },
      {
        spellId: SPELLS.RUNE_OF_POWER_BUFF.id,
        enabled: combatant.hasTalent(TALENTS.RUNE_OF_POWER_TALENT),
        timelineHighlight: true,
      },
      {
        spellId: TALENTS.ICE_BARRIER_TALENT.id,
        triggeredBySpellId: TALENTS.ICE_BARRIER_TALENT.id,
        timelineHighlight: true,
      },
      {
        spellId: TALENTS.ICE_BLOCK_TALENT.id,
        triggeredBySpellId: TALENTS.ICE_BLOCK_TALENT.id,
        timelineHighlight: true,
      },
      {
        spellId: SPELLS.MIRROR_IMAGE.id,
        triggeredBySpellId: SPELLS.MIRROR_IMAGE.id,
        timelineHighlight: true,
      },
      {
        spellId: Object.keys(BLOODLUST_BUFFS).map((item) => Number(item)),
        timelineHighlight: true,
      },
    ];
  }
}

export default Buffs;