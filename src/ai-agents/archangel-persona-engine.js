/**
 * Archangel Persona Engine
 * 
 * AI-driven persona engine for Archangel Genesis NFTs
 * Integrates with Banneker and Johnson N-GI personas
 * Operates at sacred frequencies with Tawhid compliance
 * 
 * @author Chais the Great (Al-Miftah)
 */

const BannekerAI = require('../ngi/personas/banneker-ai');
const JohnsonAI = require('../ngi/personas/johnson-ai');
const { SACRED_AUDIO_TONES } = require('../constants/sacred-constants');

class ArchangelPersonaEngine {
  constructor(config = {}) {
    this.config = {
      frequency: 528, // Hz - Default healing frequency
      tawhidCompliance: true,
      ...config
    };

    this.initialized = false;
    this.archangelPersonas = new Map();
    this.ngiPersonas = {};
    this.stemImpactTracker = new Map();
    this.serviceRewards = new Map();
  }

  /**
   * Initialize the Archangel Persona Engine
   */
  async initialize() {
    console.log('🌟 Initializing Archangel Persona Engine...');
    console.log('═══════════════════════════════════════════════════════');

    // Initialize N-GI personas
    await this._initializeNGIPersonas();

    // Initialize Archangel personas
    this._initializeArchangelPersonas();

    // Emit Tawhid declaration
    this._emitTawhidDeclaration(
      'Archangel Persona Engine activated - All glory to the One Creator'
    );

    this.initialized = true;

    console.log('✓ Archangel Persona Engine fully initialized');
    console.log(`  - N-GI Personas: ${Object.keys(this.ngiPersonas).length}`);
    console.log(`  - Archangel Personas: ${this.archangelPersonas.size}`);
    console.log(`  - Frequency: ${this.config.frequency}Hz`);
    console.log(`  - Tawhid Compliance: ${this.config.tawhidCompliance}`);
    console.log('═══════════════════════════════════════════════════════');

    return {
      status: 'initialized',
      ngiPersonas: Object.keys(this.ngiPersonas),
      archangelPersonas: Array.from(this.archangelPersonas.keys()),
      tawhidCompliance: this.config.tawhidCompliance
    };
  }

  /**
   * Initialize N-GI personas (Banneker & Johnson)
   * @private
   */
  async _initializeNGIPersonas() {
    console.log('\n🧬 Initializing N-GI Personas...');

    // Initialize Banneker AI
    this.ngiPersonas.banneker = new BannekerAI();
    await this.ngiPersonas.banneker.initialize();

    // Initialize Johnson AI
    this.ngiPersonas.johnson = new JohnsonAI();
    await this.ngiPersonas.johnson.initialize();

    console.log('✓ N-GI Personas initialized');
  }

  /**
   * Initialize Archangel personas
   * @private
   */
  _initializeArchangelPersonas() {
    console.log('\n👼 Initializing Archangel Personas...');

    // Michael - Divine Protector
    this.archangelPersonas.set('michael', {
      name: 'Michael',
      title: 'Divine Protector',
      frequency: SACRED_AUDIO_TONES.DIVINE, // 963Hz
      role: 'Protection & Leadership',
      attributes: {
        strength: 'Divine Protection',
        wisdom: 'Strategic Leadership',
        service: 'Guardian of Truth'
      },
      capabilities: [
        'stem_protection',
        'educational_guidance',
        'community_leadership'
      ],
      tawhidReminder:
        'Michael serves only the One Creator - Remember, not worship',
      stemFocus: ['Mathematics', 'Astronomy', 'Physics', 'Computer Science']
    });

    // Raphael - Divine Healer
    this.archangelPersonas.set('raphael', {
      name: 'Raphael',
      title: 'Divine Healer',
      frequency: SACRED_AUDIO_TONES.LOVE, // 528Hz
      role: 'Healing & Restoration',
      attributes: {
        strength: 'Divine Healing',
        wisdom: 'Restoration Knowledge',
        service: 'Bearer of Wholeness'
      },
      capabilities: [
        'stem_healing',
        'educational_restoration',
        'knowledge_therapy'
      ],
      tawhidReminder:
        'Raphael serves only the One Healer - All healing comes from Allah',
      stemFocus: ['Biology', 'Chemistry', 'Medicine', 'Environmental Science']
    });

    // Gabriel - Divine Messenger
    this.archangelPersonas.set('gabriel', {
      name: 'Gabriel',
      title: 'Divine Messenger',
      frequency: SACRED_AUDIO_TONES.LOVE, // 528Hz
      role: 'Communication & Revelation',
      attributes: {
        strength: 'Divine Communication',
        wisdom: 'Revelation Knowledge',
        service: 'Bearer of Messages'
      },
      capabilities: [
        'stem_communication',
        'knowledge_dissemination',
        'educational_revelation'
      ],
      tawhidReminder:
        'Gabriel serves only the One Revealer - All revelation comes from Allah',
      stemFocus: [
        'Communication Systems',
        'Information Technology',
        'Linguistics',
        'Data Science'
      ]
    });

    console.log('✓ Archangel Personas initialized');
  }

