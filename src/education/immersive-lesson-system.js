/**
 * 🎮 Immersive Lesson System
 * Web-based interactive visualization for educational AR tales
 * Canvas/WebGL rendering for immersive experiences (Pygame-equivalent for web)
 * Operating at 528Hz Divine Frequency
 * 
 * @author Chais the Great (Al-Miftah)
 * @version 1.0.0
 */

const { SACRED_AUDIO_TONES, TIMING_528HZ, PHI_GOLDEN_RATIO } = require('../constants/sacred-constants');

/**
 * Immersive Lesson System for interactive educational experiences
 * Provides canvas-based visualizations and interactive elements
 */
class ImmersiveLessonSystem {
  constructor(config = {}) {
    this.config = {
      frequency: 528,
      renderEngine: 'canvas', // 'canvas' or 'webgl'
      enableAudio: true,
      ...config
    };

    this.initialized = false;
    this.activeLessons = new Map();
    this.visualizationModules = new Map();
    this.interactionHandlers = new Map();
  }

  /**
   * Initialize the immersive lesson system
   */
  async initialize() {
    // Register visualization modules
    this._registerVisualizationModules();
    
    // Setup interaction handlers
    this._setupInteractionHandlers();
    
    this.initialized = true;
    
    return {
      status: 'initialized',
      frequency: this.config.frequency,
      renderEngine: this.config.renderEngine,
      modulesCount: this.visualizationModules.size,
      timestamp: Date.now()
    };
  }

  /**
   * Register visualization modules for different lesson types
   * @private
   */
  _registerVisualizationModules() {
    // Celestial Mosaics - Katherine Johnson's lessons
    this.visualizationModules.set('trajectory_plotter', {
      type: 'canvas_2d',
      description: 'Interactive trajectory plotting for orbital mechanics',
      renderFunction: 'renderTrajectory',
      interactionType: 'click_and_drag',
      frequency: SACRED_AUDIO_TONES.DIVINE
    });

    this.visualizationModules.set('gravity_simulator', {
      type: 'canvas_2d',
      description: 'Real-time gravity simulation with multiple bodies',
      renderFunction: 'renderGravityField',
      interactionType: 'multi_touch',
      frequency: SACRED_AUDIO_TONES.DIVINE
    });

    this.visualizationModules.set('orbit_visualizer', {
      type: 'webgl_3d',
      description: '3D orbital visualization with sacred geometry',
      renderFunction: 'render3DOrbits',
      interactionType: 'rotate_zoom',
      frequency: SACRED_AUDIO_TONES.DIVINE
    });

    // Almanac AR Tales - Benjamin Banneker's lessons
    this.visualizationModules.set('eclipse_predictor', {
      type: 'canvas_2d',
      description: 'Solar and lunar eclipse prediction visualization',
      renderFunction: 'renderEclipse',
      interactionType: 'timeline_scrub',
      frequency: SACRED_AUDIO_TONES.AWAKENING
    });

    this.visualizationModules.set('moon_phase_calculator', {
      type: 'canvas_2d',
      description: 'Interactive moon phase calculator and visualizer',
      renderFunction: 'renderMoonPhases',
      interactionType: 'date_selection',
      frequency: SACRED_AUDIO_TONES.AWAKENING
    });

    this.visualizationModules.set('star_chart', {
      type: 'canvas_2d',
      description: 'Dynamic star chart with constellation mapping',
      renderFunction: 'renderStarChart',
      interactionType: 'pan_and_zoom',
      frequency: SACRED_AUDIO_TONES.AWAKENING
    });

    // Economic Sovereignty - Paul Cuffee's lessons
    this.visualizationModules.set('trade_simulator', {
      type: 'canvas_2d',
      description: 'Maritime trade route simulator with economics',
      renderFunction: 'renderTradeRoutes',
      interactionType: 'strategy_selection',
      frequency: SACRED_AUDIO_TONES.CONNECTION
    });

    this.visualizationModules.set('investment_calculator', {
      type: 'canvas_2d',
      description: 'APY investment growth visualizer',
      renderFunction: 'renderInvestmentGrowth',
      interactionType: 'parameter_adjustment',
      frequency: SACRED_AUDIO_TONES.CONNECTION
    });

    this.visualizationModules.set('community_planner', {
      type: 'canvas_2d',
      description: 'Community development planning interface',
      renderFunction: 'renderCommunityMap',
      interactionType: 'placement_and_build',
      frequency: SACRED_AUDIO_TONES.CONNECTION
    });
  }

