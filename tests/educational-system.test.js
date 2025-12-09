/**
 * Tests for Educational AR-Tales System
 * Testing genius pantheon AR tales with economic sovereignty integration
 */

const EducationalSystem = require('../src/education/index');
const ARTalesEngine = require('../src/education/ar-tales-engine');
const ImmersiveLessonSystem = require('../src/education/immersive-lesson-system');
const ChildInvestmentGateway = require('../src/education/child-investment-gateway');

describe('Educational AR-Tales System', () => {
  let educationalSystem;

  beforeEach(async () => {
    educationalSystem = new EducationalSystem({
      frequency: 528,
      enableAudio: true,
      enableAR: true,
      baseAPY: 0.05
    });
    await educationalSystem.initialize();
  });

  describe('System Initialization', () => {
    test('should initialize all subsystems', async () => {
      const status = educationalSystem.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.frequency).toBe(528);
      expect(status.subsystems.arTales.initialized).toBe(true);
      expect(status.subsystems.lessons.initialized).toBe(true);
      expect(status.subsystems.investment.initialized).toBe(true);
    });

    test('should have correct frequency configuration', () => {
      const status = educationalSystem.getStatus();
      
      expect(status.frequency).toBe(528);
      expect(status.subsystems.arTales.frequency).toBe(528);
      expect(status.subsystems.lessons.frequency).toBe(528);
      expect(status.subsystems.investment.frequency).toBe(528);
    });
  });

  describe('AR-Tales Engine', () => {
    let arTalesEngine;

    beforeEach(async () => {
      arTalesEngine = new ARTalesEngine({ frequency: 528 });
      await arTalesEngine.initialize();
    });

    test('should initialize with genius pantheon', async () => {
      const status = arTalesEngine.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.geniusCount).toBe(3);
      expect(status.moduleCount).toBe(3);
      expect(status.geniuses).toContain('katherine_johnson');
      expect(status.geniuses).toContain('benjamin_banneker');
      expect(status.geniuses).toContain('paul_cuffee');
    });

    test('should retrieve Katherine Johnson details', () => {
      const katherine = arTalesEngine.getGenius('katherine_johnson');
      
      expect(katherine).toBeDefined();
      expect(katherine.name).toBe('Katherine Johnson');
      expect(katherine.title).toBe('Celestial Navigator & Mathematical Pioneer');
      expect(katherine.field).toBe('Mathematics & Aerospace');
      expect(katherine.frequency).toBe(963); // Divine Connection
      expect(katherine.arTaleType).toBe('celestial_mosaics');
      expect(katherine.sovereignty).toBe('mathematical_sovereignty');
    });

    test('should retrieve Benjamin Banneker details', () => {
      const banneker = arTalesEngine.getGenius('benjamin_banneker');
      
      expect(banneker).toBeDefined();
      expect(banneker.name).toBe('Benjamin Banneker');
      expect(banneker.title).toBe('Astronomer, Mathematician & Almanac Author');
      expect(banneker.field).toBe('Astronomy & Mathematics');
      expect(banneker.frequency).toBe(741); // Awakening Intuition
      expect(banneker.arTaleType).toBe('almanac_ar_tales');
    });

    test('should retrieve Paul Cuffee details', () => {
      const cuffee = arTalesEngine.getGenius('paul_cuffee');
      
      expect(cuffee).toBeDefined();
      expect(cuffee.name).toBe('Paul Cuffee');
      expect(cuffee.title).toBe('Maritime Entrepreneur & Community Builder');
      expect(cuffee.field).toBe('Economics & Maritime Trade');
      expect(cuffee.frequency).toBe(639); // Connection
      expect(cuffee.sovereignty).toBe('economic_sovereignty');
    });

    test('should retrieve celestial mosaics module', () => {
      const module = arTalesEngine.getModule('celestial_mosaics');
      
      expect(module).toBeDefined();
      expect(module.geniusId).toBe('katherine_johnson');
      expect(module.title).toBe('Celestial Mosaics: Mathematics of the Stars');
      expect(module.type).toBe('interactive_visualization');
      expect(module.lessons).toHaveLength(3);
      expect(module.frequency).toBe(963);
    });

    test('should retrieve almanac AR tales module', () => {
      const module = arTalesEngine.getModule('almanac_ar_tales');
      
      expect(module).toBeDefined();
      expect(module.geniusId).toBe('benjamin_banneker');
      expect(module.title).toBe("Banneker's Almanac: Wisdom Through Time");
      expect(module.type).toBe('ar_storytelling');
      expect(module.lessons).toHaveLength(3);
    });

    test('should retrieve sovereignty chronicles module', () => {
      const module = arTalesEngine.getModule('sovereignty_chronicles');
      
      expect(module).toBeDefined();
      expect(module.geniusId).toBe('paul_cuffee');
      expect(module.title).toBe('Cuffee Land: Economics & Community Sovereignty');
      expect(module.type).toBe('economic_simulation');
      expect(module.lessons).toHaveLength(3);
    });

    test('should launch AR tale successfully', async () => {
      const result = await arTalesEngine.launchARTale('celestial_mosaics');
      
      expect(result.taleId).toBeDefined();
      expect(result.title).toBe('Celestial Mosaics: Mathematics of the Stars');
      expect(result.genius).toBe('Katherine Johnson');
      expect(result.lessons).toBe(3);
      expect(result.frequency).toBe(963);
    });

    test('should complete lesson and award sovereignty points', async () => {
      const tale = await arTalesEngine.launchARTale('almanac_ar_tales');
      const result = arTalesEngine.completeLesson(
        tale.taleId,
        'astronomical_observations',
        50
      );
      
      expect(result.lessonId).toBe('astronomical_observations');
      expect(result.sovereigntyPointsEarned).toBe(50);
      expect(result.progress.lessonsCompleted).toBe(1);
      expect(result.progress.sovereigntyPointsEarned).toBe(50);
    });
  });

  describe('Immersive Lesson System', () => {
    let lessonSystem;

    beforeEach(async () => {
      lessonSystem = new ImmersiveLessonSystem({ frequency: 528 });
      await lessonSystem.initialize();
    });

    test('should initialize with visualization modules', () => {
      const status = lessonSystem.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.renderEngine).toBe('canvas');
      expect(status.visualizationModules).toBeGreaterThanOrEqual(9);
      expect(status.modules).toContain('trajectory_plotter');
      expect(status.modules).toContain('eclipse_predictor');
      expect(status.modules).toContain('trade_simulator');
    });

    test('should start a lesson with visualizations', async () => {
      const lessonConfig = {
        id: 'orbital_mechanics',
        frequency: 963,
        interactiveElements: ['trajectory_plotter', 'gravity_simulator'],
        duration: 30000
      };

      const result = await lessonSystem.startLesson('orbital_mechanics', lessonConfig);
      
      expect(result.lessonId).toBe('orbital_mechanics');
      expect(result.status).toBe('started');
      expect(result.frequency).toBe(963);
      expect(result.visualizations).toBe(2);
    });

    test('should render visualization frames', async () => {
      const lessonConfig = {
        id: 'celestial_nav',
        frequency: 963,
        interactiveElements: ['star_chart'],
        duration: 20000
      };

      await lessonSystem.startLesson('celestial_nav', lessonConfig);
      const frame = lessonSystem.renderFrame('celestial_nav', 'star_chart', {
        starCount: 100,
        constellation: 'orion'
      });
      
      expect(frame.lessonId).toBe('celestial_nav');
      expect(frame.elementId).toBe('star_chart');
      expect(frame.frameNumber).toBe(1);
      expect(frame.renderData.starCount).toBe(100);
      expect(frame.renderData.frequency).toBe(963);
    });

    test('should handle user interactions', async () => {
      const lessonConfig = {
        id: 'trade_lesson',
        frequency: 639,
        interactiveElements: ['trade_simulator'],
        duration: 25000
      };

      await lessonSystem.startLesson('trade_lesson', lessonConfig);
      const interaction = lessonSystem.handleInteraction(
        'trade_lesson',
        'trade_simulator',
        'strategy_selection',
        { accuracy: 0.8, creativity: 0.9 }
      );
      
      expect(interaction.lessonId).toBe('trade_lesson');
      expect(interaction.interactionType).toBe('strategy_selection');
      expect(interaction.sovereigntyPointsEarned).toBeGreaterThan(20);
      expect(interaction.totalInteractions).toBe(1);
    });

    test('should complete lesson with metrics', async () => {
      const lessonConfig = {
        id: 'test_lesson',
        frequency: 528,
        interactiveElements: ['trajectory_plotter'],
        duration: 15000
      };

      await lessonSystem.startLesson('test_lesson', lessonConfig);
      
      // Add small delay to ensure timing is captured
      await new Promise(resolve => setTimeout(resolve, 10));
      
      lessonSystem.renderFrame('test_lesson', 'trajectory_plotter');
      lessonSystem.handleInteraction('test_lesson', 'trajectory_plotter', 'click_and_drag', {});
      
      const completion = lessonSystem.completeLesson('test_lesson');
      
      expect(completion.status).toBe('completed');
      expect(completion.duration).toBeGreaterThanOrEqual(0);
      expect(completion.totalInteractions).toBeGreaterThanOrEqual(1);
      expect(completion.sovereigntyScore).toBeGreaterThan(0);
    });
  });

  describe('Child Investment Gateway', () => {
    let gateway;

    beforeEach(async () => {
      gateway = new ChildInvestmentGateway({ frequency: 528, baseAPY: 0.05 });
      await gateway.initialize();
    });

    test('should initialize with economic simulations', () => {
      const status = gateway.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.baseAPY).toBe(0.05);
      expect(status.simulationTypes).toBe(4);
      expect(status.exerciseTypes).toBe(4);
      expect(status.simulations).toContain('simple_savings');
      expect(status.simulations).toContain('maritime_trade');
    });

    test('should create child investment account', () => {
      const result = gateway.createAccount('child_001', {
        name: 'Young Scholar',
        age: 12,
        initialBalance: 500
      });
      
      expect(result.accountId).toBeDefined();
      expect(result.childId).toBe('child_001');
      expect(result.initialBalance).toBe(500);
      expect(result.apy).toBe(0.05);
    });

    test('should calculate compound growth correctly', () => {
      const growth = gateway.calculateCompoundGrowth(1000, 0.05, 10, 100);
      
      expect(growth.projections).toHaveLength(11); // 0-10 years
      expect(growth.finalBalance).toBeGreaterThan(1000);
      expect(growth.totalInterest).toBeGreaterThan(0);
      expect(growth.apy).toBe(0.05);
    });

    test('should run simple savings simulation', async () => {
      const account = gateway.createAccount('child_002', {
        name: 'Saver',
        age: 10,
        initialBalance: 1000
      });

      const simulation = await gateway.runSimulation(
        account.accountId,
        'simple_savings',
        {
          principal: 1000,
          years: 10,
          annualContribution: 100
        }
      );
      
      expect(simulation.simulationType).toBe('simple_savings');
      expect(simulation.results.finalBalance).toBeGreaterThan(1000);
      expect(simulation.results.projections).toBeDefined();
    });

    test('should run maritime trade simulation', async () => {
      const account = gateway.createAccount('child_003', {
        name: 'Trader',
        age: 14,
        initialBalance: 2000
      });

      const simulation = await gateway.runSimulation(
        account.accountId,
        'maritime_trade',
        {
          tradeInvestment: 5000,
          profitMargin: 0.15,
          annualTrips: 12,
          years: 5
        }
      );
      
      expect(simulation.results.annualProfit).toBeGreaterThan(0);
      expect(simulation.results.totalProfit).toBeGreaterThan(0);
      expect(simulation.results.roi).toBeGreaterThan(0);
    });

    test('should complete sovereignty exercise and increase APY', () => {
      const account = gateway.createAccount('child_004', {
        name: 'Sovereign Student',
        age: 13,
        initialBalance: 1000
      });

      const result = gateway.completeSovereigntyExercise(
        account.accountId,
        'budget_planning',
        { score: 95 }
      );
      
      expect(result.pointsEarned).toBe(100);
      expect(result.totalSovereigntyPoints).toBe(100);
      expect(result.sovereigntyMultiplier).toBe(1.05); // 1.0 + (100/100)*0.05
      expect(result.newAPY).toBeGreaterThan(0.05);
    });

    test('should accumulate sovereignty points across multiple exercises', () => {
      const account = gateway.createAccount('child_005', {
        name: 'Advanced Student',
        age: 15,
        initialBalance: 2000
      });

      // Complete first exercise
      gateway.completeSovereigntyExercise(account.accountId, 'budget_planning');
      
      // Complete second exercise
      const result = gateway.completeSovereigntyExercise(
        account.accountId,
        'investment_decisions'
      );
      
      expect(result.totalSovereigntyPoints).toBe(250); // 100 + 150
      expect(result.sovereigntyMultiplier).toBeGreaterThan(1.05);
    });
  });

  describe('Integrated Educational Experience', () => {
    test('should start complete educational experience', async () => {
      const experience = await educationalSystem.startEducationalExperience(
        'celestial_mosaics',
        'student_001',
        {
          childName: 'Future Astronaut',
          childAge: 11,
          initialBalance: 1000
        }
      );
      
      expect(experience.experienceId).toBeDefined();
      expect(experience.moduleId).toBe('celestial_mosaics');
      expect(experience.childId).toBe('student_001');
      expect(experience.accountId).toBeDefined();
      expect(experience.arTale.taleId).toBeDefined();
      expect(experience.currentLesson).toBeDefined();
      expect(experience.status).toBe('active');
    });

    test('should complete lesson with all systems integrated', async () => {
      const experience = await educationalSystem.startEducationalExperience(
        'almanac_ar_tales',
        'student_002',
        {
          childName: 'Young Astronomer',
          childAge: 12,
          initialBalance: 500
        }
      );

      const completion = await educationalSystem.completeLesson(
        experience.arTale.taleId,
        'astronomical_observations',
        experience.accountId,
        { score: 90 }
      );
      
      expect(completion.taleId).toBe(experience.arTale.taleId);
      expect(completion.lessonId).toBe('astronomical_observations');
      expect(completion.lessonCompletion).toBeDefined();
      expect(completion.taleCompletion).toBeDefined();
      expect(completion.sovereigntyCompletion).toBeDefined();
      expect(completion.sovereigntyCompletion.newAPY).toBeGreaterThan(0.05);
    });

    test('should track student progress', async () => {
      const experience = await educationalSystem.startEducationalExperience(
        'sovereignty_chronicles',
        'student_003',
        {
          childName: 'Young Entrepreneur',
          childAge: 13,
          initialBalance: 1500
        }
      );

      const progress = educationalSystem.getStudentProgress('student_003');
      
      expect(progress.childId).toBe('student_003');
      expect(progress.hasAccount).not.toBe(false);
      expect(progress.accountId).toBe(experience.accountId);
      expect(progress.currentAPY).toBe(0.05);
      expect(progress.currentBalance).toBe(1500);
      expect(progress.tenYearProjection).toBeDefined();
    });

    test('should run economic simulation for student', async () => {
      const experience = await educationalSystem.startEducationalExperience(
        'sovereignty_chronicles',
        'student_004',
        {
          childName: 'Community Builder',
          childAge: 14,
          initialBalance: 2000
        }
      );

      const simulation = await educationalSystem.runEconomicSimulation(
        experience.accountId,
        'community_pool',
        {
          contribution: 500,
          members: 20,
          years: 10
        }
      );
      
      expect(simulation.simulationType).toBe('community_pool');
      expect(simulation.results).toBeDefined();
      expect(simulation.results.individualFinalValue).toBeGreaterThan(500);
    });
  });

  describe('Genius Pantheon', () => {
    test('should retrieve all geniuses', () => {
      const geniuses = educationalSystem.getGeniusPantheon();
      
      expect(geniuses).toHaveLength(3);
      expect(geniuses.map(g => g.name)).toContain('Katherine Johnson');
      expect(geniuses.map(g => g.name)).toContain('Benjamin Banneker');
      expect(geniuses.map(g => g.name)).toContain('Paul Cuffee');
    });

    test('should retrieve all educational modules', () => {
      const modules = educationalSystem.getEducationalModules();
      
      expect(modules).toHaveLength(3);
      expect(modules.map(m => m.title)).toContain('Celestial Mosaics: Mathematics of the Stars');
      expect(modules.map(m => m.title)).toContain("Banneker's Almanac: Wisdom Through Time");
      expect(modules.map(m => m.title)).toContain('Cuffee Land: Economics & Community Sovereignty');
    });
  });
});
