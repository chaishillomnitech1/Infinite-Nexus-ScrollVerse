/**
 * 🌌 ScrollVerse Data Manager
 * Multi-Feature Backend Integration Layer
 * 
 * This module provides a unified data management layer for:
 * - MiniMax Ambassador Program Tracking
 * - AI Research Insights Visualization
 * - Active Scrolls Management
 * 
 * Supports both localStorage (for static sites) and Firestore (for production)
 * Aligned with 528Hz resonance frequency
 */

// ============================================================================
// Core Data Manager Class
// ============================================================================

class ScrollVerseDataManager {
  constructor(config = {}) {
    this.useFirestore = config.useFirestore || false;
    this.firestoreConfig = config.firestoreConfig || null;
    this.frequency = '528Hz';
    this.syncInterval = 528; // 528ms aligned with frequency
    this.lastSync = null;
    
    // Initialize storage
    this.storage = this.useFirestore ? new FirestoreStorage(this.firestoreConfig) : new LocalStorage();
    
    console.log(`🌌 ScrollVerse Data Manager initialized with ${this.useFirestore ? 'Firestore' : 'localStorage'}`);
  }

  /**
   * Get data for a specific feature
   */
  async getData(feature) {
    try {
      console.log(`📡 Fetching data for feature: ${feature}`);
      const data = await this.storage.get(feature);
      this.lastSync = new Date().toISOString();
      return data;
    } catch (error) {
      console.error(`❌ Error fetching data for ${feature}:`, error);
      throw error;
    }
  }

  /**
   * Save data for a specific feature
   */
  async saveData(feature, data) {
    try {
      console.log(`💾 Saving data for feature: ${feature}`);
      await this.storage.set(feature, data);
      this.lastSync = new Date().toISOString();
      console.log(`✅ Data saved successfully for ${feature}`);
      return true;
    } catch (error) {
      console.error(`❌ Error saving data for ${feature}:`, error);
      throw error;
    }
  }

  /**
   * Update specific fields in feature data
   */
  async updateData(feature, updates) {
    try {
      console.log(`🔄 Updating data for feature: ${feature}`);
      const currentData = await this.getData(feature);
      const updatedData = this.deepMerge(currentData, updates);
      await this.saveData(feature, updatedData);
      return updatedData;
    } catch (error) {
      console.error(`❌ Error updating data for ${feature}:`, error);
      throw error;
    }
  }

  /**
   * Delete data for a specific feature
   */
  async deleteData(feature) {
    try {
      console.log(`🗑️ Deleting data for feature: ${feature}`);
      await this.storage.delete(feature);
      return true;
    } catch (error) {
      console.error(`❌ Error deleting data for ${feature}:`, error);
      throw error;
    }
  }

  /**
   * Sync data between local and remote storage
   */
  async syncData(feature) {
    try {
      console.log(`🔄 Syncing data for feature: ${feature}`);
      
      if (!this.useFirestore) {
        console.log('⚠️ Firestore not enabled, skipping sync');
        return false;
      }

      // Implementation would sync localStorage with Firestore
      // For now, just update last sync time
      this.lastSync = new Date().toISOString();
      return true;
    } catch (error) {
      console.error(`❌ Error syncing data for ${feature}:`, error);
      throw error;
    }
  }

  /**
   * Deep merge objects
   */
  deepMerge(target, source) {
    const output = Object.assign({}, target);
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target))
            Object.assign(output, { [key]: source[key] });
          else
            output[key] = this.deepMerge(target[key], source[key]);
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }
    return output;
  }

  /**
   * Check if value is an object
   */
  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  /**
   * Get last sync timestamp
   */
  getLastSync() {
    return this.lastSync;
  }
}

// ============================================================================
// LocalStorage Implementation
// ============================================================================

class LocalStorage {
  constructor() {
    this.prefix = 'scrollverse_';
    console.log('💾 LocalStorage initialized');
  }

  async get(key) {
    const fullKey = this.prefix + key;
    const data = localStorage.getItem(fullKey);
    return data ? JSON.parse(data) : null;
  }

  async set(key, data) {
    const fullKey = this.prefix + key;
    localStorage.setItem(fullKey, JSON.stringify(data));
    return true;
  }

  async delete(key) {
    const fullKey = this.prefix + key;
    localStorage.removeItem(fullKey);
    return true;
  }

  async getAllKeys() {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        keys.push(key.replace(this.prefix, ''));
      }
    }
    return keys;
  }
}

