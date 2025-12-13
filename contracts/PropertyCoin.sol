// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PropertyCoin
 * @dev Digital coin for property revenue generation and value enhancement
 * Tied to property at 658 Sixth Rd, Newtonville, NJ 08346
 * 
 * Features: Self-sustained revenue streams, staking rewards, value appreciation
 * Ownership: Keleen Joy Simpson and daughters (Jada Joy Hill, Nyasia Chais Hill)
 * 
 * @author Chais the Great (Al-Miftah)
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract PropertyCoin is ERC20, Ownable, Pausable {
    // Sacred frequencies
    uint256 public constant FREQUENCY_528HZ = 528;
    uint256 public constant FREQUENCY_963HZ = 963;
    
    // Token economics
    uint256 public constant TOTAL_SUPPLY = 658_000_000 * 10**18; // 658 million tokens (property address number)
    uint256 public constant FAMILY_ALLOCATION = 40 * TOTAL_SUPPLY / 100; // 40% for family
    uint256 public constant STAKING_REWARDS = 30 * TOTAL_SUPPLY / 100; // 30% for staking
    uint256 public constant LIQUIDITY_POOL = 20 * TOTAL_SUPPLY / 100; // 20% for liquidity
    uint256 public constant DEVELOPMENT_FUND = 10 * TOTAL_SUPPLY / 100; // 10% for development
    
    // Staking parameters
    uint256 public stakingAPY = 528; // 5.28% APY (528 basis points)
    uint256 public constant STAKING_PERIOD = 30 days;
    
    // Staking tracking
    struct StakeInfo {
        uint256 amount;
        uint256 startTime;
        uint256 lastClaimTime;
        bool active;
    }
    
    mapping(address => StakeInfo) public stakes;
    uint256 public totalStaked;
    
    // Beneficiary addresses
    address public keleenJoySimpson;
    address public jadaJoyHill;
    address public nyasiaChaisHill;
    
    // Events
    event TokensStaked(address indexed staker, uint256 amount, uint256 timestamp);
    event RewardsClaimed(address indexed staker, uint256 reward, uint256 timestamp);
    event TokensUnstaked(address indexed staker, uint256 amount, uint256 timestamp);
    event BeneficiarySet(address indexed beneficiary, string name);
    
    constructor() ERC20("PropertyCoin", "PROP") Ownable(msg.sender) {
        // Mint total supply to contract for distribution
        _mint(address(this), TOTAL_SUPPLY);
    }
    
    /**
     * @dev Set beneficiary addresses
     */
    function setBeneficiaries(
        address _keleenJoySimpson,
        address _jadaJoyHill,
        address _nyasiaChaisHill
    ) public onlyOwner {
        require(_keleenJoySimpson != address(0), "Invalid Keleen address");
        require(_jadaJoyHill != address(0), "Invalid Jada address");
        require(_nyasiaChaisHill != address(0), "Invalid Nyasia address");
        
        keleenJoySimpson = _keleenJoySimpson;
        jadaJoyHill = _jadaJoyHill;
        nyasiaChaisHill = _nyasiaChaisHill;
        
        emit BeneficiarySet(_keleenJoySimpson, "Keleen Joy Simpson");
        emit BeneficiarySet(_jadaJoyHill, "Jada Joy Hill");
        emit BeneficiarySet(_nyasiaChaisHill, "Nyasia Chais Hill");
    }
    
    /**
     * @dev Distribute family allocation
     */
    function distributeFamilyAllocation() public onlyOwner {
        require(keleenJoySimpson != address(0), "Beneficiaries not set");
        
        // Mother gets 50%, daughters split 50% (25% each)
        uint256 motherShare = FAMILY_ALLOCATION * 50 / 100;
        uint256 daughterShare = FAMILY_ALLOCATION * 25 / 100;
        
        _transfer(address(this), keleenJoySimpson, motherShare);
        _transfer(address(this), jadaJoyHill, daughterShare);
        _transfer(address(this), nyasiaChaisHill, daughterShare);
    }
    
    /**
     * @dev Stake tokens for rewards
     */
    function stake(uint256 amount) public whenNotPaused {
        require(amount > 0, "Cannot stake 0 tokens");
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        
        // Claim any pending rewards first
        if (stakes[msg.sender].active) {
            claimRewards();
        }
        
        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);
        
        // Update stake info
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].startTime = block.timestamp;
        stakes[msg.sender].lastClaimTime = block.timestamp;
        stakes[msg.sender].active = true;
        
        totalStaked += amount;
        
        emit TokensStaked(msg.sender, amount, block.timestamp);
    }
    
    /**
     * @dev Calculate pending rewards
     */
    function calculateRewards(address staker) public view returns (uint256) {
        if (!stakes[staker].active) {
            return 0;
        }
        
        uint256 stakedAmount = stakes[staker].amount;
        uint256 timeStaked = block.timestamp - stakes[staker].lastClaimTime;
        
        // APY calculation: (amount * APY * time) / (365 days * 10000)
        uint256 reward = (stakedAmount * stakingAPY * timeStaked) / (365 days * 10000);
        
        return reward;
    }
    
    /**
     * @dev Claim staking rewards
     */
    function claimRewards() public whenNotPaused {
        require(stakes[msg.sender].active, "No active stake");
        
        uint256 reward = calculateRewards(msg.sender);
        require(reward > 0, "No rewards to claim");
        
        stakes[msg.sender].lastClaimTime = block.timestamp;
        
        // Transfer rewards from staking pool
        _transfer(address(this), msg.sender, reward);
        
        emit RewardsClaimed(msg.sender, reward, block.timestamp);
    }
    
    /**
     * @dev Unstake tokens
     */
    function unstake() public whenNotPaused {
        require(stakes[msg.sender].active, "No active stake");
        
        uint256 stakedAmount = stakes[msg.sender].amount;
        
        // Claim any pending rewards
        if (calculateRewards(msg.sender) > 0) {
            claimRewards();
        }
        
        // Return staked tokens
        _transfer(address(this), msg.sender, stakedAmount);
        
        // Update state
        totalStaked -= stakedAmount;
        stakes[msg.sender].active = false;
        stakes[msg.sender].amount = 0;
        
        emit TokensUnstaked(msg.sender, stakedAmount, block.timestamp);
    }
    
    /**
     * @dev Get stake info for an address
     */
    function getStakeInfo(address staker) public view returns (
        uint256 amount,
        uint256 startTime,
        uint256 lastClaimTime,
        bool active,
        uint256 pendingRewards
    ) {
        StakeInfo memory stakeInfo = stakes[staker];
        return (
            stakeInfo.amount,
            stakeInfo.startTime,
            stakeInfo.lastClaimTime,
            stakeInfo.active,
            calculateRewards(staker)
        );
    }
    
    /**
     * @dev Update staking APY (for infinite growth potential)
     */
    function updateStakingAPY(uint256 newAPY) public onlyOwner {
        require(newAPY > 0 && newAPY <= 10000, "Invalid APY");
        stakingAPY = newAPY;
    }
    
    /**
     * @dev Pause contract (emergency)
     */
    function pause() public onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause contract
     */
    function unpause() public onlyOwner {
        _unpause();
    }
}
