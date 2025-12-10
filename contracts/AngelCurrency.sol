// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

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
