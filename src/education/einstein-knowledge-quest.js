/**
 * 🎯 Einstein's Knowledge Quest System
 * Gamified learning system with progressive rewards and real-world impact
 * Incentivizes learners, explorers, and teachers in the ScrollVerse
 * Operating at 528Hz Divine Frequency
 * 
 * @author Chais the Great (Al-Miftah)
 * @version 1.0.0
 */

const { SACRED_AUDIO_TONES } = require('../constants/sacred-constants');

/**
 * Einstein Knowledge Quest - Gamified Learning Platform
 * Progressive milestone system with achievement bonuses
 */
class EinsteinKnowledgeQuest {
  constructor(config = {}) {
    this.config = {
      frequency: 528, // Hz - Miracle tone
      baseRewardPoints: 10,
      teachingBonusMultiplier: 2.5,
      ...config
    };

    this.initialized = false;
    this.activeQuests = new Map();
    this.userProgress = new Map();
    this.milestones = new Map();
    this.achievements = new Map();
    
    // Quest categories aligned with Einstein's themes
    this.questCategories = {
      RELATIVITY: 'relativity',
      CURIOSITY: 'curiosity',
      PROBLEM_SOLVING: 'problem_solving',
      HUMAN_CONNECTIONS: 'human_connections',
      IMAGINATION: 'imagination'
    };
  }

  /**
   * Initialize the Knowledge Quest system
   */
  async initialize() {
    // Initialize quest structure
    this._initializeQuestStructure();
    
    // Initialize milestones
    this._initializeMilestones();
    
    // Initialize achievements
    this._initializeAchievements();
    
    this.initialized = true;
    
    return {
      status: 'initialized',
      frequency: this.config.frequency,
      questCategoriesCount: Object.keys(this.questCategories).length,
      milestonesCount: this.milestones.size,
      achievementsCount: this.achievements.size,
      timestamp: Date.now()
    };
  }

