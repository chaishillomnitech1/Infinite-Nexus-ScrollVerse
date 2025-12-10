// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AngelCurrency ($ANGEL)
 * @dev ERC-20 token for the Archangel Genesis ecosystem
 * Emissions controlled by stellar alignment and lunar cycles (Banneker mechanics)
 * 
 * @author Chais the Great (Al-Miftah)
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AngelCurrency is ERC20, Ownable {
    // Supply parameters
    uint256 public constant MAX_SUPPLY = 1000000000 * 10**18; // 1 billion tokens
    uint256 public constant BANNEKER_WEIGHT = 300000000 * 10**18; // 30% - Banneker scheduling
    uint256 public constant JOHNSON_WEIGHT = 300000000 * 10**18; // 30% - Johnson trajectory
    uint256 public constant FULLER_WEIGHT = 200000000 * 10**18; // 20% - Fuller calculations
    uint256 public constant COMMUNITY_WEIGHT = 200000000 * 10**18; // 20% - Community rewards
    
    // Emission tracking
    uint256 public banneker_emissions;
    uint256 public johnson_emissions;
    uint256 public fuller_emissions;
    uint256 public community_emissions;
    
    // Lunar cycle mechanics
    uint256 public lastEmissionTime;
    uint256 public constant SAROS_CYCLE = 223; // Saros cycle in months (~18 years)
    uint256 public constant LUNAR_MONTH = 29.53 days; // Average lunar month
    
    // Stellar alignment tracking
    bool public stellarAlignmentActive;
    uint256 public nextAlignmentTime;
    
    // Tawhid compliance
    bool public tawhid_compliance = true;
    
    // Events
    event TawhidDeclaration(string message, uint256 timestamp);
    event BannekerEmission(address indexed recipient, uint256 amount, uint256 timestamp);
    event JohnsonEmission(address indexed recipient, uint256 amount, uint256 timestamp);
    event FullerEmission(address indexed recipient, uint256 amount, uint256 timestamp);
    event StellarAlignmentDetected(uint256 timestamp, uint256 nextAlignment);
    event LunarCycleEmission(uint256 amount, uint256 cycleNumber);
    
    constructor() ERC20("Angel Currency", "ANGEL") Ownable(msg.sender) {
        lastEmissionTime = block.timestamp;
        nextAlignmentTime = block.timestamp + 30 days; // Initial alignment in 30 days
        
        emit TawhidDeclaration(
            "All currency flows under divine decree - Remember the One Creator",
            block.timestamp
        );
    }
    
    /**
     * @dev Emit tokens based on Banneker stellar scheduling
     * @param recipient Address to receive tokens
     * @param amount Amount to emit
     */
    function emitBannekerScheduled(address recipient, uint256 amount) public onlyOwner {
        require(banneker_emissions + amount <= BANNEKER_WEIGHT, "Banneker allocation exceeded");
        require(stellarAlignmentActive, "Stellar alignment not active");
        
        banneker_emissions += amount;
        _mint(recipient, amount);
        
        emit BannekerEmission(recipient, amount, block.timestamp);
        emit TawhidDeclaration(
            "Emission aligned with celestial mechanics - Praise to the Creator of the heavens",
            block.timestamp
        );
    }
    
    /**
     * @dev Emit tokens based on Johnson trajectory calculations
     * @param recipient Address to receive tokens
     * @param amount Amount to emit
     */
    function emitJohnsonTrajectory(address recipient, uint256 amount) public onlyOwner {
        require(johnson_emissions + amount <= JOHNSON_WEIGHT, "Johnson allocation exceeded");
        
        johnson_emissions += amount;
        _mint(recipient, amount);
        
        emit JohnsonEmission(recipient, amount, block.timestamp);
    }
    
    /**
     * @dev Emit tokens based on Fuller calculations
     * @param recipient Address to receive tokens
     * @param amount Amount to emit
     */
    function emitFullerCalculation(address recipient, uint256 amount) public onlyOwner {
        require(fuller_emissions + amount <= FULLER_WEIGHT, "Fuller allocation exceeded");
        
        fuller_emissions += amount;
        _mint(recipient, amount);
        
        emit FullerEmission(recipient, amount, block.timestamp);
    }
    
    /**
     * @dev Emit community rewards
     * @param recipient Address to receive tokens
     * @param amount Amount to emit
     */
    function emitCommunityReward(address recipient, uint256 amount) public onlyOwner {
        require(community_emissions + amount <= COMMUNITY_WEIGHT, "Community allocation exceeded");
        
        community_emissions += amount;
        _mint(recipient, amount);
    }
    
    /**
     * @dev Activate stellar alignment for emissions
     */
    function activateStellarAlignment() public onlyOwner {
        require(block.timestamp >= nextAlignmentTime, "Alignment time not reached");
        
        stellarAlignmentActive = true;
        nextAlignmentTime = block.timestamp + 30 days; // Next alignment in 30 days
        
        emit StellarAlignmentDetected(block.timestamp, nextAlignmentTime);
    }
    
    /**
     * @dev Deactivate stellar alignment
     */
    function deactivateStellarAlignment() public onlyOwner {
        stellarAlignmentActive = false;
    }
    
    /**
     * @dev Calculate lunar cycle emission amount
     * @return uint256 Emission amount based on lunar cycle
     */
    function calculateLunarEmission() public view returns (uint256) {
        uint256 cyclesPassed = (block.timestamp - lastEmissionTime) / uint256(LUNAR_MONTH);
        if (cyclesPassed == 0) return 0;
        
        // Base emission per cycle: 1000 ANGEL tokens
        return cyclesPassed * 1000 * 10**18;
    }
    
    /**
     * @dev Process lunar cycle emission
     */
    function processLunarEmission(address recipient) public onlyOwner {
        uint256 amount = calculateLunarEmission();
        require(amount > 0, "No emission available");
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply exceeded");
        
        uint256 cyclesPassed = (block.timestamp - lastEmissionTime) / uint256(LUNAR_MONTH);
        lastEmissionTime = block.timestamp;
        
        _mint(recipient, amount);
        emit LunarCycleEmission(amount, cyclesPassed);
    }
    
    /**
     * @dev Get emission statistics
     */
    function getEmissionStats() public view returns (
        uint256 bannekerUsed,
        uint256 johnsonUsed,
        uint256 fullerUsed,
        uint256 communityUsed,
        uint256 bannekerRemaining,
        uint256 johnsonRemaining,
        uint256 fullerRemaining,
        uint256 communityRemaining
    ) {
        return (
            banneker_emissions,
            johnson_emissions,
            fuller_emissions,
            community_emissions,
            BANNEKER_WEIGHT - banneker_emissions,
            JOHNSON_WEIGHT - johnson_emissions,
            FULLER_WEIGHT - fuller_emissions,
            COMMUNITY_WEIGHT - community_emissions
        );
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title AngelCurrency
 * @dev $ANGEL - Angelic-inspired utility token for service rewards
 * 
 * Features:
 * - Service-action proof minting
 * - Integration with Archangel Genesis NFTs
 * - On-chain governance for supply triggers
 * - Reward distribution mechanics
 */
contract AngelCurrency is ERC20, Ownable {
    
    // ============================================================================
    // State Variables
    // ============================================================================
    
    uint256 public constant MAX_SUPPLY = 528_000_000 * 10**18; // 528 million (sacred number)
    uint256 public constant INITIAL_REWARD = 100 * 10**18; // 100 ANGEL per service action
    
    address public archangelNFTContract; // Reference to ArchangelGenesisNFT
    
    mapping(address => bool) public serviceProviders; // Authorized minters
    mapping(bytes32 => bool) public processedProofs; // Prevent double-minting
    mapping(uint256 => uint256) public nftRewardsClaimed; // Track rewards per NFT
    
    // Events
    event ServiceRewardMinted(
        address indexed recipient,
        uint256 amount,
        bytes32 proofHash,
        uint256 nftTokenId,
        string actionType
    );
    
    event ServiceProviderUpdated(
        address indexed provider,
        bool authorized
    );
    
    event ArchangelNFTContractSet(
        address indexed contractAddress
    );
    
    // ============================================================================
    // Constructor
    // ============================================================================
    
    constructor() ERC20("Angel Currency", "ANGEL") Ownable(msg.sender) {
        // Mint initial supply to deployer for liquidity and distribution
        _mint(msg.sender, 1_000_000 * 10**18); // 1M initial
    }
    
    // ============================================================================
    // Configuration Functions
    // ============================================================================
    
    /**
     * @dev Set the Archangel NFT contract address
     */
    function setArchangelNFTContract(address _archangelContract) public onlyOwner {
        require(_archangelContract != address(0), "Invalid contract address");
        archangelNFTContract = _archangelContract;
        emit ArchangelNFTContractSet(_archangelContract);
    }
    
    /**
     * @dev Add or remove service provider authorization
     */
    function setServiceProvider(address provider, bool authorized) public onlyOwner {
        serviceProviders[provider] = authorized;
        emit ServiceProviderUpdated(provider, authorized);
    }
    
    // ============================================================================
    // Minting Functions
    // ============================================================================
    
    /**
     * @dev Mint tokens as reward for verified service action
     * @param recipient Address receiving the reward
     * @param proofHash Unique hash proving service completion
     * @param nftTokenId Associated Archangel NFT ID (0 if not NFT-specific)
     * @param actionType Description of service action
     * @param multiplier Reward multiplier from NFT (100 = 1.0x)
     */
    function mintServiceReward(
        address recipient,
        bytes32 proofHash,
        uint256 nftTokenId,
        string memory actionType,
        uint256 multiplier
    ) public {
        require(
            serviceProviders[msg.sender] || msg.sender == owner(),
            "Not authorized service provider"
        );
        require(!processedProofs[proofHash], "Proof already processed");
        require(recipient != address(0), "Invalid recipient");
        require(multiplier >= 100 && multiplier <= 500, "Invalid multiplier");
        
        // Calculate reward amount with multiplier
        uint256 baseReward = INITIAL_REWARD;
        uint256 rewardAmount = (baseReward * multiplier) / 100;
        
        // Check max supply
        require(totalSupply() + rewardAmount <= MAX_SUPPLY, "Max supply reached");
        
        // Mark proof as processed
        processedProofs[proofHash] = true;
        
        // Track NFT rewards if applicable
        if (nftTokenId > 0) {
            nftRewardsClaimed[nftTokenId] += rewardAmount;
        }
        
        // Mint reward
        _mint(recipient, rewardAmount);
        
        emit ServiceRewardMinted(
            recipient,
            rewardAmount,
            proofHash,
            nftTokenId,
            actionType
        );
    }
    
    /**
     * @dev Batch mint rewards for multiple recipients
     */
    function batchMintServiceRewards(
        address[] memory recipients,
        bytes32[] memory proofHashes,
        uint256[] memory nftTokenIds,
        string[] memory actionTypes,
        uint256[] memory multipliers
    ) public {
        require(
            recipients.length == proofHashes.length &&
            proofHashes.length == nftTokenIds.length &&
            nftTokenIds.length == actionTypes.length &&
            actionTypes.length == multipliers.length,
            "Array length mismatch"
        );
        
        for (uint256 i = 0; i < recipients.length; i++) {
            mintServiceReward(
                recipients[i],
                proofHashes[i],
                nftTokenIds[i],
                actionTypes[i],
                multipliers[i]
            );
        }
    }
    
    // ============================================================================
    // View Functions
    // ============================================================================
    
    /**
     * @dev Check if a proof has been processed
     */
    function isProofProcessed(bytes32 proofHash) public view returns (bool) {
        return processedProofs[proofHash];
    }
    
    /**
     * @dev Get total rewards claimed for an NFT
     */
    function getNFTRewardsClaimed(uint256 nftTokenId) public view returns (uint256) {
        return nftRewardsClaimed[nftTokenId];
    }
    
    /**
     * @dev Calculate remaining mintable supply
     */
    function remainingSupply() public view returns (uint256) {
        return MAX_SUPPLY - totalSupply();
    }
    
    /**
     * @dev Check if address is authorized service provider
     */
    function isServiceProvider(address provider) public view returns (bool) {
        return serviceProviders[provider];
    }
}
