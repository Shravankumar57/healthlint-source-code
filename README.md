# HealthLint: Autonomous Crew Health Monitoring & Triage Software

> **NASA Space Apps Challenge**  
> **Challenge Track:** Create Health Monitoring Software for Astronauts on Space Missions  
> **Team Name:** CompileCrew  
> **Team Members:**  
> - **Pavan R Mudigoudra** — Lead Systems & NASA Data Architect  
> - **Shravankumar K Bandi** — Clinical Decision & Biomarker Engine Lead  
> - **Mithil A** — Interactive UX, Anatomy & Visualization Lead  

---

## 🚀 Executive Summary & Value Proposition

**HealthLint** is an autonomous physiological surveillance, multi-modal clinical diagnostic, and countermeasure platform designed for deep-space exploration missions (Artemis lunar sorties, Mars transit, and planetary habitats).

As astronauts venture toward Mars, **Distance from Earth** introduces communication latencies of up to **44 minutes round-trip** and halts emergency medical resupply or immediate ground surgical intervention. Non-physician crew members must independently detect, monitor, and treat compounding spaceflight health risks without relying on continuous Earth telemetry.

HealthLint operationalizes the full spectrum of the **NASA Human Research Program (HRP)** by integrating:
1. **Interactive 3D WebGL Anatomy:** A clickable tri-mesh human body map enabling instant visual localization of symptoms and anomalies.
2. **Multi-Modal Biosignal Ingestion:** Real-time integration of ultrasound imagery, fingerstick blood chemistry, saliva stress omics, and continuous EVA spacesuit telemetry.
3. **Five-Hazard Diagnostic Engine:** Transparent, rule-based algorithmic inference with automated Green/Amber/Red triage classifications and Flight Surgeon escalation logic.
4. **Behavioral Gamification & Streaks:** Daily countermeasure compliance tracking with HealthLint XP and unlockable flight badges to combat mission fatigue.
5. **Adaptive Multi-Habitat Modes:** Context-aware switching across Spacecraft, Space Station, Surface Rover, Planetary Base, and Earth Remote Clinics.

---

## 🧬 Architectural Overview

```
                                  +---------------------------------------------+
                                  |     MULTI-MODAL BIOSIGNAL INGESTION LAYER   |
                                  |  - Tempus Pro BT-LE Vitals (ECG, NIBP, HR)  |
                                  |  - Butterfly iQ+ Handheld Ultrasound (ONSD) |
                                  |  - Point-of-Care Capillary Blood Glucose    |
                                  |  - EVA Spacesuit Telemetry (SpO2, Cabin CO2)|
                                  +----------------------+----------------------+
                                                         |
                                                         v
                                  +---------------------------------------------+
                                  |    NASA HRP 5-HAZARD INFERENCE ENGINE      |
                                  |  - Gravity Fields & Cephalad SANS Shift     |
                                  |  - Deep-Space Cosmic & Solar Radiation      |
                                  |  - Hostile / Closed ECLSS Environments      |
                                  |  - Isolation, Fatigue & Circadian Loss      |
                                  |  - Up to 44-Min Comm Latency Resilience     |
                                  +----------------------+----------------------+
                                                         |
                        +--------------------------------+--------------------------------+
                        |                                                                 |
                        v                                                                 v
+-----------------------------------------------+               +-----------------------------------------------+
|      AUTONOMOUS CREW SELF-CARE DECISION       |               |       FLIGHT SURGEON ESCALATION GATEWAY       |
|  - Guided Non-Physician Clinical Tutorials    |               |  - Priority Encrypted DSN Telemetry Burst     |
|  - Thigh Cuff Venous Occlusion Protocol       |               |  - Compressed DICOM Ultrasound Batch Packets  |
|  - Zero T2 High-Load Resistive Regimens       |               |  - Low-Bandwidth Forward-Error Correction     |
|  - Low-Glycemic Food Physiology Diet Plans    |               |  - Ground Medical Specialist Notification     |
+-----------------------+-----------------------+               +-----------------------+-----------------------+
                        |                                                               |
                        +--------------------------------+------------------------------+
                                                         |
                                                         v
                                  +---------------------------------------------+
                                  |       GAMIFIED CREW WELLNESS & ADHERENCE    |
                                  |  - HealthLint XP Countermeasure Rewards     |
                                  |  - Daily Mission Routine Streak Protection  |
                                  |  - Milestone Achievement Flight Badges      |
                                  +---------------------------------------------+
```

---

## 🛰️ Multi-Environment Context Matrix

HealthLint adapts diagnostic rules, alert thresholds, and telemetry priorities according to the operational habitat:

| Environment | Primary Targeted Hazards | Hardware & Data Integration | Operational Impact |
| :--- | :--- | :--- | :--- |
| **1. Space Station (LEO / ISS)** | Microgravity SANS, osteopenia, venous stasis, closed ECLSS microbes | CIPHER, Standard Measures, ocular/spinal ultrasound, venous Doppler | Automates daily crew routine reminders, cutting CMO diagnostic time by >50%. |
| **2. Deep-Space Spacecraft (Transit)** | Heavy GCR/SPE radiation, tight confinement, dynamic re-entry loads | ARCHeR actigraphy, Immune Biomarkers saliva logs, Occupant Protection | Protects crew immunity, circadian alertness, and manual piloting readiness. |
| **3. Surface Rover (Lunar / Mars)** | Decompression sickness ("bends"), mild hypoxia, cabin CO2, suit fatigue | Tempus Pro vitals, spacesuit O2/CO2 pressure telemetry, gait tests | Delivers real-time pre-breathe verification and rapid field triage during EVAs. |
| **4. Planetary Base (Mars Outpost)** | Up to 44-min comm lag, nutritional decay, hydroponic crop safety | Omics Archive, Zero T2 resistance logs, Veggie microbial swabs | Enables autonomous medical self-sufficiency when Earth consults are impossible. |
| **5. Earth Remote & Rural Clinics** | Physician shortages, delayed emergency transport, chronic illness | Handheld USB ultrasound, glucometers, consumer wearables | Empowers community health workers, polar stations, and disaster teams. |

---

## 🔬 NASA Human Research Program (HRP) Grounding

HealthLint incorporates findings and protocols from **20+ official NASA flight investigations**:

### Artemis II Deep-Space Suite
- **ARCHeR (Actigraphy, Sleep & Well-Being):** Correlates sleep loss with cognitive reaction times; schedules circadian lighting resets.
- **Immune Biomarkers:** Monitors latent herpesvirus (EBV, VZV) shedding in saliva under radiation and confinement stress.
- **Artemis II Standard Measures:** Core pre-, in-, and post-flight physiological baseline tracking.

### Low Earth Orbit (LEO) Neuro-Ocular & Vascular Suite
- **Brain Fluid Pressure & SANS:** Evaluates cephalad fluid shift and optic nerve sheath diameter (ONSD).
- **Thigh Cuff Protocol:** Prescribes 4-hour bilateral lower-body pneumatic occlusion to trap fluid and relieve cranial pressure.
- **Venous Haemostasis:** Detects blood stagnation in the internal jugular vein to prevent spaceflight-associated thrombosis.
- **Zero T2 & CIPHER:** Schedules high-load treadmill-free resistance workouts preserving 95.2% bone mineral density.
- **Simulating Manual Piloting:** Evaluates vestibular otolith function before manual spacecraft controls.
- **Spacecraft Occupant Protection:** Certifies spine retention prior to dynamic water/ground landing decelerations.

### Past HRP Archives, Diet & Telemedicine
- **Tempus Pro Integration:** Standards for tactical vital sign monitoring and high-compression burst telemetry.
- **Food Physiology & Food Acceptability:** Low-glycemic dietary interventions countering stress-induced hyperglycemia.
- **Space Gardening & Veggie Monitoring:** Psychological biophilic decompression and fresh produce microbial safety.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Core:** React 19, TypeScript, Vite
- **Styling & Aesthetics:** Tailwind CSS v4, Custom Aerospace Glassmorphism Design System
- **3D Visualization:** Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Data Analytics & Trends:** Recharts (Longitudinal Area & Line Charting)
- **State Management:** Zustand with LocalStorage Persistence for Offline Adherence
- **Icons & Visual Language:** Lucide React
- **Clinical Inference Engine:** Transparent Rule-Based Diagnostic Engine with Delta Calculations

---

## 📦 Getting Started & Local Installation

### Prerequisites
- **Node.js:** v18.0.0 or later (v24 LTS recommended)
- **Package Manager:** npm or yarn

### Installation Steps
```bash
# 1. Clone or navigate to the repository
cd healthlint

# 2. Install dependencies
npm install

# 3. Launch local development server
npm run dev

# 4. Open in browser:
# Navigate to http://localhost:5173
```

### Production Build
```bash
# Build the optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## ⚠️ Medical Safety & Prototype Notice

**NASA SPACE APPS CHALLENGE NOTICE:**  
The clinical thresholds, algorithmic findings, and guided countermeasure recommendations presented in HealthLint are functional prototypes grounded in published aerospace medical literature (NASA HRP, CIPHER, Standard Measures). This software is designed to demonstrate decision-support concepts for autonomous astronaut triage and **does NOT replace the certified clinical judgment of a licensed Flight Surgeon or physician**. All critical alerts mandate ground medical escalation whenever communications permit.

---

## 👥 CompileCrew Engineering Contributions

- **Pavan R Mudigoudra** (Lead Systems & NASA Data Architect): Designed multi-environment telemetry routing, state models, and NASA HRP data pipeline.
- **Shravankumar K Bandi** (Clinical Decision & Biomarker Engine Lead): Developed the 5-Hazard diagnostic rule matrix, biomarker thresholds, and ground escalation logic.
- **Mithil A** (Interactive UX, Anatomy & Visualization Lead): Designed the 3D WebGL anatomy canvas, clinical triage cards, Recharts trends, and gamified XP engine.

*Developed with pride for the NASA Space Apps Challenge.*