  /**
   * Initialize quest structure with all quests
   * @private
   */
  _initializeQuestStructure() {
    // Relativity Quest Chain
    this._createQuest('relativity_1', {
      title: 'Understanding Time Dilation',
      description: 'Learn how time passes differently for objects moving at different speeds',
      category: this.questCategories.RELATIVITY,
      difficulty: 'beginner',
      tasks: [
        'Watch Einstein\'s time dilation lesson',
        'Complete the twin paradox quiz',
        'Calculate time dilation for a moving spaceship',
        'Share your understanding with another learner'
      ],
      rewards: {
        points: 50,
        einsteinCoins: 10,
        badge: 'Time Traveler'
      },
      unlocks: ['relativity_2']
    });

    this._createQuest('relativity_2', {
      title: 'E=mc²: Mass-Energy Equivalence',
      description: 'Discover the most famous equation in physics and its profound meaning',
      category: this.questCategories.RELATIVITY,
      difficulty: 'beginner',
      tasks: [
        'Learn the derivation of E=mc²',
        'Calculate energy from mass conversion',
        'Explore real-world applications (nuclear power, sun\'s energy)',
        'Create a visual explanation for others'
      ],
      rewards: {
        points: 75,
        einsteinCoins: 15,
        badge: 'Energy Master'
      },
      unlocks: ['relativity_3']
    });

    this._createQuest('relativity_3', {
      title: 'Spacetime and Gravity',
      description: 'Understand how mass curves spacetime and creates what we call gravity',
      category: this.questCategories.RELATIVITY,
      difficulty: 'intermediate',
      tasks: [
        'Explore the rubber sheet analogy',
        'Study gravitational time dilation',
        'Learn about gravitational waves',
        'Teach a beginner about curved spacetime'
      ],
      rewards: {
        points: 100,
        einsteinCoins: 25,
        badge: 'Spacetime Navigator'
      },
      unlocks: ['relativity_advanced']
    });

    // Curiosity Quest Chain
    this._createQuest('curiosity_1', {
      title: 'The Art of Questioning',
      description: 'Learn to ask profound questions that lead to discovery',
      category: this.questCategories.CURIOSITY,
      difficulty: 'beginner',
      tasks: [
        'Read Einstein\'s thoughts on curiosity',
        'Practice asking "Why?" five times about a phenomenon',
        'Document your curiosity journey',
        'Inspire curiosity in a young learner'
      ],
      rewards: {
        points: 40,
        einsteinCoins: 8,
        badge: 'Curious Mind'
      },
      unlocks: ['curiosity_2']
    });

    this._createQuest('curiosity_2', {
      title: 'Thought Experiments',
      description: 'Use imagination to explore the universe through thought alone',
      category: this.questCategories.CURIOSITY,
      difficulty: 'intermediate',
      tasks: [
        'Study Einstein\'s famous thought experiments',
        'Create your own thought experiment',
        'Share it with the community',
        'Help others develop their thought experiments'
      ],
      rewards: {
        points: 80,
        einsteinCoins: 18,
        badge: 'Thought Pioneer'
      },
      unlocks: ['curiosity_3']
    });

    // Problem Solving Quest Chain
    this._createQuest('problem_solving_1', {
      title: 'Einstein\'s Problem-Solving Approach',
      description: 'Learn Einstein\'s method: Spend 55 minutes understanding, 5 minutes solving',
      category: this.questCategories.PROBLEM_SOLVING,
      difficulty: 'beginner',
      tasks: [
        'Study Einstein\'s problem-solving philosophy',
        'Apply the 55/5 method to a real problem',
        'Document your process and insights',
        'Share your solution approach with others'
      ],
      rewards: {
        points: 60,
        einsteinCoins: 12,
        badge: 'Problem Solver'
      },
      unlocks: ['problem_solving_2']
    });

    this._createQuest('problem_solving_2', {
      title: 'Physics Riddles and Paradoxes',
      description: 'Solve classic physics puzzles that challenged even Einstein',
      category: this.questCategories.PROBLEM_SOLVING,
      difficulty: 'intermediate',
      tasks: [
        'Solve the EPR paradox',
        'Understand Bell\'s theorem',
        'Explore quantum entanglement',
        'Explain a paradox to someone new to physics'
      ],
      rewards: {
        points: 90,
        einsteinCoins: 20,
        badge: 'Paradox Resolver'
      },
      unlocks: ['problem_solving_3']
    });

    // Human Connections Quest Chain
    this._createQuest('human_connections_1', {
      title: 'Einstein\'s Humanitarian Vision',
      description: 'Learn about Einstein\'s dedication to peace, justice, and humanity',
      category: this.questCategories.HUMAN_CONNECTIONS,
      difficulty: 'beginner',
      tasks: [
        'Study Einstein\'s humanitarian work',
        'Read his letters on peace and justice',
        'Reflect on applying his values today',
        'Share Einstein\'s wisdom with your community'
      ],
      rewards: {
        points: 45,
        einsteinCoins: 10,
        badge: 'Peace Advocate'
      },
      unlocks: ['human_connections_2']
    });

    // Imagination Quest Chain
    this._createQuest('imagination_1', {
      title: 'Imagination Over Knowledge',
      description: 'Develop your creative thinking beyond the boundaries of current knowledge',
      category: this.questCategories.IMAGINATION,
      difficulty: 'beginner',
      tasks: [
        'Learn Einstein\'s views on imagination',
        'Engage in creative visualization exercises',
        'Imagine future scientific breakthroughs',
        'Inspire creative thinking in others'
      ],
      rewards: {
        points: 55,
        einsteinCoins: 11,
        badge: 'Imagination Champion'
      },
      unlocks: ['imagination_2']
    });
  }

  /**
   * Create a quest
   * @private
   */
  _createQuest(questId, questData) {
    this.activeQuests.set(questId, {
      questId,
      ...questData,
      createdAt: Date.now(),
      completionCount: 0
    });
  }

