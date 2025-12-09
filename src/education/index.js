/**
 * 🎓 Educational AR-Tales System - Main Orchestrator
 * Integrating genius pantheon AR tales with economic sovereignty
 * Operating at 528Hz Divine Frequency
 * 
 * @author Chais the Great (Al-Miftah)
 * @version 1.0.0
 */

const ARTalesEngine = require('./ar-tales-engine');
const ImmersiveLessonSystem = require('./immersive-lesson-system');
const ChildInvestmentGateway = require('./child-investment-gateway');

/**
 * Educational System Orchestrator
 * Coordinates AR tales, immersive lessons, and economic simulations
 */
class EducationalSystem {
  constructor(config = {}) {
    this.config = {
      frequency: 528,
      enableAudio: true,
      enableAR: true,
      baseAPY: 0.05,
      ...config
    };

    this.initialized = false;
    this.arTalesEngine = new ARTalesEngine({ frequency: this.config.frequency });
    this.lessonSystem = new ImmersiveLessonSystem({ 
      frequency: this.config.frequency,
      enableAudio: this.config.enableAudio
    });
    this.investmentGateway = new ChildInvestmentGateway({ 
      frequency: this.config.frequency,
      baseAPY: this.config.baseAPY
    });
  }

  /**
   * Initialize the entire educational system
   */
  async initialize() {
    // Initialize all subsystems
    const arTalesInit = await this.arTalesEngine.initialize();
    const lessonInit = await this.lessonSystem.initialize();
    const investmentInit = await this.investmentGateway.initialize();

    this.initialized = true;

    return {
      status: 'initialized',
      frequency: this.config.frequency,
      subsystems: {
        arTales: arTalesInit,
        lessons: lessonInit,
        investment: investmentInit
      },
      timestamp: Date.now()
    };
  }

  /**
   * Start a complete educational experience
   * Combines AR tale, immersive lesson, and economic simulation
   * @param {string} moduleId - Educational module identifier
   * @param {string} childId - Child/student identifier
   * @param {Object} options - Experience options
   */
  async startEducationalExperience(moduleId, childId, options = {}) {
    if (!this.initialized) {
      throw new Error('Educational System must be initialized first');
    }

    // Launch AR tale
    const arTale = await this.arTalesEngine.launchARTale(moduleId, options);
    
    // Get module details
    const module = this.arTalesEngine.getModule(moduleId);
    
    // Create or retrieve investment account
    let accountId = options.accountId;
    if (!accountId) {
      const account = this.investmentGateway.createAccount(childId, {
        name: options.childName || 'Student',
        age: options.childAge || 10,
        initialBalance: options.initialBalance || 100
      });
      accountId = account.accountId;
    }

    // Start first lesson
    let firstLessonStarted = null;
    if (module.lessons && module.lessons.length > 0) {
      const firstLesson = module.lessons[0];
      firstLessonStarted = await this.lessonSystem.startLesson(
        firstLesson.id,
        firstLesson
      );
    }

    return {
      experienceId: `exp_${Date.now()}`,
      moduleId,
      childId,
      accountId,
      arTale,
      currentLesson: firstLessonStarted,
      status: 'active',
      message: `Educational experience started for module "${module.title}"`
    };
  }

  /**
   * Complete a lesson and award sovereignty points
   * @param {string} taleId - AR tale identifier
   * @param {string} lessonId - Lesson identifier
   * @param {string} accountId - Investment account ID
   * @param {Object} lessonResults - Results from the lesson
   */
  async completeLesson(taleId, lessonId, accountId, lessonResults = {}) {
    // Complete the lesson in the lesson system
    const lessonCompletion = this.lessonSystem.completeLesson(lessonId);

    // Complete the lesson in the AR tale
    const taleCompletion = this.arTalesEngine.completeLesson(
      taleId,
      lessonId,
      lessonCompletion.sovereigntyScore
    );

    // Map lesson to sovereignty exercise
    const exerciseId = this._mapLessonToExercise(lessonId);
    
    // Complete sovereignty exercise if applicable
    let sovereigntyCompletion = null;
    if (exerciseId) {
      sovereigntyCompletion = this.investmentGateway.completeSovereigntyExercise(
        accountId,
        exerciseId,
        {
          lessonResults,
          sovereigntyScore: lessonCompletion.sovereigntyScore,
          engagementScore: lessonCompletion.engagementScore
        }
      );
    }

    return {
      taleId,
      lessonId,
      accountId,
      lessonCompletion,
      taleCompletion,
      sovereigntyCompletion,
      message: 'Lesson completed successfully'
    };
  }

  /**
   * Map lesson to corresponding sovereignty exercise
   * @private
   */
  _mapLessonToExercise(lessonId) {
    const lessonToExerciseMap = {
      // Katherine Johnson's lessons
      'orbital_mechanics': 'investment_decisions',
      'celestial_navigation': 'wealth_building',
      'space_geometry': 'wealth_building',
      
      // Benjamin Banneker's lessons
      'astronomical_observations': 'budget_planning',
      'mathematical_patterns': 'investment_decisions',
      'almanac_creation': 'wealth_building',
      
      // Paul Cuffee's lessons
      'maritime_trade': 'investment_decisions',
      'community_building': 'community_development',
      'economic_sovereignty': 'wealth_building'
    };

    return lessonToExerciseMap[lessonId] || null;
  }

  /**
   * Run economic simulation for a student
   * @param {string} accountId - Investment account ID
   * @param {string} simulationType - Type of simulation
   * @param {Object} params - Simulation parameters
   */
  async runEconomicSimulation(accountId, simulationType, params = {}) {
    return await this.investmentGateway.runSimulation(accountId, simulationType, params);
  }

  /**
   * Get student progress across all systems
   * @param {string} childId - Child/student identifier
   */
  getStudentProgress(childId) {
    // Find student's investment account
    const accounts = Array.from(this.investmentGateway.investmentAccounts.values())
      .filter(acc => acc.childId === childId);

    const account = accounts[0]; // Assuming one account per child

    if (!account) {
      return {
        childId,
        hasAccount: false,
        message: 'No investment account found'
      };
    }

    // Get account projection
    const projection = this.investmentGateway.getAccountProjection(account.id, 10);

    return {
      childId,
      accountId: account.id,
      sovereigntyPoints: account.sovereigntyPoints,
      sovereigntyMultiplier: account.sovereigntyMultiplier,
      currentAPY: account.apy,
      currentBalance: account.balance,
      completedExercises: account.completedExercises.length,
      investmentHistory: account.investmentHistory.length,
      tenYearProjection: projection
    };
  }

  /**
   * Get all geniuses in the pantheon
   */
  getGeniusPantheon() {
    return this.arTalesEngine.getAllGeniuses();
  }

  /**
   * Get all educational modules
   */
  getEducationalModules() {
    return this.arTalesEngine.getAllModules();
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      frequency: this.config.frequency,
      subsystems: {
        arTales: this.arTalesEngine.getStatus(),
        lessons: this.lessonSystem.getStatus(),
        investment: this.investmentGateway.getStatus()
      }
    };
  }
}

module.exports = EducationalSystem;