// ============================================================================
// Firestore Implementation
// ============================================================================

class FirestoreStorage {
  constructor(config) {
    this.config = config;
    this.db = null;
    this.listeners = new Map();
    console.log('🔥 Firestore storage initialized');
    
    // Initialize Firebase if config is provided
    if (config && typeof firebase !== 'undefined') {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }
        this.db = firebase.firestore();
        console.log('✅ Firestore connected successfully');
      } catch (error) {
        console.error('❌ Failed to initialize Firebase:', error);
      }
    }
  }

  /**
   * Get data from Firestore
   */
  async get(key) {
    if (!this.db) {
      console.warn('⚠️ Firestore not initialized, falling back to localStorage');
      const localStorage = new LocalStorage();
      return await localStorage.get(key);
    }

    try {
      console.log(`🔥 Fetching from Firestore: ${key}`);
      const docRef = this.db.collection('scrollverse').doc(key);
      const doc = await docRef.get();
      
      if (doc.exists) {
        return doc.data();
      } else {
        console.log(`📭 Document ${key} not found in Firestore`);
        return null;
      }
    } catch (error) {
      console.error(`❌ Error fetching from Firestore:`, error);
      throw error;
    }
  }

  /**
   * Save data to Firestore
   */
  async set(key, data) {
    if (!this.db) {
      console.warn('⚠️ Firestore not initialized, falling back to localStorage');
      const localStorage = new LocalStorage();
      return await localStorage.set(key, data);
    }

    try {
      console.log(`🔥 Saving to Firestore: ${key}`);
      const docRef = this.db.collection('scrollverse').doc(key);
      // merge: true allows partial updates without overwriting entire document
      await docRef.set(data, { merge: true });
      console.log(`✅ Data saved to Firestore: ${key}`);
      return true;
    } catch (error) {
      console.error(`❌ Error saving to Firestore:`, error);
      throw error;
    }
  }

  /**
   * Delete data from Firestore
   */
  async delete(key) {
    if (!this.db) {
      console.warn('⚠️ Firestore not initialized, falling back to localStorage');
      const localStorage = new LocalStorage();
      return await localStorage.delete(key);
    }

    try {
      console.log(`🔥 Deleting from Firestore: ${key}`);
      const docRef = this.db.collection('scrollverse').doc(key);
      await docRef.delete();
      console.log(`✅ Data deleted from Firestore: ${key}`);
      return true;
    } catch (error) {
      console.error(`❌ Error deleting from Firestore:`, error);
      throw error;
    }
  }

  /**
   * Subscribe to real-time updates
   */
  onSnapshot(key, callback) {
    if (!this.db) {
      console.warn('⚠️ Firestore not initialized, real-time updates not available');
      return () => {};
    }

    try {
      console.log(`👂 Listening to Firestore updates: ${key}`);
      const docRef = this.db.collection('scrollverse').doc(key);
      
      const unsubscribe = docRef.onSnapshot(
        (doc) => {
          if (doc.exists) {
            console.log(`🔄 Received update for ${key}`);
            callback(doc.data(), null);
          } else {
            callback(null, null);
          }
        },
        (error) => {
          console.error(`❌ Error in snapshot listener:`, error);
          callback(null, error);
        }
      );

      // Store the unsubscribe function
      this.listeners.set(key, unsubscribe);
      
      return unsubscribe;
    } catch (error) {
      console.error(`❌ Error setting up listener:`, error);
      return () => {};
    }
  }

  /**
   * Unsubscribe from updates
   */
  unsubscribe(key) {
    if (this.listeners.has(key)) {
      const unsubscribe = this.listeners.get(key);
      unsubscribe();
      this.listeners.delete(key);
      console.log(`🔕 Unsubscribed from ${key}`);
    }
  }

  /**
   * Unsubscribe from all listeners
   */
  unsubscribeAll() {
    this.listeners.forEach((unsubscribe, key) => {
      unsubscribe();
      console.log(`🔕 Unsubscribed from ${key}`);
    });
    this.listeners.clear();
  }
}

// ============================================================================
// Feature-Specific Data Managers
// ============================================================================

class MinimaxAmbassadorManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.featureKey = 'minimax_ambassador';
  }

  async getData() {
    return await this.dataManager.getData(this.featureKey);
  }

  async saveData(data) {
    return await this.dataManager.saveData(this.featureKey, data);
  }

  async updateTask(taskId, updates) {
    const data = await this.getData();
    const taskIndex = data.tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
      throw new Error(`Task ${taskId} not found`);
    }

    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updates };
    
    // Recalculate metrics
    data.metrics = this.calculateMetrics(data.tasks);
    
    return await this.saveData(data);
  }

  async completeTask(taskId) {
    return await this.updateTask(taskId, {
      status: 'completed',
      completedDate: new Date().toISOString()
    });
  }

  calculateMetrics(tasks) {
    return {
      totalTasks: tasks.length,
      completedTasks: tasks.filter(t => t.status === 'completed').length,
      inProgressTasks: tasks.filter(t => t.status === 'in_progress').length,
      pendingTasks: tasks.filter(t => t.status === 'pending').length,
      pointsEarned: tasks
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.points, 0),
      totalPoints: tasks.reduce((sum, t) => sum + t.points, 0)
    };
  }
}

class AIResearchInsightsManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.featureKey = 'ai_research';
  }

  async getData() {
    return await this.dataManager.getData(this.featureKey);
  }

  async saveData(data) {
    return await this.dataManager.saveData(this.featureKey, data);
  }

  async addResearchTrend(year, papers) {
    const data = await this.getData();
    
    // Check if year already exists
    const existingIndex = data.researchTrends.findIndex(t => t.year === year);
    
    if (existingIndex !== -1) {
      data.researchTrends[existingIndex] = { year, papers };
    } else {
      data.researchTrends.push({ year, papers });
      data.researchTrends.sort((a, b) => a.year - b.year);
    }
    
    return await this.saveData(data);
  }

  async addEmergingTopic(topic) {
    const data = await this.getData();
    data.emergingTopics.push(topic);
    return await this.saveData(data);
  }
}

class ActiveScrollsManager {
  constructor(dataManager) {
    this.dataManager = dataManager;
    this.featureKey = 'active_scrolls';
    this.listeners = [];
  }

  async getData() {
    return await this.dataManager.getData(this.featureKey);
  }

  async saveData(data) {
    return await this.dataManager.saveData(this.featureKey, data);
  }

  /**
   * Subscribe to real-time updates
   * @param {Function} callback - Called when data changes
   * @returns {Function} Unsubscribe function
   */
  onDataChange(callback) {
    if (this.dataManager.storage instanceof FirestoreStorage) {
      const unsubscribe = this.dataManager.storage.onSnapshot(
        this.featureKey,
        (data, error) => {
          if (error) {
            console.error('Error in data listener:', error);
            callback(null, error);
          } else {
            callback(data, null);
          }
        }
      );
      this.listeners.push(unsubscribe);
      return unsubscribe;
    } else {
      console.warn('Real-time updates not available with localStorage');
      return () => {};
    }
  }

  /**
   * Unsubscribe from all listeners
   */
  unsubscribeAll() {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners = [];
  }

  async addScroll(scroll) {
    const data = await this.getData();
    
    // Generate ID if not provided
    // Note: Assumes all scroll IDs follow 'SCR-XXX' format
    if (!scroll.id) {
      const maxId = data.scrolls.reduce((max, s) => {
        const num = parseInt(s.id.replace('SCR-', ''));
        // Handle invalid ID formats by treating as 0
        return isNaN(num) ? max : Math.max(num, max);
      }, 0);
      scroll.id = `SCR-${String(maxId + 1).padStart(3, '0')}`;
    }
    
    // Set timestamps
    scroll.createdDate = scroll.createdDate || new Date().toISOString();
    scroll.lastModified = new Date().toISOString();
    
    data.scrolls.push(scroll);
    data.statistics = this.calculateStatistics(data.scrolls);
    await this.saveData(data);
    
    return scroll;
  }

  async updateScroll(scrollId, updates) {
    const data = await this.getData();
    const scrollIndex = data.scrolls.findIndex(s => s.id === scrollId);
    
    if (scrollIndex === -1) {
      throw new Error(`Scroll ${scrollId} not found`);
    }

    // Save version history before updating
    const oldScroll = { ...data.scrolls[scrollIndex] };
    await this.saveVersion(scrollId, oldScroll);

    data.scrolls[scrollIndex] = { 
      ...data.scrolls[scrollIndex], 
      ...updates,
      lastModified: new Date().toISOString()
    };
    
    data.statistics = this.calculateStatistics(data.scrolls);
    
    await this.saveData(data);
    return data.scrolls[scrollIndex];
  }