  /**
   * Initialize milestone system
   * @private
   */
  _initializeMilestones() {
    // Progressive milestones with increasing rewards
    const milestones = [
      {
        id: 'first_quest',
        title: 'First Steps',
        requirement: 'Complete 1 quest',
        threshold: 1,
        reward: { points: 25, einsteinCoins: 5, badge: 'Journey Begun' }
      },
      {
        id: 'curious_learner',
        title: 'Curious Learner',
        requirement: 'Complete 5 quests',
        threshold: 5,
        reward: { points: 100, einsteinCoins: 20, badge: 'Dedicated Learner' }
      },
      {
        id: 'knowledge_seeker',
        title: 'Knowledge Seeker',
        requirement: 'Complete 10 quests',
        threshold: 10,
        reward: { points: 250, einsteinCoins: 50, badge: 'Knowledge Seeker' }
      },
      {
        id: 'einstein_scholar',
        title: 'Einstein Scholar',
        requirement: 'Complete 25 quests',
        threshold: 25,
        reward: { points: 500, einsteinCoins: 100, badge: 'Einstein Scholar' }
      },
      {
        id: 'master_explorer',
        title: 'Master Explorer',
        requirement: 'Complete 50 quests',
        threshold: 50,
        reward: { points: 1000, einsteinCoins: 250, badge: 'Master Explorer' }
      },
      {
        id: 'knowledge_master',
        title: 'Knowledge Master',
        requirement: 'Complete 100 quests',
        threshold: 100,
        reward: { points: 2500, einsteinCoins: 500, badge: 'Knowledge Master' }
      }
    ];

    milestones.forEach(milestone => {
      this.milestones.set(milestone.id, milestone);
    });
  }

  /**
   * Initialize achievement system
   * @private
   */
  _initializeAchievements() {
    const achievements = [
      {
        id: 'knowledge_sharer',
        title: 'Knowledge Sharer',
        description: 'Teach 5 other learners',
        requirement: { type: 'teaching', count: 5 },
        reward: { points: 150, einsteinCoins: 30, multiplier: 1.2 }
      },
      {
        id: 'master_teacher',
        title: 'Master Teacher',
        description: 'Teach 25 other learners',
        requirement: { type: 'teaching', count: 25 },
        reward: { points: 500, einsteinCoins: 100, multiplier: 1.5 }
      },
      {
        id: 'einstein_mentor',
        title: 'Einstein Mentor',
        description: 'Teach 100 other learners',
        requirement: { type: 'teaching', count: 100 },
        reward: { points: 2000, einsteinCoins: 400, multiplier: 2.0 }
      },
      {
        id: 'category_master_relativity',
        title: 'Relativity Master',
        description: 'Complete all relativity quests',
        requirement: { type: 'category_completion', category: 'relativity' },
        reward: { points: 300, einsteinCoins: 75, badge: 'Relativity Master' }
      },
      {
        id: 'rapid_learner',
        title: 'Rapid Learner',
        description: 'Complete 10 quests in one day',
        requirement: { type: 'rapid_completion', count: 10, timeframe: 86400000 },
        reward: { points: 200, einsteinCoins: 40, badge: 'Speed Scholar' }
      },
      {
        id: 'community_champion',
        title: 'Community Champion',
        description: 'Help 50 learners complete their quests',
        requirement: { type: 'community_support', count: 50 },
        reward: { points: 750, einsteinCoins: 150, badge: 'Community Champion' }
      }
    ];

    achievements.forEach(achievement => {
      this.achievements.set(achievement.id, achievement);
    });
  }

  /**
   * Start a quest for a user
   * @param {string} userId - User identifier
   * @param {string} questId - Quest identifier
   */
  startQuest(userId, questId) {
    if (!this.initialized) {
      throw new Error('Knowledge Quest system must be initialized first');
    }

    const quest = this.activeQuests.get(questId);
    if (!quest) {
      throw new Error(`Quest ${questId} not found`);
    }

    // Initialize user progress if needed
    if (!this.userProgress.has(userId)) {
      this._initializeUserProgress(userId);
    }

    const userProgress = this.userProgress.get(userId);
    
    // Check if quest is already completed
    if (userProgress.completedQuests.includes(questId)) {
      return {
        status: 'already_completed',
        quest,
        message: 'You have already completed this quest!'
      };
    }

    // Check if quest is already in progress
    if (userProgress.currentQuests.some(q => q.questId === questId)) {
      return {
        status: 'in_progress',
        quest,
        message: 'This quest is already in progress!'
      };
    }

    // Add to current quests
    const questProgress = {
      questId,
      startedAt: Date.now(),
      tasksCompleted: [],
      progress: 0
    };

    userProgress.currentQuests.push(questProgress);

    return {
      status: 'started',
      quest,
      questProgress,
      message: `Quest "${quest.title}" started! Good luck on your journey of discovery.`,
      einsteinWisdom: this._getQuestWisdom(quest.category)
    };
  }

