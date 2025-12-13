// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EinsteinCoin ($EINSTEIN)
 * @dev Digital treasury of knowledge token for Einstein Legacy ecosystem
 * Holders unlock mini-courses, timeless wisdom, and insights embedded cryptographically
 * 
 * Features:
 * - Knowledge treasury system
 * - Achievement bonuses for knowledge sharing
 * - Learning incentives for young learners
 * - Progressive reward model
 * 
 * @author Chais the Great (Al-Miftah)
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EinsteinCoin is ERC20, Ownable {
    // Supply parameters
    uint256 public constant MAX_SUPPLY = 137_000_000 * 10**18; // 137M - Einstein's fine structure constant approximation
    uint256 public constant LEARNING_POOL = 41_100_000 * 10**18; // 30% - Learning rewards
    uint256 public constant TEACHING_POOL = 41_100_000 * 10**18; // 30% - Teaching bonuses
    uint256 public constant QUEST_POOL = 27_400_000 * 10**18; // 20% - Quest rewards
    uint256 public constant COMMUNITY_POOL = 27_400_000 * 10**18; // 20% - Community engagement
    
    // Emission tracking
    uint256 public learningEmissions;
    uint256 public teachingEmissions;
    uint256 public questEmissions;
    uint256 public communityEmissions;
    
    // Reward parameters
    uint256 public constant BASE_LEARNING_REWARD = 10 * 10**18; // 10 EINSTEIN per lesson
    uint256 public constant BASE_TEACHING_REWARD = 25 * 10**18; // 25 EINSTEIN for teaching
    uint256 public constant QUEST_MILESTONE_REWARD = 50 * 10**18; // 50 EINSTEIN per milestone
    
    // Kid bonus system
    uint256 public constant YOUNG_LEARNER_AGE_THRESHOLD = 18;
    uint256 public constant YOUNG_LEARNER_BONUS_MULTIPLIER = 150; // 1.5x bonus (150%)
    
    // Knowledge vault - unlocked content for holders
    struct KnowledgeVault {
        string contentHash; // IPFS hash of mini-course/wisdom
        uint256 requiredBalance; // Minimum EINSTEIN tokens required to unlock
        string category; // "Physics", "Philosophy", "Problem Solving", etc.
        bool active;
    }
    
    mapping(uint256 => KnowledgeVault) public knowledgeVaults;
    uint256 public vaultCount;
    
    // User progress tracking
    mapping(address => uint256) public lessonsCompleted;
    mapping(address => uint256) public knowledgeShared;
    mapping(address => uint256) public questsCompleted;
    mapping(address => bool) public isYoungLearner;
    mapping(address => uint256) public learnerAge;
    
    // Achievement tracking
    mapping(address => mapping(string => bool)) public achievements;
    mapping(bytes32 => bool) public processedProofs;
    
    // Tawhid compliance
    bool public tawhid_compliance = true;
    
    // Events
    event TawhidDeclaration(string message, uint256 timestamp);
    event LearningRewardIssued(address indexed learner, uint256 amount, string lesson);
    event TeachingRewardIssued(address indexed teacher, uint256 amount, address indexed learner);
    event QuestRewardIssued(address indexed user, uint256 amount, uint256 questId);
    event KnowledgeVaultCreated(uint256 indexed vaultId, string category, uint256 requiredBalance);
    event KnowledgeVaultUnlocked(address indexed user, uint256 indexed vaultId, string contentHash);
    event AchievementUnlocked(address indexed user, string achievement);
    event YoungLearnerRegistered(address indexed learner, uint256 age);
    
    constructor() ERC20("Einstein Coin", "EINSTEIN") Ownable(msg.sender) {
        // Emit Tawhid declaration - recognizing the Creator
        emit TawhidDeclaration(
            "All wisdom comes from the One Creator - Einstein dedicated his life to understanding divine laws",
            block.timestamp
        );
        
        // Mint initial supply for liquidity
        _mint(msg.sender, 1_000_000 * 10**18); // 1M initial
    }
    
    /**
     * @dev Register a young learner for bonus rewards
     */
    function registerYoungLearner(address learner, uint256 age) public onlyOwner {
        require(age < YOUNG_LEARNER_AGE_THRESHOLD, "Not eligible for young learner bonus");
        require(!isYoungLearner[learner], "Already registered");
        
        isYoungLearner[learner] = true;
        learnerAge[learner] = age;
        
        emit YoungLearnerRegistered(learner, age);
    }
    
    /**
     * @dev Issue learning reward for completing a lesson
     */
    function issueLearningReward(
        address learner,
        string memory lesson,
        bytes32 proofHash
    ) public onlyOwner {
        require(!processedProofs[proofHash], "Proof already processed");
        require(learningEmissions < LEARNING_POOL, "Learning pool exhausted");
        
        uint256 rewardAmount = BASE_LEARNING_REWARD;
        
        // Apply young learner bonus
        if (isYoungLearner[learner]) {
            rewardAmount = (rewardAmount * YOUNG_LEARNER_BONUS_MULTIPLIER) / 100;
        }
        
        require(learningEmissions + rewardAmount <= LEARNING_POOL, "Insufficient learning pool");
        
        processedProofs[proofHash] = true;
        learningEmissions += rewardAmount;
        lessonsCompleted[learner]++;
        
        _mint(learner, rewardAmount);
        
        emit LearningRewardIssued(learner, rewardAmount, lesson);
        
        // Check for achievements
        _checkLearningAchievements(learner);
    }
    
    /**
     * @dev Issue teaching reward for sharing knowledge
     */
    function issueTeachingReward(
        address teacher,
        address learner,
        bytes32 proofHash
    ) public onlyOwner {
        require(!processedProofs[proofHash], "Proof already processed");
        require(teachingEmissions < TEACHING_POOL, "Teaching pool exhausted");
        
        uint256 rewardAmount = BASE_TEACHING_REWARD;
        
        // Apply bonus if teaching a young learner
        if (isYoungLearner[learner]) {
            rewardAmount = (rewardAmount * 125) / 100; // 1.25x bonus for teaching youth
        }
        
        require(teachingEmissions + rewardAmount <= TEACHING_POOL, "Insufficient teaching pool");
        
        processedProofs[proofHash] = true;
        teachingEmissions += rewardAmount;
        knowledgeShared[teacher]++;
        
        _mint(teacher, rewardAmount);
        
        emit TeachingRewardIssued(teacher, rewardAmount, learner);
        
        // Check for teaching achievements
        _checkTeachingAchievements(teacher);
    }
    
    /**
     * @dev Issue quest completion reward
     */
    function issueQuestReward(
        address user,
        uint256 questId,
        bytes32 proofHash
    ) public onlyOwner {
        require(!processedProofs[proofHash], "Proof already processed");
        require(questEmissions < QUEST_POOL, "Quest pool exhausted");
        
        uint256 rewardAmount = QUEST_MILESTONE_REWARD;
        
        require(questEmissions + rewardAmount <= QUEST_POOL, "Insufficient quest pool");
        
        processedProofs[proofHash] = true;
        questEmissions += rewardAmount;
        questsCompleted[user]++;
        
        _mint(user, rewardAmount);
        
        emit QuestRewardIssued(user, rewardAmount, questId);
        
        // Check for quest achievements
        _checkQuestAchievements(user);
    }
    
    /**
     * @dev Create a knowledge vault with unlockable content
     */
    function createKnowledgeVault(
        string memory contentHash,
        uint256 requiredBalance,
        string memory category
    ) public onlyOwner returns (uint256) {
        uint256 vaultId = vaultCount;
        vaultCount++;
        
        knowledgeVaults[vaultId] = KnowledgeVault({
            contentHash: contentHash,
            requiredBalance: requiredBalance,
            category: category,
            active: true
        });
        
        emit KnowledgeVaultCreated(vaultId, category, requiredBalance);
        
        return vaultId;
    }
    
    /**
     * @dev Check if user can unlock a knowledge vault
     */
    function canUnlockVault(address user, uint256 vaultId) public view returns (bool) {
        require(vaultId < vaultCount, "Invalid vault ID");
        KnowledgeVault memory vault = knowledgeVaults[vaultId];
        return vault.active && balanceOf(user) >= vault.requiredBalance;
    }
    
    /**
     * @dev Unlock a knowledge vault (view access to content hash)
     */
    function unlockVault(uint256 vaultId) public view returns (string memory) {
        require(canUnlockVault(msg.sender, vaultId), "Insufficient balance or inactive vault");
        
        KnowledgeVault memory vault = knowledgeVaults[vaultId];
        return vault.contentHash;
    }
    
    /**
     * @dev Get user progress
     */
    function getUserProgress(address user) public view returns (
        uint256 lessons,
        uint256 teaching,
        uint256 quests,
        bool youngLearner,
        uint256 age
    ) {
        return (
            lessonsCompleted[user],
            knowledgeShared[user],
            questsCompleted[user],
            isYoungLearner[user],
            learnerAge[user]
        );
    }
    
    /**
     * @dev Get emission statistics
     */
    function getEmissionStats() public view returns (
        uint256 learningUsed,
        uint256 teachingUsed,
        uint256 questUsed,
        uint256 communityUsed,
        uint256 learningRemaining,
        uint256 teachingRemaining,
        uint256 questRemaining,
        uint256 communityRemaining
    ) {
        return (
            learningEmissions,
            teachingEmissions,
            questEmissions,
            communityEmissions,
            LEARNING_POOL - learningEmissions,
            TEACHING_POOL - teachingEmissions,
            QUEST_POOL - questEmissions,
            COMMUNITY_POOL - communityEmissions
        );
    }
    
    /**
     * @dev Check learning achievements
     */
    function _checkLearningAchievements(address learner) private {
        if (lessonsCompleted[learner] >= 10 && !achievements[learner]["curious_mind"]) {
            achievements[learner]["curious_mind"] = true;
            emit AchievementUnlocked(learner, "curious_mind");
        }
        
        if (lessonsCompleted[learner] >= 50 && !achievements[learner]["knowledge_seeker"]) {
            achievements[learner]["knowledge_seeker"] = true;
            emit AchievementUnlocked(learner, "knowledge_seeker");
        }
        
        if (lessonsCompleted[learner] >= 100 && !achievements[learner]["einstein_scholar"]) {
            achievements[learner]["einstein_scholar"] = true;
            emit AchievementUnlocked(learner, "einstein_scholar");
        }
    }
    
    /**
     * @dev Check teaching achievements
     */
    function _checkTeachingAchievements(address teacher) private {
        if (knowledgeShared[teacher] >= 5 && !achievements[teacher]["knowledge_sharer"]) {
            achievements[teacher]["knowledge_sharer"] = true;
            emit AchievementUnlocked(teacher, "knowledge_sharer");
        }
        
        if (knowledgeShared[teacher] >= 25 && !achievements[teacher]["master_teacher"]) {
            achievements[teacher]["master_teacher"] = true;
            emit AchievementUnlocked(teacher, "master_teacher");
        }
        
        if (knowledgeShared[teacher] >= 100 && !achievements[teacher]["einstein_mentor"]) {
            achievements[teacher]["einstein_mentor"] = true;
            emit AchievementUnlocked(teacher, "einstein_mentor");
        }
    }
    
    /**
     * @dev Check quest achievements
     */
    function _checkQuestAchievements(address user) private {
        if (questsCompleted[user] >= 5 && !achievements[user]["quest_initiate"]) {
            achievements[user]["quest_initiate"] = true;
            emit AchievementUnlocked(user, "quest_initiate");
        }
        
        if (questsCompleted[user] >= 20 && !achievements[user]["quest_master"]) {
            achievements[user]["quest_master"] = true;
            emit AchievementUnlocked(user, "quest_master");
        }
    }
    
    /**
     * @dev Check if user has achievement
     */
    function hasAchievement(address user, string memory achievement) public view returns (bool) {
        return achievements[user][achievement];
    }
}
