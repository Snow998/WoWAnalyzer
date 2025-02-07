import { GuideProps, Section, SubSection, useInfo } from 'interface/guide';
import { TALENTS_DEMON_HUNTER } from 'common/TALENTS/demonhunter';
import SPELLS from 'common/SPELLS/demonhunter';
import { ResourceLink, SpellLink } from 'interface';
import PreparationSection from 'interface/guide/components/Preparation/PreparationSection';
import HideExplanationsToggle from 'interface/guide/components/HideExplanationsToggle';
import FuryCapWaste from 'analysis/retail/demonhunter/shared/guide/FuryCapWaste';
import CooldownUsage from 'parser/core/MajorCooldowns/CooldownUsage';

import CombatLogParser from './CombatLogParser';
import CooldownGraphSubsection from './guide/CooldownGraphSubSection';
import MajorDefensives from './modules/core/MajorDefensives';
import {
  GOOD_TIME_AT_FURY_CAP,
  OK_TIME_AT_FURY_CAP,
  PERFECT_TIME_AT_FURY_CAP,
} from './modules/resourcetracker/FuryTracker';
import RESOURCE_TYPES from 'game/RESOURCE_TYPES';
import HideGoodCastsToggle from 'interface/guide/components/HideGoodCastsToggle';

export default function Guide({ modules, events, info }: GuideProps<typeof CombatLogParser>) {
  return (
    <>
      <ResourceUsageSection modules={modules} events={events} info={info} />
      <RotationSection modules={modules} events={events} info={info} />
      <MitigationSection />
      <CooldownSection modules={modules} events={events} info={info} />
      <PreparationSection />
    </>
  );
}

function ResourceUsageSection({ modules }: GuideProps<typeof CombatLogParser>) {
  const percentAtFuryCap = modules.furyTracker.percentAtCap;
  const percentAtFuryCapPerformance = modules.furyTracker.percentAtCapPerformance;
  const furyWasted = modules.furyTracker.wasted;

  return (
    <Section title="Resource Use">
      <SubSection title="Fury">
        <p>
          Vengeance's primary resource is <ResourceLink id={RESOURCE_TYPES.FURY.id} />. You should
          avoid capping <ResourceLink id={RESOURCE_TYPES.FURY.id} /> - lost{' '}
          <ResourceLink id={RESOURCE_TYPES.FURY.id} /> generation is lost DPS.
        </p>
        <FuryCapWaste
          percentAtCap={percentAtFuryCap}
          percentAtCapPerformance={percentAtFuryCapPerformance}
          perfectTimeAtFuryCap={PERFECT_TIME_AT_FURY_CAP}
          goodTimeAtFuryCap={GOOD_TIME_AT_FURY_CAP}
          okTimeAtFuryCap={OK_TIME_AT_FURY_CAP}
          wasted={furyWasted}
        />
        {modules.furyGraph.plot}
      </SubSection>
      <SubSection title="Soul Fragments">
        <p>
          Most of your abilities either <strong>build</strong> or <strong>spend</strong> Soul
          Fragments. Never use a builder at max <SpellLink spell={SPELLS.SOUL_FRAGMENT} />s or when
          doing so will cause you to overcap on <SpellLink spell={SPELLS.SOUL_FRAGMENT} />
          s.
        </p>
        <p>
          The chart below shows your <SpellLink spell={SPELLS.SOUL_FRAGMENT} />s over the course of
          the encounter.
        </p>
        {modules.soulFragmentsGraph.plot}
      </SubSection>
    </Section>
  );
}

function MitigationSection() {
  const info = useInfo();
  if (!info) {
    return null;
  }

  return (
    <Section title="Defensive Cooldowns and Mitigation">
      <MajorDefensives />
    </Section>
  );
}

function RotationSection({ modules, info }: GuideProps<typeof CombatLogParser>) {
  return (
    <Section title="Rotation">
      <p>
        Vengeance's core rotation involves <strong>building</strong> and then{' '}
        <strong>spending</strong> <ResourceLink id={RESOURCE_TYPES.FURY.id} /> and{' '}
        <SpellLink spell={SPELLS.SOUL_FRAGMENT} />
        s, which heal for 6% of damage taken in the 5 seconds before they are absorbed.
      </p>
      <br />
      <HideExplanationsToggle id="hide-explanations-rotation" />
      <HideGoodCastsToggle id="hide-good-casts-rotation" />
      {info.combatant.hasTalent(TALENTS_DEMON_HUNTER.FRACTURE_TALENT) &&
        modules.fracture.guideSubsection()}
      {modules.immolationAura.vengeanceGuideSubsection()}
      {info.combatant.hasTalent(TALENTS_DEMON_HUNTER.SIGIL_OF_FLAME_TALENT) &&
        modules.sigilOfFlame.guideSubsection()}
      {info.combatant.hasTalent(TALENTS_DEMON_HUNTER.SPIRIT_BOMB_TALENT) &&
        modules.spiritBomb.guideSubsection()}
      {modules.soulCleave.guideSubsection()}
    </Section>
  );
}

function CooldownSection({ modules, info }: GuideProps<typeof CombatLogParser>) {
  return (
    <Section title="Cooldowns">
      <p>
        Vengeance has multiple cooldowns that it can use to increase survivability or do large
        amounts of damage. In order to maximize usages over the course of an encounter, you should
        aim to send the cooldown as soon as it becomes available (as long as it can do damage on
        target) if you won't need it for an upcoming mechanic. It is particularly important to use{' '}
        <SpellLink spell={TALENTS_DEMON_HUNTER.FEL_DEVASTATION_TALENT} /> as often as possible.
      </p>
      <HideExplanationsToggle id="hide-explanations-cooldowns" />
      <HideGoodCastsToggle id="hide-good-casts-cooldowns" />
      <CooldownGraphSubsection />
      {info.combatant.hasTalent(TALENTS_DEMON_HUNTER.FEL_DEVASTATION_TALENT) && (
        <CooldownUsage analyzer={modules.felDevastation} />
      )}
      {info.combatant.hasTalent(TALENTS_DEMON_HUNTER.THE_HUNT_TALENT) && (
        <CooldownUsage analyzer={modules.theHunt} />
      )}
      {info.combatant.hasTalent(TALENTS_DEMON_HUNTER.SOUL_CARVER_TALENT) && (
        <CooldownUsage analyzer={modules.soulCarver} />
      )}
    </Section>
  );
}
