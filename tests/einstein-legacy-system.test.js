/**
 * Tests for Einstein Legacy System
 * Testing Einstein NFTs, AI Companion, and Knowledge Quest
 */

const ARTalesEngine = require('../src/education/ar-tales-engine');
const EinsteinAICompanion = require('../src/education/einstein-ai-companion');
const EinsteinKnowledgeQuest = require('../src/education/einstein-knowledge-quest');

describe('Einstein Legacy System', () => {
  describe('AR-Tales Engine - Einstein Integration', () => {
    let arTalesEngine;

    beforeEach(async () => {
      arTalesEngine = new ARTalesEngine({ frequency: 528 });
      await arTalesEngine.initialize();
    });

    test('should include Einstein in genius pantheon', () => {
      const einstein = arTalesEngine.getGenius('albert_einstein');
      
      expect(einstein).toBeDefined();
      expect(einstein.name).toBe('Albert Einstein');
      expect(einstein.title).toBe('Theoretical Physicist & Humanitarian Visionary');
      expect(einstein.field).toBe('Theoretical Physics & Philosophy');
      expect(einstein.frequency).toBe(528);
      expect(einstein.arTaleType).toBe('einstein_legacy');
      expect(einstein.sovereignty).toBe('knowledge_sovereignty');
      expect(einstein.culturalImpact).toBe('universal');
    });

    test('should have Einstein\'s achievements', () => {
      const einstein = arTalesEngine.getGenius('albert_einstein');
      
      expect(einstein.achievements).toContain('Developed theory of relativity (E=mc²)');
      expect(einstein.achievements).toContain('Explained photoelectric effect (Nobel Prize)');
      expect(einstein.achievements).toContain('Advocate for peace, civil rights, and education');
    });

    test('should have Einstein legacy module', () => {
      const module = arTalesEngine.getModule('einstein_legacy');
      
      expect(module).toBeDefined();
      expect(module.title).toBe('Einstein\'s Legacy: Sentient Digital Wisdom');
      expect(module.type).toBe('interactive_ai_companion');
      expect(module.geniusId).toBe('albert_einstein');
      expect(module.frequency).toBe(528);
      expect(module.lessons).toHaveLength(4);
    });

    test('should have correct Einstein lessons', () => {
      const module = arTalesEngine.getModule('einstein_legacy');
      const lessonIds = module.lessons.map(l => l.id);
      
      expect(lessonIds).toContain('relativity_fundamentals');
      expect(lessonIds).toContain('curiosity_cultivation');
      expect(lessonIds).toContain('creative_problem_solving');
      expect(lessonIds).toContain('human_wisdom');
    });

    test('should launch Einstein AR tale', async () => {
      const tale = await arTalesEngine.launchARTale('einstein_legacy');
      
      expect(tale.taleId).toBeDefined();
      expect(tale.title).toBe('Einstein\'s Legacy: Sentient Digital Wisdom');
      expect(tale.genius).toBe('Albert Einstein');
      expect(tale.frequency).toBe(528);
      expect(tale.message).toContain('launched');
    });
  });

  describe('Einstein AI Companion', () => {
    let companion;

    beforeEach(async () => {
      companion = new EinsteinAICompanion({ frequency: 528 });
      await companion.initialize();
    });

    test('should initialize correctly', async () => {
      const status = companion.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.frequency).toBe(528);
      expect(status.personality).toBe('curious_genius');
      expect(status.teachingStyle).toBe('socratic');
      expect(status.philosophyPrinciples).toBe(6);
      expect(status.knowledgeDomains).toBe(10);
    });

    test('should have core philosophy principles', () => {
      expect(companion.getWisdom('curiosity')).toContain('not to stop questioning');
      expect(companion.getWisdom('imagination')).toContain('more important than knowledge');
      expect(companion.getWisdom('simplicity')).toContain('as simple as possible');
      expect(companion.getWisdom('persistence')).toContain('stay with problems longer');
      expect(companion.getWisdom('humanity')).toContain('Peace cannot be kept by force');
    });

    test('should start an interactive session', () => {
      const session = companion.startSession('user_001', {
        topic: 'relativity',
        knowledgeLevel: 'beginner'
      });
      
      expect(session.session.sessionId).toBeDefined();
      expect(session.session.userId).toBe('user_001');
      expect(session.session.topic).toBe('relativity');
      expect(session.welcomeMessage).toBeDefined();
      expect(session.suggestedTopics).toBeDefined();
      expect(session.einsteinQuote).toBeDefined();
    });

    test('should interact with user input', () => {
      const session = companion.startSession('user_001');
      const response = companion.interact(session.session.sessionId, 'Tell me about relativity');
      
      expect(response.sessionId).toBeDefined();
      expect(response.userInput).toBe('Tell me about relativity');
      expect(response.einsteinResponse).toBeDefined();
      expect(response.thoughtExperiment).toBeDefined();
      expect(response.relatedConcepts).toBeDefined();
      expect(response.followUpQuestions).toBeDefined();
    });

    test('should generate quiz on relativity', () => {
      const quiz = companion.generateQuiz('relativity', 'easy');
      
      expect(quiz.topic).toBe('relativity');
      expect(quiz.difficulty).toBe('easy');
      expect(quiz.questions).toBeDefined();
      expect(quiz.questions.length).toBeGreaterThan(0);
      expect(quiz.questions[0].question).toBeDefined();
      expect(quiz.questions[0].options).toHaveLength(4);
      expect(quiz.questions[0].explanation).toBeDefined();
    });

    test('should create thought experiment', () => {
      const experiment = companion.createThoughtExperiment('relativity');
      
      expect(experiment.title).toBe('The Train and Lightning');
      expect(experiment.scenario).toBeDefined();
      expect(experiment.question).toBeDefined();
      expect(experiment.answer).toBeDefined();
      expect(experiment.insight).toBeDefined();
    });

    test('should provide lesson on topic', () => {
      const lesson = companion.provideLesson('relativity', 'beginner');
      
      expect(lesson.topic).toBe('relativity');
      expect(lesson.level).toBe('beginner');
      expect(lesson.lesson.title).toBe('Introduction to Relativity');
      expect(lesson.lesson.keyPoints).toHaveLength(4);
      expect(lesson.lesson.practicalExample).toBeDefined();
      expect(lesson.einsteinQuote).toBeDefined();
    });

    test('should generate quiz on curiosity', () => {
      const quiz = companion.generateQuiz('curiosity', 'easy');
      
      expect(quiz.topic).toBe('curiosity');
      expect(quiz.questions[0].question).toContain('Einstein');
      expect(quiz.questions[0].options).toContain('Imagination');
    });

    test('should handle multiple interaction types', () => {
      const session1 = companion.startSession('user_001', { interactionType: 'quiz' });
      const session2 = companion.startSession('user_002', { interactionType: 'audiovisual' });
      const session3 = companion.startSession('user_003', { interactionType: 'knowledge_loop' });
      
      expect(session1.session.interactionType).toBe('quiz');
      expect(session2.session.interactionType).toBe('audiovisual');
      expect(session3.session.interactionType).toBe('knowledge_loop');
    });
  });

  describe('Einstein Knowledge Quest System', () => {
    let questSystem;

    beforeEach(async () => {
      questSystem = new EinsteinKnowledgeQuest({ frequency: 528 });
      await questSystem.initialize();
    });

    test('should initialize correctly', () => {
      const status = questSystem.getStatus();
      
      expect(status.initialized).toBe(true);
      expect(status.frequency).toBe(528);
      expect(status.totalQuests).toBeGreaterThan(0);
      expect(status.totalMilestones).toBe(6);
      expect(status.totalAchievements).toBeGreaterThan(0);
      expect(status.questCategories).toBe(5);
    });

    test('should have quest categories', () => {
      expect(questSystem.questCategories.RELATIVITY).toBe('relativity');
      expect(questSystem.questCategories.CURIOSITY).toBe('curiosity');
      expect(questSystem.questCategories.PROBLEM_SOLVING).toBe('problem_solving');
      expect(questSystem.questCategories.HUMAN_CONNECTIONS).toBe('human_connections');
      expect(questSystem.questCategories.IMAGINATION).toBe('imagination');
    });

    test('should retrieve specific quest', () => {
      const quest = questSystem.getQuest('relativity_1');
      
      expect(quest).toBeDefined();
      expect(quest.questId).toBe('relativity_1');
      expect(quest.title).toBe('Understanding Time Dilation');
      expect(quest.category).toBe('relativity');
      expect(quest.difficulty).toBe('beginner');
      expect(quest.tasks).toHaveLength(4);
      expect(quest.rewards.points).toBe(50);
      expect(quest.rewards.einsteinCoins).toBe(10);
    });

    test('should get quests by category', () => {
      const relativityQuests = questSystem.getQuestsByCategory('relativity');
      
      expect(relativityQuests.length).toBeGreaterThan(0);
      expect(relativityQuests[0].category).toBe('relativity');
    });

    test('should start a quest for user', () => {
      const result = questSystem.startQuest('user_001', 'curiosity_1');
      
      expect(result.status).toBe('started');
      expect(result.quest.questId).toBe('curiosity_1');
      expect(result.questProgress.questId).toBe('curiosity_1');
      expect(result.questProgress.startedAt).toBeDefined();
      expect(result.einsteinWisdom).toBeDefined();
    });

    test('should prevent starting same quest twice', () => {
      questSystem.startQuest('user_001', 'curiosity_1');
      const result = questSystem.startQuest('user_001', 'curiosity_1');
      
      expect(result.status).toBe('in_progress');
    });

    test('should complete quest task', () => {
      questSystem.startQuest('user_001', 'relativity_1');
      const result = questSystem.completeTask('user_001', 'relativity_1', 0);
      
      expect(result.status).toBe('task_completed');
      expect(result.progress).toBe(25); // 1 of 4 tasks = 25%
      expect(result.tasksRemaining).toBe(3);
    });

    test('should complete entire quest', () => {
      questSystem.startQuest('user_001', 'relativity_1');
      questSystem.completeTask('user_001', 'relativity_1', 0);
      questSystem.completeTask('user_001', 'relativity_1', 1);
      questSystem.completeTask('user_001', 'relativity_1', 2);
      const result = questSystem.completeTask('user_001', 'relativity_1', 3);
      
      expect(result.status).toBe('quest_completed');
      expect(result.rewards.points).toBe(50);
      expect(result.rewards.einsteinCoins).toBe(10);
      expect(result.rewards.badge).toBe('Time Traveler');
    });

    test('should award milestone on first quest completion', () => {
      questSystem.startQuest('user_001', 'curiosity_1');
      questSystem.completeTask('user_001', 'curiosity_1', 0);
      questSystem.completeTask('user_001', 'curiosity_1', 1);
      questSystem.completeTask('user_001', 'curiosity_1', 2);
      const result = questSystem.completeTask('user_001', 'curiosity_1', 3);
      
      expect(result.newMilestones.length).toBeGreaterThan(0);
      expect(result.newMilestones[0].id).toBe('first_quest');
    });

    test('should record knowledge sharing', () => {
      const result = questSystem.recordKnowledgeSharing('teacher_001', 'learner_001', 'relativity');
      
      expect(result.status).toBe('knowledge_shared');
      expect(result.teacher).toBe('teacher_001');
      expect(result.learner).toBe('learner_001');
      expect(result.topic).toBe('relativity');
      expect(result.bonusPoints).toBeGreaterThan(0);
      expect(result.einsteinWisdom).toBeDefined();
    });

    test('should award teaching achievement', () => {
      // Share knowledge 5 times to get achievement
      for (let i = 0; i < 5; i++) {
        questSystem.recordKnowledgeSharing('teacher_001', `learner_${i}`, 'relativity');
      }
      
      const userProgress = questSystem.getUserProgress('teacher_001');
      expect(userProgress.knowledgeSharedCount).toBe(5);
      expect(userProgress.achievements).toContain('knowledge_sharer');
    });

    test('should track user progress', () => {
      questSystem.startQuest('user_001', 'relativity_1');
      questSystem.completeTask('user_001', 'relativity_1', 0);
      questSystem.completeTask('user_001', 'relativity_1', 1);
      questSystem.completeTask('user_001', 'relativity_1', 2);
      questSystem.completeTask('user_001', 'relativity_1', 3);
      
      const progress = questSystem.getUserProgress('user_001');
      
      expect(progress.userId).toBe('user_001');
      expect(progress.totalQuestsCompleted).toBe(1);
      expect(progress.totalPoints).toBeGreaterThan(0);
      expect(progress.totalEinsteinCoins).toBeGreaterThan(0);
      expect(progress.completedQuests).toContain('relativity_1');
    });

    test('should have progressive milestones', () => {
      const milestones = Array.from(questSystem.milestones.values());
      
      expect(milestones).toHaveLength(6);
      expect(milestones[0].threshold).toBe(1);
      expect(milestones[1].threshold).toBe(5);
      expect(milestones[2].threshold).toBe(10);
      expect(milestones[3].threshold).toBe(25);
      expect(milestones[4].threshold).toBe(50);
      expect(milestones[5].threshold).toBe(100);
    });

    test('should unlock new quests after completion', () => {
      questSystem.startQuest('user_001', 'relativity_1');
      questSystem.completeTask('user_001', 'relativity_1', 0);
      questSystem.completeTask('user_001', 'relativity_1', 1);
      questSystem.completeTask('user_001', 'relativity_1', 2);
      const result = questSystem.completeTask('user_001', 'relativity_1', 3);
      
      expect(result.unlockedQuests).toContain('relativity_2');
    });
  });

  describe('Einstein System Integration', () => {
    let arTalesEngine;
    let companion;
    let questSystem;

    beforeEach(async () => {
      arTalesEngine = new ARTalesEngine({ frequency: 528 });
      companion = new EinsteinAICompanion({ frequency: 528 });
      questSystem = new EinsteinKnowledgeQuest({ frequency: 528 });
      
      await arTalesEngine.initialize();
      await companion.initialize();
      await questSystem.initialize();
    });

    test('should have consistent 528Hz frequency across all systems', () => {
      expect(arTalesEngine.config.frequency).toBe(528);
      expect(companion.config.frequency).toBe(528);
      expect(questSystem.config.frequency).toBe(528);
    });

    test('should support complete learning journey', async () => {
      // 1. Launch AR Tale
      const tale = await arTalesEngine.launchARTale('einstein_legacy');
      expect(tale.taleId).toBeDefined();
      expect(tale.genius).toBe('Albert Einstein');
      
      // 2. Start AI companion session
      const session = companion.startSession('user_001', { topic: 'relativity' });
      expect(session.session.userId).toBe('user_001');
      
      // 3. Start knowledge quest
      const quest = questSystem.startQuest('user_001', 'relativity_1');
      expect(quest.status).toBe('started');
      
      // 4. Complete quest
      questSystem.completeTask('user_001', 'relativity_1', 0);
      questSystem.completeTask('user_001', 'relativity_1', 1);
      questSystem.completeTask('user_001', 'relativity_1', 2);
      const completion = questSystem.completeTask('user_001', 'relativity_1', 3);
      
      expect(completion.status).toBe('quest_completed');
      expect(completion.rewards.points).toBeGreaterThan(0);
    });

    test('should support teaching workflow', () => {
      // Teacher helps learner
      const teaching = questSystem.recordKnowledgeSharing('teacher_001', 'learner_001', 'relativity');
      expect(teaching.status).toBe('knowledge_shared');
      
      // Teacher earns bonus
      const progress = questSystem.getUserProgress('teacher_001');
      expect(progress.knowledgeSharedCount).toBe(1);
      expect(progress.totalPoints).toBeGreaterThan(0);
    });
  });
});
