import type { MissionEnvironment, SpaceflightHazard } from '../types';

export function getEnvironmentModifiers(env: MissionEnvironment): Record<string, number> {
  switch (env) {
    case 'spacecraft':
      // Dynamic loads during launch/landing, radiation in transit, tight confinement
      return {
        radiationMultiplier: 1.8,
        confinementMultiplier: 1.5,
        fluidShiftMultiplier: 1.2,
        decompressionMultiplier: 0.8,
        boneLossMultiplier: 1.1,
      };
    case 'space-station':
      // Long-duration microgravity, cephalad fluid shift (SANS), bone loss
      return {
        radiationMultiplier: 1.0,
        confinementMultiplier: 1.1,
        fluidShiftMultiplier: 1.8,
        decompressionMultiplier: 0.9,
        boneLossMultiplier: 1.7,
      };
    case 'surface-rover':
      // EVA excursions, suit pressure fluctuations, decompression sickness risk, hypoxia
      return {
        radiationMultiplier: 1.3,
        confinementMultiplier: 1.4,
        fluidShiftMultiplier: 0.7,
        decompressionMultiplier: 2.2,
        boneLossMultiplier: 0.6,
      };
    case 'planetary-base':
      // Long-term Mars stay, 44-min comm delay, autonomous medical care, isolation
      return {
        radiationMultiplier: 1.4,
        confinementMultiplier: 1.6,
        fluidShiftMultiplier: 0.6,
        decompressionMultiplier: 1.2,
        boneLossMultiplier: 0.8,
      };
    case 'earth-remote':
      // Terrestrial analogue / remote healthcare
      return {
        radiationMultiplier: 0.1,
        confinementMultiplier: 0.5,
        fluidShiftMultiplier: 0.1,
        decompressionMultiplier: 0.2,
        boneLossMultiplier: 0.1,
      };
    default:
      return {
        radiationMultiplier: 1.0,
        confinementMultiplier: 1.0,
        fluidShiftMultiplier: 1.0,
        decompressionMultiplier: 1.0,
        boneLossMultiplier: 1.0,
      };
  }
}

export function getActiveHazards(env: MissionEnvironment): SpaceflightHazard[] {
  switch (env) {
    case 'spacecraft':
      return ['gravity-fields', 'space-radiation', 'isolation-confinement', 'distance-from-earth'];
    case 'space-station':
      return ['gravity-fields', 'hostile-environments', 'isolation-confinement'];
    case 'surface-rover':
      return ['hostile-environments', 'gravity-fields', 'space-radiation'];
    case 'planetary-base':
      return ['distance-from-earth', 'isolation-confinement', 'hostile-environments', 'gravity-fields', 'space-radiation'];
    case 'earth-remote':
      return ['distance-from-earth', 'hostile-environments'];
    default:
      return ['gravity-fields', 'space-radiation', 'hostile-environments', 'isolation-confinement', 'distance-from-earth'];
  }
}

export function getEnvironmentDescription(env: MissionEnvironment): string {
  switch (env) {
    case 'spacecraft':
      return 'Transit Vehicle (Orion / Deep Space Transport). High radiation transit, launch & landing G-load focus, acoustic and tight capsule constraints.';
    case 'space-station':
      return 'Microgravity Orbital Habitat (ISS / Commercial LEO). Long-term zero-G cephalad fluid shifts, SANS, osteopenia, closed atmospheric loops.';
    case 'surface-rover':
      return 'Pressurized Lunar / Mars Rover. Field EVA operations, spacesuit pressure transitions, decompression sickness, and physical trauma management.';
    case 'planetary-base':
      return 'Artemis Base Camp / Mars Habitat. Autonomous long-duration care, up to 44-minute round-trip comm latency, hydroponics & bioregenerative food.';
    case 'earth-remote':
      return 'Rural / Polar Station Telemedicine. Disconnected clinic analogue, battery-powered ultrasound, point-of-care glucometry, offline triage protocols.';
    default:
      return 'Standard Spaceflight Environment.';
  }
}

export function getCommDelayString(env: MissionEnvironment): string {
  switch (env) {
    case 'spacecraft':
      return '2.4s - 12m (Distance Dependent)';
    case 'space-station':
      return '< 0.5s (Near Real-Time Telemetry)';
    case 'surface-rover':
      return '1.3s (Lunar) / 4 - 24m (Mars EVA)';
    case 'planetary-base':
      return 'Up to 44m Round-Trip (Autonomous Protocol Mandatory)';
    case 'earth-remote':
      return 'Intermittent Satellite Sync (Hours/Days)';
    default:
      return 'Variable';
  }
}