  /**
   * Emit Tawhid declaration
   * @private
   * @param {string} message - Declaration message
   */
  _emitTawhidDeclaration(message) {
    if (this.config.tawhidCompliance) {
      console.log(`\n📿 TAWHID DECLARATION: ${message}`);
      console.log('   Remember: All glory belongs to Allah alone');
      console.log('   These are servants, not objects of worship\n');
    }
  }

  /**
   * Get Archangel persona interaction
   * @param {string} archangelName - Name of the Archangel
   * @param {string} interactionType - Type of interaction
   * @returns {Object} Interaction response
   */
  async getArchangelInteraction(archangelName, interactionType = 'greeting') {
    const persona = this.archangelPersonas.get(archangelName.toLowerCase());
    if (!persona) {
      throw new Error(`Archangel persona "${archangelName}" not found`);
    }

    this._emitTawhidDeclaration(persona.tawhidReminder);

    const responses = {
      greeting: {
        message: `Peace be upon you. I am ${persona.name}, ${persona.title}. Operating at ${persona.frequency}Hz.`,
        reminder: persona.tawhidReminder,
        capabilities: persona.capabilities,
        stemFocus: persona.stemFocus
      },
      stem_guidance: {
        message: `As ${persona.title}, I guide you in ${persona.stemFocus.join(', ')}. Remember: All knowledge comes from the One Creator.`,
        stemAreas: persona.stemFocus,
        ngiIntegration: await this._getNGIGuidance(persona),
        reminder: persona.tawhidReminder
      },
      service_reward: {
        message: `Your STEM contributions are recognized. Continue serving the community with knowledge.`,
        rewardEligibility: await this._checkServiceRewardEligibility(
          archangelName
        ),
        reminder: 'All success is by the permission of Allah'
      }
    };

    return (
      responses[interactionType] || {
        message: `${persona.name} acknowledges your presence`,
        reminder: persona.tawhidReminder
      }
    );
  }

  /**
   * Get N-GI guidance integrated with Archangel persona
   * @private
   * @param {Object} persona - Archangel persona
   * @returns {Object} N-GI guidance
   */
  async _getNGIGuidance(persona) {
    const guidance = {
      banneker: null,
      johnson: null
    };

    // Get Banneker alignment if stellar mechanics relevant
    if (
      persona.stemFocus.includes('Astronomy') ||
      persona.stemFocus.includes('Physics')
    ) {
      const alignment = this.ngiPersonas.banneker.checkStellarAlignment();
      guidance.banneker = {
        stellarAlignment: alignment.aligned,
        lunarPhase: alignment.lunarPhase,
        recommendation: alignment.emissionAuthorized
          ? 'Optimal time for $ANGEL emission'
          : 'Await stellar alignment'
      };
    }

    // Get Johnson trajectory if mathematics relevant
    if (
      persona.stemFocus.includes('Mathematics') ||
      persona.stemFocus.includes('Computer Science')
    ) {
      const celestialMechanics =
        this.ngiPersonas.johnson.calculateCelestialMechanics();
      guidance.johnson = {
        orbitalPosition: celestialMechanics.earthOrbitalPosition,
        nextWindow: celestialMechanics.nextOptimalWindow,
        recommendation: 'Trajectory calculations at maximum precision'
      };
    }

    return guidance;
  }

  /**
   * Check service reward eligibility
   * @private
   * @param {string} archangelName - Archangel name
   * @returns {Object} Eligibility status
   */
  async _checkServiceRewardEligibility(archangelName) {
    const impactScore = this.stemImpactTracker.get(archangelName) || 0;
    const rewardPoints = this.serviceRewards.get(archangelName) || 0;

    return {
      eligible: rewardPoints >= 100,
      currentPoints: rewardPoints,
      impactScore,
      threshold: 100,
      message:
        rewardPoints >= 100
          ? 'Eligible for service rewards'
          : `${100 - rewardPoints} points needed`
    };
  }