  /**
   * Complete a quest task
   * @param {string} userId - User identifier
   * @param {string} questId - Quest identifier
   * @param {number} taskIndex - Task index to complete
   */
  completeTask(userId, questId, taskIndex) {
    const userProgress = this.userProgress.get(userId);
    if (!userProgress) {
      throw new Error('User not found');
    }

    const questProgress = userProgress.currentQuests.find(q => q.questId === questId);
    if (!questProgress) {
      throw new Error('Quest not in progress');
    }

    const quest = this.activeQuests.get(questId);
    
    // Mark task as completed
    if (!questProgress.tasksCompleted.includes(taskIndex)) {
      questProgress.tasksCompleted.push(taskIndex);
      questProgress.progress = (questProgress.tasksCompleted.length / quest.tasks.length) * 100;
    }

    const isQuestComplete = questProgress.tasksCompleted.length === quest.tasks.length;

    if (isQuestComplete) {
      return this.completeQuest(userId, questId);
    }

    return {
      status: 'task_completed',
      questId,
      taskCompleted: quest.tasks[taskIndex],
      progress: questProgress.progress,
      tasksRemaining: quest.tasks.length - questProgress.tasksCompleted.length,
      nextTask: quest.tasks[questProgress.tasksCompleted.length]
    };
  }

  /**
   * Complete a quest
   * @param {string} userId - User identifier
   * @param {string} questId - Quest identifier
   */
  completeQuest(userId, questId) {
    const userProgress = this.userProgress.get(userId);
    const quest = this.activeQuests.get(questId);

    // Move from current to completed
    userProgress.currentQuests = userProgress.currentQuests.filter(q => q.questId !== questId);
    userProgress.completedQuests.push(questId);
    userProgress.totalQuestsCompleted++;

    // Award rewards
    const rewards = quest.rewards;
    userProgress.totalPoints += rewards.points;
    userProgress.totalEinsteinCoins += rewards.einsteinCoins;
    if (rewards.badge) {
      userProgress.badges.push(rewards.badge);
    }

    // Check for milestone completions
    const newMilestones = this._checkMilestones(userProgress);

    // Check for achievement completions
    const newAchievements = this._checkAchievements(userProgress);

    // Unlock new quests
    const unlockedQuests = quest.unlocks || [];

    return {
      status: 'quest_completed',
      quest,
      rewards,
      newMilestones,
      newAchievements,
      unlockedQuests,
      userProgress: {
        totalQuests: userProgress.totalQuestsCompleted,
        totalPoints: userProgress.totalPoints,
        totalCoins: userProgress.totalEinsteinCoins,
        badges: userProgress.badges
      },
      einsteinCongratulation: 'Excellent work! The mind that opens to a new idea never returns to its original size.'
    };
  }

  /**
   * Record knowledge sharing (teaching)
   * @param {string} teacherId - Teacher user ID
   * @param {string} learnerId - Learner user ID
   * @param {string} topic - Topic taught
   */
  recordKnowledgeSharing(teacherId, learnerId, topic) {
    if (!this.userProgress.has(teacherId)) {
      this._initializeUserProgress(teacherId);
    }

    const teacherProgress = this.userProgress.get(teacherId);
    
    teacherProgress.knowledgeSharedCount++;
    teacherProgress.studentsHelped.push({
      learnerId,
      topic,
      timestamp: Date.now()
    });

    // Award teaching bonus
    const bonusPoints = Math.floor(this.config.baseRewardPoints * this.config.teachingBonusMultiplier);
    teacherProgress.totalPoints += bonusPoints;
    teacherProgress.totalEinsteinCoins += Math.floor(bonusPoints / 5);

    // Check for teaching achievements
    const newAchievements = this._checkAchievements(teacherProgress);

    return {
      status: 'knowledge_shared',
      teacher: teacherId,
      learner: learnerId,
      topic,
      bonusPoints,
      totalShared: teacherProgress.knowledgeSharedCount,
      newAchievements,
      einsteinWisdom: 'The value of education is not the learning of facts, but the training of the mind to think.'
    };
  }