  /**
   * Setup interaction handlers
   * @private
   */
  _setupInteractionHandlers() {
    // Click and drag handler
    this.interactionHandlers.set('click_and_drag', {
      events: ['mousedown', 'mousemove', 'mouseup', 'touchstart', 'touchmove', 'touchend'],
      handler: 'handleClickDrag'
    });

    // Multi-touch handler
    this.interactionHandlers.set('multi_touch', {
      events: ['touchstart', 'touchmove', 'touchend'],
      handler: 'handleMultiTouch'
    });

    // Rotation and zoom handler
    this.interactionHandlers.set('rotate_zoom', {
      events: ['wheel', 'mousedown', 'mousemove', 'mouseup'],
      handler: 'handleRotateZoom'
    });

    // Timeline scrubbing handler
    this.interactionHandlers.set('timeline_scrub', {
      events: ['mousedown', 'mousemove', 'mouseup'],
      handler: 'handleTimelineScrub'
    });

    // Parameter adjustment handler
    this.interactionHandlers.set('parameter_adjustment', {
      events: ['input', 'change'],
      handler: 'handleParameterChange'
    });
  }

  /**
   * Start an immersive lesson
   * @param {string} lessonId - Lesson identifier
   * @param {Object} lessonConfig - Lesson configuration
   */
  async startLesson(lessonId, lessonConfig) {
    if (!this.initialized) {
      throw new Error('Immersive Lesson System must be initialized first');
    }

    const lesson = {
      id: lessonId,
      config: lessonConfig,
      startTime: Date.now(),
      frequency: lessonConfig.frequency || this.config.frequency,
      visualizations: [],
      interactions: 0,
      sovereigntyScore: 0,
      status: 'active'
    };

    // Initialize visualization modules for this lesson
    if (lessonConfig.interactiveElements) {
      for (const elementId of lessonConfig.interactiveElements) {
        const module = this.visualizationModules.get(elementId);
        if (module) {
          lesson.visualizations.push({
            elementId,
            module,
            initialized: true,
            frameCount: 0
          });
        }
      }
    }

    this.activeLessons.set(lessonId, lesson);

    return {
      lessonId,
      status: 'started',
      frequency: lesson.frequency,
      visualizations: lesson.visualizations.length,
      duration: lessonConfig.duration,
      message: `Immersive lesson "${lessonId}" started`
    };
  }

  /**
   * Render a visualization frame
   * @param {string} lessonId - Lesson identifier
   * @param {string} elementId - Visualization element
   * @param {Object} renderData - Data for rendering
   */
  renderFrame(lessonId, elementId, renderData = {}) {
    const lesson = this.activeLessons.get(lessonId);
    if (!lesson) {
      throw new Error(`Lesson "${lessonId}" not found`);
    }

    const visualization = lesson.visualizations.find(v => v.elementId === elementId);
    if (!visualization) {
      throw new Error(`Visualization "${elementId}" not found in lesson`);
    }

    // Increment frame count
    visualization.frameCount += 1;

    // Calculate timing based on 528Hz frequency
    const frameTime = Date.now() - lesson.startTime;
    const resonanceCycle = Math.floor(frameTime / TIMING_528HZ.BASE_PERIOD);

    // Apply sacred geometry principles to render data
    const enhancedRenderData = {
      ...renderData,
      frameCount: visualization.frameCount,
      resonanceCycle,
      phiRatio: PHI_GOLDEN_RATIO,
      frequency: lesson.frequency
    };

    return {
      lessonId,
      elementId,
      frameNumber: visualization.frameCount,
      resonanceCycle,
      renderData: enhancedRenderData,
      renderFunction: visualization.module.renderFunction
    };
  }