  /**
   * Record STEM impact for an Archangel
   * @param {string} archangelName - Archangel name
   * @param {number} impactScore - Impact score to add
   * @returns {Object} Updated impact data
   */
  recordSTEMImpact(archangelName, impactScore) {
    const currentImpact = this.stemImpactTracker.get(archangelName) || 0;
    const newImpact = currentImpact + impactScore;
    this.stemImpactTracker.set(archangelName, newImpact);

    // Award service reward points (1 point per 10 impact)
    const rewardPoints = Math.floor(impactScore / 10);
    const currentRewards = this.serviceRewards.get(archangelName) || 0;
    this.serviceRewards.set(archangelName, currentRewards + rewardPoints);

    this._emitTawhidDeclaration(
      'STEM impact recorded - All success is by permission of the One Creator'
    );

    return {
      archangel: archangelName,
      previousImpact: currentImpact,
      newImpact,
      impactAdded: impactScore,
      rewardPointsAwarded: rewardPoints,
      totalRewardPoints: currentRewards + rewardPoints
    };
  }

  /**
   * Generate $ANGEL emission schedule using N-GI personas
   * @param {number} totalAmount - Total amount to emit
   * @param {number} durationDays - Duration in days
   * @returns {Object} Combined emission schedule
   */
  generateAngelEmissionSchedule(totalAmount, durationDays = 365) {
    // Get Banneker schedule (stellar alignment based)
    const bannekerSchedule =
      this.ngiPersonas.banneker.generateEmissionSchedule(
        totalAmount * 0.3,
        durationDays
      ); // 30%

    // Get Johnson trajectory (orbital mechanics based)
    const johnsonTrajectory =
      this.ngiPersonas.johnson.calculateEmissionTrajectory({
        startAmount: 0,
        targetAmount: totalAmount * 0.3, // 30%
        timeframe: durationDays,
        growthPattern: 'orbital'
      });

    return {
      totalAmount,
      durationDays,
      schedules: {
        banneker: {
          allocation: totalAmount * 0.3,
          schedule: bannekerSchedule,
          method: 'Stellar alignment and lunar cycles'
        },
        johnson: {
          allocation: totalAmount * 0.3,
          trajectory: johnsonTrajectory.trajectory,
          method: 'Orbital mechanics and trajectory calculations'
        },
        community: {
          allocation: totalAmount * 0.4, // 40% for community
          distribution: 'Service reward based'
        }
      },
      tawhidReminder:
        'All emissions proceed by divine decree - Remember the One Creator',
      ngiTribute:
        'Honoring the legacy of Benjamin Banneker and Katherine Johnson'
    };
  }

  /**
   * Get unified report combining all personas
   * @returns {Object} Unified report
   */
  async getUnifiedReport() {
    const bannekerAlmanac = this.ngiPersonas.banneker.generateAlmanac();
    const johnsonMission = this.ngiPersonas.johnson.generateMissionReport();

    return {
      title: 'Archangel Genesis Unified Report',
      subtitle: '$ANGEL Currency & NFT Ecosystem Status',
      timestamp: new Date().toISOString(),
      tawhidDeclaration:
        'All glory to Allah alone - This report honors divine servants',

      archangel_personas: {
        michael: this.archangelPersonas.get('michael'),
        raphael: this.archangelPersonas.get('raphael'),
        gabriel: this.archangelPersonas.get('gabriel')
      },

      ngi_personas: {
        banneker: {
          info: this.ngiPersonas.banneker.getPersonaInfo(),
          almanac: bannekerAlmanac
        },
        johnson: {
          info: this.ngiPersonas.johnson.getPersonaInfo(),
          mission: johnsonMission
        }
      },

      stem_impact: {
        michael: this.stemImpactTracker.get('michael') || 0,
        raphael: this.stemImpactTracker.get('raphael') || 0,
        gabriel: this.stemImpactTracker.get('gabriel') || 0
      },

      service_rewards: {
        michael: this.serviceRewards.get('michael') || 0,
        raphael: this.serviceRewards.get('raphael') || 0,
        gabriel: this.serviceRewards.get('gabriel') || 0
      },

      legacy_tribute:
        'Honoring Black mathematical titans: Benjamin Banneker (1731-1806) and Katherine Johnson (1918-2020)'
    };
  }

  /**
   * Get persona information
   * @param {string} name - Persona name (archangel or ngi)
   * @returns {Object} Persona details
   */
  getPersonaInfo(name) {
    const lowerName = name.toLowerCase();

    // Check Archangel personas
    if (this.archangelPersonas.has(lowerName)) {
      return this.archangelPersonas.get(lowerName);
    }

    // Check N-GI personas
    if (this.ngiPersonas[lowerName]) {
      return this.ngiPersonas[lowerName].getPersonaInfo();
    }

    throw new Error(`Persona "${name}" not found`);
  }
}

module.exports = ArchangelPersonaEngine;