  /**
   * Get user progress
   * @param {string} userId - User identifier
   */
  getUserProgress(userId) {
    return this.userProgress.get(userId) || null;
  }

  /**
   * Get quest details
   * @param {string} questId - Quest identifier
   */
  getQuest(questId) {
    return this.activeQuests.get(questId) || null;
  }

  /**
   * Get quests by category
   * @param {string} category - Quest category
   */
  getQuestsByCategory(category) {
    const quests = [];
    for (const [questId, quest] of this.activeQuests.entries()) {
      if (quest.category === category) {
        quests.push(quest);
      }
    }
    return quests;
  }

  /**
   * Initialize user progress
   * @private
   */
  _initializeUserProgress(userId) {
    this.userProgress.set(userId, {
      userId,
      totalQuestsCompleted: 0,
      totalPoints: 0,
      totalEinsteinCoins: 0,
      currentQuests: [],
      completedQuests: [],
      badges: [],
      achievements: [],
      milestones: [],
      knowledgeSharedCount: 0,
      studentsHelped: [],
      joinedAt: Date.now(),
      lastActivity: Date.now()
    });
  }

  /**
   * Check for milestone completions
   * @private
   */
  _checkMilestones(userProgress) {
    const newMilestones = [];
    
    for (const [milestoneId, milestone] of this.milestones.entries()) {
      if (userProgress.milestones.includes(milestoneId)) {
        continue;
      }
      
      if (userProgress.totalQuestsCompleted >= milestone.threshold) {
        userProgress.milestones.push(milestoneId);
        userProgress.totalPoints += milestone.reward.points;
        userProgress.totalEinsteinCoins += milestone.reward.einsteinCoins;
        if (milestone.reward.badge) {
          userProgress.badges.push(milestone.reward.badge);
        }
        newMilestones.push(milestone);
      }
    }
    
    return newMilestones;
  }

  /**
   * Check for achievement completions
   * @private
   */
  _checkAchievements(userProgress) {
    const newAchievements = [];
    
    for (const [achievementId, achievement] of this.achievements.entries()) {
      if (userProgress.achievements.includes(achievementId)) {
        continue;
      }
      
      let achieved = false;
      
      if (achievement.requirement.type === 'teaching') {
        achieved = userProgress.knowledgeSharedCount >= achievement.requirement.count;
      }
      
      if (achieved) {
        userProgress.achievements.push(achievementId);
        userProgress.totalPoints += achievement.reward.points;
        userProgress.totalEinsteinCoins += achievement.reward.einsteinCoins;
        if (achievement.reward.badge) {
          userProgress.badges.push(achievement.reward.badge);
        }
        newAchievements.push(achievement);
      }
    }
    
    return newAchievements;
  }

  /**
   * Get wisdom for quest category
   * @private
   */
  _getQuestWisdom(category) {
    const wisdom = {
      relativity: 'The only reason for time is so that everything doesn\'t happen at once.',
      curiosity: 'The important thing is not to stop questioning. Curiosity has its own reason for existing.',
      problem_solving: 'We cannot solve our problems with the same thinking we used when we created them.',
      human_connections: 'Peace cannot be kept by force; it can only be achieved by understanding.',
      imagination: 'Logic will get you from A to B. Imagination will take you everywhere.'
    };
    
    return wisdom[category] || wisdom.curiosity;
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      frequency: this.config.frequency,
      totalQuests: this.activeQuests.size,
      totalMilestones: this.milestones.size,
      totalAchievements: this.achievements.size,
      activeUsers: this.userProgress.size,
      questCategories: Object.keys(this.questCategories).length
    };
  }
}

module.exports = EinsteinKnowledgeQuest;