  /**
   * Save a version of the scroll to history
   */
  async saveVersion(scrollId, scrollData) {
    try {
      const versionKey = `version_history_${scrollId}`;
      let versionHistory = await this.dataManager.getData(versionKey) || { versions: [] };
      
      const version = {
        ...scrollData,
        versionNumber: versionHistory.versions.length + 1,
        versionTimestamp: new Date().toISOString()
      };
      
      versionHistory.versions.push(version);
      
      // Keep only last 50 versions to avoid excessive storage
      if (versionHistory.versions.length > 50) {
        versionHistory.versions = versionHistory.versions.slice(-50);
      }
      
      await this.dataManager.saveData(versionKey, versionHistory);
      console.log(`✅ Version ${version.versionNumber} saved for ${scrollId}`);
    } catch (error) {
      console.error('❌ Error saving version:', error);
    }
  }

  /**
   * Get version history for a scroll
   */
  async getVersionHistory(scrollId) {
    try {
      const versionKey = `version_history_${scrollId}`;
      const versionHistory = await this.dataManager.getData(versionKey);
      return versionHistory ? versionHistory.versions : [];
    } catch (error) {
      console.error('❌ Error getting version history:', error);
      return [];
    }
  }

  /**
   * Restore a specific version
   */
  async restoreVersion(scrollId, versionNumber) {
    try {
      const versions = await this.getVersionHistory(scrollId);
      const version = versions.find(v => v.versionNumber === versionNumber);
      
      if (!version) {
        throw new Error(`Version ${versionNumber} not found for ${scrollId}`);
      }
      
      // Remove version-specific fields
      const { versionNumber: vn, versionTimestamp, ...scrollData } = version;
      
      // Update the scroll with version data
      await this.updateScroll(scrollId, scrollData);
      
      console.log(`✅ Restored ${scrollId} to version ${versionNumber}`);
      return scrollData;
    } catch (error) {
      console.error('❌ Error restoring version:', error);
      throw error;
    }
  }

  async deleteScroll(scrollId) {
    const data = await this.getData();
    const scrollIndex = data.scrolls.findIndex(s => s.id === scrollId);
    
    if (scrollIndex === -1) {
      throw new Error(`Scroll ${scrollId} not found`);
    }
    
    data.scrolls = data.scrolls.filter(s => s.id !== scrollId);
    data.statistics = this.calculateStatistics(data.scrolls);
    await this.saveData(data);
    
    return true;
  }

  calculateStatistics(scrolls) {
    return {
      total: scrolls.length,
      active: scrolls.filter(s => s.status === 'active').length,
      pending: scrolls.filter(s => s.status === 'pending').length,
      resolved: scrolls.filter(s => s.status === 'resolved').length,
      highPriority: scrolls.filter(s => s.priority === 'high').length,
      mediumPriority: scrolls.filter(s => s.priority === 'medium').length,
      lowPriority: scrolls.filter(s => s.priority === 'low').length
    };
  }

  async searchScrolls(query) {
    const data = await this.getData();
    const lowerQuery = query.toLowerCase();
    
    return data.scrolls.filter(scroll =>
      scroll.id.toLowerCase().includes(lowerQuery) ||
      scroll.title.toLowerCase().includes(lowerQuery) ||
      scroll.description.toLowerCase().includes(lowerQuery) ||
      scroll.category.toLowerCase().includes(lowerQuery) ||
      scroll.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}

// ============================================================================
// Export for Browser & Node.js
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  // Node.js export
  module.exports = {
    ScrollVerseDataManager,
    LocalStorage,
    FirestoreStorage,
    MinimaxAmbassadorManager,
    AIResearchInsightsManager,
    ActiveScrollsManager
  };
}

// Auto-initialize if in browser
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Make classes available globally
      window.ScrollVerseDataManager = ScrollVerseDataManager;
      window.MinimaxAmbassadorManager = MinimaxAmbassadorManager;
      window.AIResearchInsightsManager = AIResearchInsightsManager;
      window.ActiveScrollsManager = ActiveScrollsManager;
      
      console.log('✅ ScrollVerse Data Manager ready');
    });
  } else {
    // Make classes available globally
    window.ScrollVerseDataManager = ScrollVerseDataManager;
    window.MinimaxAmbassadorManager = MinimaxAmbassadorManager;
    window.AIResearchInsightsManager = AIResearchInsightsManager;
    window.ActiveScrollsManager = ActiveScrollsManager;
    
    console.log('✅ ScrollVerse Data Manager ready');
  }
}