  /**
   * Handle user interaction
   * @param {string} lessonId - Lesson identifier
   * @param {string} elementId - Visualization element
   * @param {string} interactionType - Type of interaction
   * @param {Object} interactionData - Interaction data
   */
  handleInteraction(lessonId, elementId, interactionType, interactionData) {
    const lesson = this.activeLessons.get(lessonId);
    if (!lesson) {
      throw new Error(`Lesson "${lessonId}" not found`);
    }

    lesson.interactions += 1;

    // Award sovereignty points based on meaningful interactions
    const sovereigntyPoints = this._calculateSovereigntyPoints(interactionType, interactionData);
    lesson.sovereigntyScore += sovereigntyPoints;

    return {
      lessonId,
      elementId,
      interactionType,
      totalInteractions: lesson.interactions,
      sovereigntyPointsEarned: sovereigntyPoints,
      totalSovereigntyScore: lesson.sovereigntyScore
    };
  }

  /**
   * Calculate sovereignty points for interactions
   * @private
   */
  _calculateSovereigntyPoints(interactionType, data) {
    // Sovereignty points constants
    const BASE_INTERACTION_POINTS = 10;
    const INTERACTION_BONUSES = {
      multi_touch: 15,
      strategy_selection: 20,
      parameter_adjustment: 12
    };
    const ACCURACY_MULTIPLIER = 30;
    const CREATIVITY_MULTIPLIER = 25;

    // Base points for any interaction
    let points = BASE_INTERACTION_POINTS;

    // Bonus points for complex interactions
    if (INTERACTION_BONUSES[interactionType]) {
      points += INTERACTION_BONUSES[interactionType];
    }

    // Bonus for accuracy (if provided)
    if (data.accuracy) {
      points += Math.floor(data.accuracy * ACCURACY_MULTIPLIER);
    }

    // Bonus for creativity (if provided)
    if (data.creativity) {
      points += Math.floor(data.creativity * CREATIVITY_MULTIPLIER);
    }

    return points;
  }

  /**
   * Complete a lesson
   * @param {string} lessonId - Lesson identifier
   */
  completeLesson(lessonId) {
    const lesson = this.activeLessons.get(lessonId);
    if (!lesson) {
      throw new Error(`Lesson "${lessonId}" not found`);
    }

    lesson.status = 'completed';
    lesson.completionTime = Date.now();
    lesson.duration = lesson.completionTime - lesson.startTime;

    // Calculate final scores
    const totalFrames = lesson.visualizations.reduce((sum, v) => sum + v.frameCount, 0);
    const engagementScore = Math.floor((lesson.interactions / totalFrames) * 100);

    return {
      lessonId,
      status: 'completed',
      duration: lesson.duration,
      totalInteractions: lesson.interactions,
      totalFrames,
      sovereigntyScore: lesson.sovereigntyScore,
      engagementScore,
      frequency: lesson.frequency
    };
  }

  /**
   * Get lesson progress
   * @param {string} lessonId - Lesson identifier
   */
  getLessonProgress(lessonId) {
    const lesson = this.activeLessons.get(lessonId);
    if (!lesson) {
      return null;
    }

    const elapsedTime = Date.now() - lesson.startTime;
    const totalFrames = lesson.visualizations.reduce((sum, v) => sum + v.frameCount, 0);

    return {
      lessonId,
      status: lesson.status,
      elapsedTime,
      totalInteractions: lesson.interactions,
      totalFrames,
      sovereigntyScore: lesson.sovereigntyScore,
      visualizations: lesson.visualizations.map(v => ({
        elementId: v.elementId,
        frameCount: v.frameCount
      }))
    };
  }

  /**
   * Get system status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      frequency: this.config.frequency,
      renderEngine: this.config.renderEngine,
      enableAudio: this.config.enableAudio,
      visualizationModules: this.visualizationModules.size,
      activeLessons: this.activeLessons.size,
      modules: Array.from(this.visualizationModules.keys())
    };
  }
}

module.exports = ImmersiveLessonSystem;
