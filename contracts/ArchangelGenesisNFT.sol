// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title ArchangelGenesisNFT
 * @dev Genesis NFT contract for Archangels Michael, Raphael, and Gabriel
 * 
 * Features:
 * - Immutable core lore attributes
 * - Sacred frequency integration (528Hz healing, 963Hz unity)
 * - AI persona linkage
 * - Tawhid Declaration events (monotheistic integrity)
 * - ScrollVerse alignment
 */
contract ArchangelGenesisNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    // ============================================================================
    // State Variables
    // ============================================================================
    
    Counters.Counter private _tokenIds;
    
    uint256 public constant MAX_ARCHANGELS = 3; // Michael, Raphael, Gabriel
    uint256 public constant HEALING_FREQUENCY = 528; // 528Hz - Miracle Tone
    uint256 public constant UNITY_FREQUENCY = 963; // 963Hz - Divine Connection
    
    // Immutable Core Lore Attributes
    struct ArchangelAttributes {
        string name;                    // "Michael", "Raphael", "Gabriel" (immutable)
        string roleInScrollverse;       // Primary purpose (immutable)
        uint256 frequencySignature;     // 528Hz or 963Hz (immutable)
        string linkedAIPersonaId;       // AI module identifier (immutable)
        string sacredGeometry;          // Visual motif (immutable)
        uint256 createdAt;              // Creation timestamp (immutable)
        bool isGenesis;                 // Genesis marker (immutable)
    }
    
    // Upgradable Trait System
    struct UpgradableTraits {
        uint256 rewardMultiplier;       // Starts at 100 (1.0x), upgradable
        uint256 serviceActionsCompleted; // Counter for verified actions
        uint256 narrativeAlignmentScore; // 0-1000, increases with service
        uint256 lastServiceAction;      // Timestamp of last verified action
        string evolutionStage;          // Current narrative stage
    }
    
    // Mappings
    mapping(uint256 => ArchangelAttributes) public archangelAttributes;
    mapping(uint256 => UpgradableTraits) public upgradableTraits;
    mapping(uint256 => string) public tokenIPFSHash;
    mapping(uint256 => string) public audioChimeURI;
    mapping(string => bool) public nameExists; // Prevent duplicate archangel names
    mapping(address => bool) public verifiedServiceProviders; // Authorized service validators
    
    // Events
    event ArchangelMinted(
        uint256 indexed tokenId,
        string name,
        string roleInScrollverse,
        uint256 frequencySignature,
        string linkedAIPersonaId
    );
    
    event TawhidDeclaration(
        uint256 indexed tokenId,
        string declaration,
        uint256 timestamp
    );
    
    event ServiceActionCompleted(
        uint256 indexed tokenId,
        address serviceProvider,
        string actionType,
        uint256 newNarrativeScore
    );
    
    event RewardMultiplierUpgraded(
        uint256 indexed tokenId,
        uint256 oldMultiplier,
        uint256 newMultiplier,
        uint256 timestamp
    );
    
    event NarrativeAlignmentUpgraded(
        uint256 indexed tokenId,
        string fromStage,
        string toStage,
        uint256 alignmentScore
    );
    
    // ============================================================================
    // Constructor
    // ============================================================================
    
    constructor() ERC721("Archangel Genesis NFT", "ARCHANGEL") Ownable(msg.sender) {
        // Emit Tawhid Declaration at contract creation
        emit TawhidDeclaration(
            0,
            "These tokens represent remembrance of divine principles, not worship. All glory belongs to the One Creator.",
            block.timestamp
        );
    }
    
    // ============================================================================
    // Minting Functions
    // ============================================================================
    
    /**
     * @dev Mint a Genesis Archangel NFT with immutable core attributes
     * Can only mint Michael, Raphael, or Gabriel (3 total)
     */
    function mintArchangelGenesis(
        address recipient,
        string memory name,
        string memory roleInScrollverse,
        uint256 frequencySignature,
        string memory linkedAIPersonaId,
        string memory sacredGeometry,
        string memory tokenURI,
        string memory ipfsHash,
        string memory audioChime
    ) public onlyOwner returns (uint256) {
        require(_tokenIds.current() < MAX_ARCHANGELS, "All Genesis Archangels minted");
        require(!nameExists[name], "Archangel name already exists");
        require(
            frequencySignature == HEALING_FREQUENCY || frequencySignature == UNITY_FREQUENCY,
            "Invalid sacred frequency"
        );
        require(bytes(linkedAIPersonaId).length > 0, "AI Persona ID required");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        // Set immutable core attributes
        archangelAttributes[newTokenId] = ArchangelAttributes({
            name: name,
            roleInScrollverse: roleInScrollverse,
            frequencySignature: frequencySignature,
            linkedAIPersonaId: linkedAIPersonaId,
            sacredGeometry: sacredGeometry,
            createdAt: block.timestamp,
            isGenesis: true
        });
        
        // Initialize upgradable traits
        upgradableTraits[newTokenId] = UpgradableTraits({
            rewardMultiplier: 100, // 1.0x initial
            serviceActionsCompleted: 0,
            narrativeAlignmentScore: 500, // 0.5 initial alignment
            lastServiceAction: block.timestamp,
            evolutionStage: "Genesis"
        });
        
        // Store IPFS metadata and audio
        tokenIPFSHash[newTokenId] = ipfsHash;
        audioChimeURI[newTokenId] = audioChime;
        nameExists[name] = true;
        
        emit ArchangelMinted(
            newTokenId,
            name,
            roleInScrollverse,
            frequencySignature,
            linkedAIPersonaId
        );
        
        // Emit Tawhid Declaration for each minted token
        emit TawhidDeclaration(
            newTokenId,
            string(abi.encodePacked("Token ", name, " serves as remembrance, not worship. All sovereignty belongs to the Creator.")),
            block.timestamp
        );
        
        return newTokenId;
    }
    
    // ============================================================================
    // Service Action & Upgrade Functions
    // ============================================================================
    
    /**
     * @dev Record a verified service action and update traits
     * Only callable by authorized service providers
     */
    function recordServiceAction(
        uint256 tokenId,
        string memory actionType
    ) public {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(
            verifiedServiceProviders[msg.sender] || msg.sender == owner(),
            "Not authorized service provider"
        );
        
        UpgradableTraits storage traits = upgradableTraits[tokenId];
        
        // Increment service actions
        traits.serviceActionsCompleted++;
        traits.lastServiceAction = block.timestamp;
        
        // Increase narrative alignment score (max 1000)
        uint256 scoreIncrease = 10; // Each action increases by 1%
        traits.narrativeAlignmentScore = _min(1000, traits.narrativeAlignmentScore + scoreIncrease);
        
        emit ServiceActionCompleted(
            tokenId,
            msg.sender,
            actionType,
            traits.narrativeAlignmentScore
        );
        
        // Auto-upgrade reward multiplier at milestones
        _checkAndUpgradeMultiplier(tokenId);
        
        // Check for narrative stage evolution
        _checkAndEvolveNarrative(tokenId);
    }
    
    /**
     * @dev Manually upgrade reward multiplier (owner only, for special achievements)
     */
    function upgradeRewardMultiplier(
        uint256 tokenId,
        uint256 newMultiplier
    ) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(newMultiplier > upgradableTraits[tokenId].rewardMultiplier, "Multiplier must increase");
        require(newMultiplier <= 500, "Max multiplier is 5.0x");
        
        uint256 oldMultiplier = upgradableTraits[tokenId].rewardMultiplier;
        upgradableTraits[tokenId].rewardMultiplier = newMultiplier;
        
        emit RewardMultiplierUpgraded(
            tokenId,
            oldMultiplier,
            newMultiplier,
            block.timestamp
        );
    }
    
    /**
     * @dev Add or remove verified service provider
     */
    function setServiceProvider(address provider, bool authorized) public onlyOwner {
        verifiedServiceProviders[provider] = authorized;
    }
    
    // ============================================================================
    // View Functions
    // ============================================================================
    
    /**
     * @dev Get complete immutable attributes for an Archangel
     */
    function getArchangelAttributes(uint256 tokenId) public view returns (
        string memory name,
        string memory roleInScrollverse,
        uint256 frequencySignature,
        string memory linkedAIPersonaId,
        string memory sacredGeometry,
        uint256 createdAt,
        bool isGenesis
    ) {
        ArchangelAttributes memory attrs = archangelAttributes[tokenId];
        return (
            attrs.name,
            attrs.roleInScrollverse,
            attrs.frequencySignature,
            attrs.linkedAIPersonaId,
            attrs.sacredGeometry,
            attrs.createdAt,
            attrs.isGenesis
        );
    }
    
    /**
     * @dev Get upgradable traits for an Archangel
     */
    function getUpgradableTraits(uint256 tokenId) public view returns (
        uint256 rewardMultiplier,
        uint256 serviceActionsCompleted,
        uint256 narrativeAlignmentScore,
        uint256 lastServiceAction,
        string memory evolutionStage
    ) {
        UpgradableTraits memory traits = upgradableTraits[tokenId];
        return (
            traits.rewardMultiplier,
            traits.serviceActionsCompleted,
            traits.narrativeAlignmentScore,
            traits.lastServiceAction,
            traits.evolutionStage
        );
    }
    
    /**
     * @dev Get IPFS hash for token metadata
     */
    function getTokenIPFSHash(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenIPFSHash[tokenId];
    }
    
    /**
     * @dev Get audio chime URI
     */
    function getAudioChimeURI(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return audioChimeURI[tokenId];
    }
    
    /**
     * @dev Get current token supply
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    // ============================================================================
    // Internal Helper Functions
    // ============================================================================
    
    /**
     * @dev Check and auto-upgrade reward multiplier at service action milestones
     */
    function _checkAndUpgradeMultiplier(uint256 tokenId) internal {
        UpgradableTraits storage traits = upgradableTraits[tokenId];
        uint256 actions = traits.serviceActionsCompleted;
        
        // Milestone-based upgrades
        uint256 newMultiplier = traits.rewardMultiplier;
        
        if (actions >= 100 && traits.rewardMultiplier < 200) {
            newMultiplier = 200; // 2.0x at 100 actions
        } else if (actions >= 50 && traits.rewardMultiplier < 150) {
            newMultiplier = 150; // 1.5x at 50 actions
        } else if (actions >= 25 && traits.rewardMultiplier < 125) {
            newMultiplier = 125; // 1.25x at 25 actions
        } else if (actions >= 10 && traits.rewardMultiplier < 110) {
            newMultiplier = 110; // 1.1x at 10 actions
        }
        
        if (newMultiplier > traits.rewardMultiplier) {
            uint256 oldMultiplier = traits.rewardMultiplier;
            traits.rewardMultiplier = newMultiplier;
            
            emit RewardMultiplierUpgraded(
                tokenId,
                oldMultiplier,
                newMultiplier,
                block.timestamp
            );
        }
    }
    
    /**
     * @dev Check and evolve narrative stage based on alignment score
     */
    function _checkAndEvolveNarrative(uint256 tokenId) internal {
        UpgradableTraits storage traits = upgradableTraits[tokenId];
        uint256 score = traits.narrativeAlignmentScore;
        string memory currentStage = traits.evolutionStage;
        string memory newStage = currentStage;
        
        // Stage evolution based on alignment score
        if (score >= 900 && !_stringsEqual(currentStage, "Transcendent")) {
            newStage = "Transcendent";
        } else if (score >= 750 && _stringsEqual(currentStage, "Aligned")) {
            newStage = "Ascendant";
        } else if (score >= 600 && _stringsEqual(currentStage, "Awakening")) {
            newStage = "Aligned";
        } else if (score >= 500 && _stringsEqual(currentStage, "Genesis")) {
            newStage = "Awakening";
        }
        
        if (!_stringsEqual(currentStage, newStage)) {
            traits.evolutionStage = newStage;
            
            emit NarrativeAlignmentUpgraded(
                tokenId,
                currentStage,
                newStage,
                score
            );
            
            // Emit Tawhid Declaration at major evolution milestones
            if (_stringsEqual(newStage, "Transcendent")) {
                emit TawhidDeclaration(
                    tokenId,
                    "At transcendence, we remember: All power and glory belong to the One.",
                    block.timestamp
                );
            }
        }
    }
    
    /**
     * @dev Compare two strings
     */
    function _stringsEqual(string memory a, string memory b) internal pure returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
    
    /**
     * @dev Return minimum of two numbers
     */
    function _min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }
}
