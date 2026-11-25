import type {
  DiagnosticInput,
  DiagnosticRule,
  DiagnosticResult,
  DiagnosticFinding,
  HealthStatus,
} from '../types';

export function evaluateDiagnostics(
  inputs: DiagnosticInput[],
  rules: DiagnosticRule[]
): DiagnosticResult {
  const findings: DiagnosticFinding[] = [];
  const recommendations: string[] = [];
  let worstStatus: HealthStatus = 'green';
  let escalationRequired = false;
  let escalationReason: string | undefined = undefined;

  for (const input of inputs) {
    const numVal = typeof input.value === 'number' ? input.value : parseFloat(String(input.value));
    const rule = rules.find((r) => r.indicatorId === input.id);

    if (!rule || isNaN(numVal)) {
      // If no numerical rule, fallback to generic nominal
      findings.push({
        indicator: input.name,
        value: input.value,
        baseline: 'Standard',
        status: input.status || 'green',
        explanation: `${input.name} recorded. Observation consistent with expected baseline.`,
      });
      continue;
    }

    let status: HealthStatus = 'green';
    let explanation = '';

    if (rule.direction === 'above') {
      if (numVal >= rule.redThreshold) {
        status = 'red';
        explanation = `${input.name} (${numVal} ${input.unit}) critically exceeds upper safety ceiling (Threshold: ${rule.redThreshold} ${input.unit}). ${rule.explanation}`;
      } else if (numVal >= rule.amberRange[0] && numVal <= rule.amberRange[1]) {
        status = 'amber';
        explanation = `${input.name} (${numVal} ${input.unit}) is elevated into caution zone (${rule.amberRange[0]}-${rule.amberRange[1]} ${input.unit}). ${rule.explanation}`;
      } else {
        status = 'green';
        explanation = `${input.name} is nominal (${numVal} ${input.unit}) within target bounds (${rule.greenRange[0]}-${rule.greenRange[1]} ${input.unit}).`;
      }
    } else if (rule.direction === 'below') {
      if (numVal <= rule.redThreshold) {
        status = 'red';
        explanation = `${input.name} (${numVal} ${input.unit}) critically drops below lower safety limit (Threshold: ${rule.redThreshold} ${input.unit}). ${rule.explanation}`;
      } else if (numVal >= rule.amberRange[0] && numVal <= rule.amberRange[1]) {
        status = 'amber';
        explanation = `${input.name} (${numVal} ${input.unit}) in cautionary low range (${rule.amberRange[0]}-${rule.amberRange[1]} ${input.unit}). ${rule.explanation}`;
      } else {
        status = 'green';
        explanation = `${input.name} is nominal (${numVal} ${input.unit}) within physiological bounds (${rule.greenRange[0]}-${rule.greenRange[1]} ${input.unit}).`;
      }
    } else {
      // Both bounds
      if (numVal < rule.amberRange[0] || numVal > rule.amberRange[1]) {
        status = 'red';
        explanation = `${input.name} (${numVal} ${input.unit}) outside acceptable safe window. ${rule.explanation}`;
      } else if (numVal < rule.greenRange[0] || numVal > rule.greenRange[1]) {
        status = 'amber';
        explanation = `${input.name} (${numVal} ${input.unit}) slightly deviated from optimal range. ${rule.explanation}`;
      } else {
        status = 'green';
        explanation = `${input.name} (${numVal} ${input.unit}) fully nominal.`;
      }
    }

    // Baseline calculation delta
    const baseline = (rule.greenRange[0] + rule.greenRange[1]) / 2;
    const delta = baseline !== 0 ? ((numVal - baseline) / baseline) * 100 : 0;

    findings.push({
      indicator: input.name,
      value: numVal,
      baseline: `${baseline} ${input.unit}`,
      status,
      explanation,
      delta: Math.round(delta * 10) / 10,
    });

    if (status === 'red') {
      worstStatus = 'red';
      escalationRequired = true;
      escalationReason = rule.escalation;
      recommendations.push(`CRITICAL ACTION: ${rule.action}`);
      recommendations.push(`GROUND ESCALATION: ${rule.escalation}`);
    } else if (status === 'amber' && worstStatus !== 'red') {
      worstStatus = 'amber';
      recommendations.push(`CREW CAUTION ACTION: ${rule.action}`);
    }
  }

  if (recommendations.length === 0) {
    recommendations.push('All evaluated parameters are within acceptable NASA HRP flight baselines. Maintain routine countermeasure schedule.');
  }

  // Medical Safety & Prototype Disclaimer requirement
  recommendations.push(
    'NASA SPACE APPS PROTOTYPE NOTICE: Clinical thresholds, rule logic, and countermeasures presented are algorithmic prototypes derived from NASA Human Research Program literature (CIPHER, Standard Measures, ARCHeR). This software assists autonomous crew triage and does NOT replace licensed Flight Surgeon clinical judgment.'
  );

  return {
    id: `DIAG-${Date.now().toString(36).toUpperCase()}`,
    timestamp: new Date().toISOString(),
    inputs,
    status: worstStatus,
    findings,
    recommendations,
    escalationRequired,
    escalationReason,
  };
}
