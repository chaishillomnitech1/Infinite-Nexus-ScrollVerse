// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HEALToken ($HEAL)
 * @dev ERC-20 token for the ERP8888 ecosystem
 * HEAL = Harmonic Energy Abundance Legacy
 * Rewards for financial mastery achievement and community engagement
 * 
 * Integration with Angel Currency for omniversal token system
 * 
 * @author Chais the Great (Al-Miftah)
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract HEALToken is ERC20, Ownable {
    // Token parameters
    uint256 public constant MAX_SUPPLY = 8888888888 * 10**18; // 8.888B tokens (8888 theme)
    uint256 public constant FREQUENCY_REWARD_POOL = 2666666666 * 10**18; // 30% - Frequency alignment rewards
    uint256 public constant MASTERY_REWARD_POOL = 2666666666 * 10**18; // 30% - Financial mastery achievements
    uint256 public constant COMMUNITY_POOL = 2222222222 * 10**18; // 25% - Community incentives
    uint256 public constant TRIBUTE_POOL = 1333333330 * 10**18; // 15% - Tribute holder bonuses
    
    // Emission tracking
    uint256 public frequencyRewardsEmitted;
    uint256 public masteryRewardsEmitted;
    uint256 public communityRewardsEmitted;
    uint256 public tributeRewardsEmitted;
    
    // 528Hz frequency mechanics
    uint256 public constant FREQUENCY_528HZ = 528;
    uint256 public lastEmissionTime;
    uint256 public emissionCycle;
    
    // Reward multipliers based on alignment
    mapping(address => uint256) public alignmentMultiplier; // 100 = 1x, 200 = 2x, etc.
    mapping(address => uint256) public masteryLevel;
    mapping(address => bool) public isTributeHolder;
    
    // Tawhid compliance
    bool public tawhid_compliance = true;
    
    // Events
    event TawhidDeclaration(string message, uint256 timestamp);
    event FrequencyReward(address indexed recipient, uint256 amount, uint256 frequency);
    event MasteryReward(address indexed recipient, uint256 amount, uint256 masteryLevel);
    event CommunityReward(address indexed recipient, uint256 amount, string reason);
    event TributeBonus(address indexed recipient, uint256 amount);
    event AlignmentMultiplierUpdated(address indexed user, uint256 newMultiplier);
    
    constructor() ERC20("HEAL Token", "HEAL") Ownable(msg.sender) {
        lastEmissionTime = block.timestamp;
        emissionCycle = 0;
        
        emit TawhidDeclaration(
            "All healing and abundance flows from the One Creator - Remember and give thanks",
            block.timestamp
        );
    }
    
    /**
     * @dev Reward users for frequency alignment (528Hz practices)
     */
    function rewardFrequencyAlignment(address recipient, uint256 amount) public onlyOwner {
        require(frequencyRewardsEmitted + amount <= FREQUENCY_REWARD_POOL, "Frequency pool exhausted");
        require(recipient != address(0), "Invalid recipient");
        
        // Apply alignment multiplier
        uint256 multiplier = alignmentMultiplier[recipient] > 0 ? alignmentMultiplier[recipient] : 100;
        uint256 rewardAmount = (amount * multiplier) / 100;
        
        frequencyRewardsEmitted += rewardAmount;
        _mint(recipient, rewardAmount);
        
        emit FrequencyReward(recipient, rewardAmount, FREQUENCY_528HZ);
        emit TawhidDeclaration(
            "Frequency alignment brings divine blessings - Praise the Creator",
            block.timestamp
        );
    }
    
    /**
     * @dev Reward users for financial mastery achievements
     */
    function rewardMastery(address recipient, uint256 amount, uint256 level) public onlyOwner {
        require(masteryRewardsEmitted + amount <= MASTERY_REWARD_POOL, "Mastery pool exhausted");
        require(recipient != address(0), "Invalid recipient");
        
        masteryLevel[recipient] = level;
        masteryRewardsEmitted += amount;
        _mint(recipient, amount);
        
        emit MasteryReward(recipient, amount, level);
        emit TawhidDeclaration(
            "Financial mastery is a blessing from the Creator - Use it wisely",
            block.timestamp
        );
    }
    
    /**
     * @dev Reward community engagement and success stories
     */
    function rewardCommunity(address recipient, uint256 amount, string memory reason) public onlyOwner {
        require(communityRewardsEmitted + amount <= COMMUNITY_POOL, "Community pool exhausted");
        require(recipient != address(0), "Invalid recipient");
        
        communityRewardsEmitted += amount;
        _mint(recipient, amount);
        
        emit CommunityReward(recipient, amount, reason);
    }
    
    /**
     * @dev Special bonus for tribute token holders (08-28-1978 commemorative)
     */
    function rewardTributeHolder(address recipient, uint256 amount) public onlyOwner {
        require(tributeRewardsEmitted + amount <= TRIBUTE_POOL, "Tribute pool exhausted");
        require(recipient != address(0), "Invalid recipient");
        require(isTributeHolder[recipient], "Not a tribute holder");
        
        // Tribute holders get 2x multiplier
        uint256 bonusAmount = amount * 2;
        
        tributeRewardsEmitted += bonusAmount;
        _mint(recipient, bonusAmount);
        
        emit TributeBonus(recipient, bonusAmount);
        emit TawhidDeclaration(
            "Special blessing for those who honor sacred timing - 08-28-1978",
            block.timestamp
        );
    }
    
    /**
     * @dev Set tribute holder status
     */
    function setTributeHolder(address holder, bool status) public onlyOwner {
        isTributeHolder[holder] = status;
    }
    
    /**
     * @dev Update alignment multiplier based on user behavior
     */
    function updateAlignmentMultiplier(address user, uint256 multiplier) public onlyOwner {
        require(multiplier >= 100 && multiplier <= 300, "Multiplier must be 1x-3x (100-300)");
        
        alignmentMultiplier[user] = multiplier;
        
        emit AlignmentMultiplierUpdated(user, multiplier);
    }
    
    /**
     * @dev Batch reward multiple users (for challenges/quests completion)
     */
    function batchReward(
        address[] memory recipients,
        uint256[] memory amounts,
        string memory poolType
    ) public onlyOwner {
        require(recipients.length == amounts.length, "Array length mismatch");
        
        for (uint256 i = 0; i < recipients.length; i++) {
            if (keccak256(bytes(poolType)) == keccak256(bytes("community"))) {
                rewardCommunity(recipients[i], amounts[i], "Batch reward");
            } else if (keccak256(bytes(poolType)) == keccak256(bytes("mastery"))) {
                rewardMastery(recipients[i], amounts[i], 0);
            }
        }
    }
    
    /**
     * @dev Calculate emission cycle based on 528Hz frequency
     */
    function calculateEmissionCycle() public view returns (uint256) {
        // Emission cycle aligned with 528Hz: every 528 hours (~22 days)
        uint256 hoursSinceLastEmission = (block.timestamp - lastEmissionTime) / 3600;
        return hoursSinceLastEmission / FREQUENCY_528HZ;
    }
    
    /**
     * @dev Get remaining rewards in each pool
     */
    function getRemainingRewards() public view returns (
        uint256 frequency,
        uint256 mastery,
        uint256 community,
        uint256 tribute
    ) {
        return (
            FREQUENCY_REWARD_POOL - frequencyRewardsEmitted,
            MASTERY_REWARD_POOL - masteryRewardsEmitted,
            COMMUNITY_POOL - communityRewardsEmitted,
            TRIBUTE_POOL - tributeRewardsEmitted
        );
    }
    
    /**
     * @dev Get user reward status
     */
    function getUserRewardStatus(address user) public view returns (
        uint256 multiplier,
        uint256 level,
        bool tributeStatus,
        uint256 balance
    ) {
        return (
            alignmentMultiplier[user] > 0 ? alignmentMultiplier[user] : 100,
            masteryLevel[user],
            isTributeHolder[user],
            balanceOf(user)
        );
    }
    
    /**
     * @dev Emergency pause mechanism (only for critical issues)
     */
    function emergencyPause() public onlyOwner {
        // In a production contract, implement pausable pattern
        emit TawhidDeclaration(
            "System paused for maintenance - Trust in divine timing",
            block.timestamp
        );
    }
}
