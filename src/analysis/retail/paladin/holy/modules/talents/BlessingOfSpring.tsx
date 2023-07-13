import SPELLS from 'common/SPELLS';
import talents from 'common/TALENTS/paladin';
import { formatNumber } from 'common/format';
import Analyzer, { Options, SELECTED_PLAYER } from 'parser/core/Analyzer';
import { calculateEffectiveHealing } from 'parser/core/EventCalculateLib';
import Events, { HealEvent } from 'parser/core/Events';
import BoringSpellValueText from 'parser/ui/BoringSpellValueText';
import ItemHealingDone from 'parser/ui/ItemHealingDone';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import Statistic from 'parser/ui/Statistic';
import { ReactNode } from 'react';

const healingDoneIncreased = 0.15;
const healingReceivedIncreased = 0.3;

class BlessingOfSpring extends Analyzer {
  private additonalHealingDone = 0;
  private additonalHealingReceived = 0;

  constructor(options: Options) {
    super(options);
    this.active = this.selectedCombatant.hasTalent(talents.BLESSING_OF_SUMMER_TALENT);
    if (!this.active) {
      return;
    }

    this.addEventListener(Events.heal.by(SELECTED_PLAYER), this.onHealDone);

    this.addEventListener(Events.heal.to(SELECTED_PLAYER), this.onHealReceived);
  }

  onHealDone(event: HealEvent) {
    if (!this.selectedCombatant.hasBuff(SPELLS.BLESSING_OF_SPRING_TALENT.id)) {
      return;
    }
    this.additonalHealingDone += calculateEffectiveHealing(event, healingDoneIncreased);
  }

  onHealReceived(event: HealEvent) {
    if (!this.selectedCombatant.hasBuff(SPELLS.BLESSING_OF_SPRING_TALENT.id)) {
      return;
    }
    this.additonalHealingReceived += calculateEffectiveHealing(event, healingReceivedIncreased);
  }

  statistic(): ReactNode {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL()}
        category={STATISTIC_CATEGORY.TALENTS}
        size="flexible"
        tooltip={
          <>
            *Analyzer Only Supports Self-Cast Of Spring* <br />
            Healing Done:{' '}
            <b>{formatNumber((this.additonalHealingDone / this.owner.fightDuration) * 1000)} hps</b>
            <br />
            Healing Received:{' '}
            <b>
              {formatNumber((this.additonalHealingReceived / this.owner.fightDuration) * 1000)} hps
            </b>
          </>
        }
      >
        <BoringSpellValueText spell={SPELLS.BLESSING_OF_SPRING_TALENT}>
          <ItemHealingDone amount={this.additonalHealingDone + this.additonalHealingReceived} />
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default BlessingOfSpring;
