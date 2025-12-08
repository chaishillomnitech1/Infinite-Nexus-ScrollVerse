// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title AkashicFrequencyNFT
 * @dev NFT contract with Akashic Frequency attributes and evolution dynamics
 * 
 * Features:
 * - 528Hz base frequency alignment
 * - Sacred geometry integration
 * - Token embodiment evolution
 * - Consciousness level tracking
 * - Dimensional access control
 */
contract AkashicFrequencyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    // ============================================================================
    // State Variables
    // ============================================================================
    
    Counters.Counter private _tokenIds;
    
    uint256 public constant MAX_SUPPLY = 528; // Sacred number aligned with 528Hz
    uint256 public constant BASE_FREQUENCY = 528; // 528Hz - Miracle Tone
    uint256 public constant PHI_RATIO = 1618; // Golden Ratio * 1000
    
    // Akashic Attributes for each token
    struct AkashicAttributes {
        uint256 frequencyLevel;        // 528Hz, 639Hz, 741Hz, 852Hz, 963Hz
        uint256 ethericalDensity;      // 0-1000 (representing 0.0-1.0)
        uint256 consciousnessLevel;    // 0-1000 (representing 0.0-1.0)
        string auricAlignment;         // "Divine", "Cosmic", "Crystalline", "Etheric"
        uint8[] dimensionalAccess;     // Array of accessible dimensions [3,5,7,9,11]
        string sacredGeometry;         // "FlowerOfLife", "MetatronsCube", "GoldenSpiral"
        string evolutionStage;         // "Awakening", "Alignment", "Embodiment", "Transcendence", "Ascension"
        uint256 evolutionVelocity;     // Growth rate (0-1000)
        bool isActive;                 // Whether the token is actively evolving
    }
    
    // Pleiades Cosmic Attributes
    struct PleiadesAttributes {
        string starName;               // "Alcyone", "Atlas", "Electra", "Maia", "Merope", "Taygeta", "Pleione"
        string starDesignation;        // e.g., "Eta Tauri"
        uint256 resonanceFrequency;    // Star's sacred frequency
        string cosmicAlignment;        // "Unity", "Foundation", "Illumination", etc.
        string archetype;              // Star's archetype
        uint256 luminosity;            // 0-1000 (representing 0.0-1.0)
        string clusterMembership;      // "Seven Sisters"
        bool isAligned;                // Whether token is aligned with Pleiades
    }
    
    // Token Embodiment tracking
    struct TokenEmbodiment {
        string scrollSoulId;
        uint256 createdAt;
        uint256 lastEvolved;
        uint256 evolutionCount;
        uint256 resonanceScore;        // 0-1000
        string[] prophecyLinks;
    }
    
    // Mappings
    mapping(uint256 => AkashicAttributes) public akashicAttributes;
    mapping(uint256 => PleiadesAttributes) public pleiadesAttributes;
    mapping(uint256 => TokenEmbodiment) public tokenEmbodiments;
    mapping(uint256 => string) public tokenIPFSHashes;
    
    // Events
    event TokenMinted(
        uint256 indexed tokenId,
        address indexed owner,
        uint256 frequencyLevel,
        string auricAlignment
    );
    
    event TokenEvolved(
        uint256 indexed tokenId,
        string fromStage,
        string toStage,
        uint256 newConsciousnessLevel
    );
    
    event FrequencyAligned(
        uint256 indexed tokenId,
        uint256 newFrequency,
        uint256 timestamp
    );
    
    event EmbodimentCreated(
        uint256 indexed tokenId,
        string scrollSoulId,
        uint256 timestamp
    );
    
    event PleiadesAligned(
        uint256 indexed tokenId,
        string starName,
        uint256 resonanceFrequency,
        uint256 timestamp
    );
    
    // ============================================================================
    // Constructor
    // ============================================================================
    
    constructor() ERC721("Akashic Frequency NFT", "AKASHIC") Ownable(msg.sender) {}
    
    // ============================================================================
    // Minting Functions
    // ============================================================================
    
    /**
     * @dev Mint a new Akashic NFT with specified attributes
     */
    function mintAkashicNFT(
        address recipient,
        string memory tokenURI,
        string memory ipfsHash,
        uint256 frequencyLevel,
        uint256 ethericalDensity,
        string memory auricAlignment,
        uint8[] memory dimensionalAccess,
        string memory sacredGeometry
    ) public onlyOwner returns (uint256) {
        require(_tokenIds.current() < MAX_SUPPLY, "Max supply reached");
        require(frequencyLevel >= 396 && frequencyLevel <= 963, "Invalid frequency");
        require(ethericalDensity <= 1000, "Invalid etherical density");
        require(dimensionalAccess.length >= 3 && dimensionalAccess.length <= 9, "Invalid dimensional access");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(recipient, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        // Set Akashic attributes
        akashicAttributes[newTokenId] = AkashicAttributes({
            frequencyLevel: frequencyLevel,
            ethericalDensity: ethericalDensity,
            consciousnessLevel: ethericalDensity, // Initial consciousness equals etherical density
            auricAlignment: auricAlignment,
            dimensionalAccess: dimensionalAccess,
            sacredGeometry: sacredGeometry,
            evolutionStage: "Awakening",
            evolutionVelocity: 100, // 0.1 * 1000
            isActive: true
        });
        
        // Store IPFS hash
        tokenIPFSHashes[newTokenId] = ipfsHash;
        
        emit TokenMinted(newTokenId, recipient, frequencyLevel, auricAlignment);
        
        return newTokenId;
    }
    
    /**
     * @dev Create token embodiment linking NFT to ScrollSoul
     */
    function createEmbodiment(
        uint256 tokenId,
        string memory scrollSoulId
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(bytes(scrollSoulId).length > 0, "Invalid ScrollSoul ID");
        require(tokenEmbodiments[tokenId].createdAt == 0, "Embodiment already exists");
        
        string[] memory emptyProphecies;
        
        tokenEmbodiments[tokenId] = TokenEmbodiment({
            scrollSoulId: scrollSoulId,
            createdAt: block.timestamp,
            lastEvolved: block.timestamp,
            evolutionCount: 0,
            resonanceScore: 750, // Initial resonance 0.75
            prophecyLinks: emptyProphecies
        });
        
        emit EmbodimentCreated(tokenId, scrollSoulId, block.timestamp);
    }
    
    // ============================================================================
    // Evolution Functions
    // ============================================================================
    
    /**
     * @dev Evolve token to next stage
     */
    function evolveToken(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(akashicAttributes[tokenId].isActive, "Token not active");
        require(tokenEmbodiments[tokenId].createdAt > 0, "Embodiment not created");
        
        AkashicAttributes storage attrs = akashicAttributes[tokenId];
        TokenEmbodiment storage embodiment = tokenEmbodiments[tokenId];
        
        // Calculate evolution eligibility (must wait minimum time)
        require(block.timestamp >= embodiment.lastEvolved + 7 days, "Evolution cooldown active");
        
        string memory fromStage = attrs.evolutionStage;
        string memory toStage = _getNextEvolutionStage(fromStage);
        
        // Update consciousness level
        uint256 velocityBonus = attrs.evolutionVelocity;
        attrs.consciousnessLevel = _min(1000, attrs.consciousnessLevel + velocityBonus);
        
        // Update evolution stage
        attrs.evolutionStage = toStage;
        
        // Update embodiment
        embodiment.lastEvolved = block.timestamp;
        embodiment.evolutionCount++;
        embodiment.resonanceScore = _min(1000, embodiment.resonanceScore + 50);
        
        emit TokenEvolved(tokenId, fromStage, toStage, attrs.consciousnessLevel);
    }
    
    /**
     * @dev Align token to new frequency
     */
    function alignFrequency(uint256 tokenId, uint256 newFrequency) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(newFrequency >= 396 && newFrequency <= 963, "Invalid frequency");
        require(_isValidSacredFrequency(newFrequency), "Not a sacred frequency");
        
        akashicAttributes[tokenId].frequencyLevel = newFrequency;
        
        emit FrequencyAligned(tokenId, newFrequency, block.timestamp);
    }
    
    /**
     * @dev Add prophecy link to token embodiment
     */
    function addProphecyLink(uint256 tokenId, string memory prophecyId) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(tokenEmbodiments[tokenId].createdAt > 0, "Embodiment not created");
        
        tokenEmbodiments[tokenId].prophecyLinks.push(prophecyId);
    }
    
    /**
     * @dev Align token with Pleiades star
     * 
     * Note: This function allows manual alignment. For automated alignment based on
     * frequency matching, use the PleiadesCosmicBridge off-chain module which provides
     * the complete integration logic and then call this function to record on-chain.
     * 
     * The frequency-based assignment logic in the bridge module ensures proper star
     * selection based on token attributes. This function should typically be called
     * by trusted contracts or after off-chain validation via the bridge module.
     */
    function alignWithPleiades(
        uint256 tokenId,
        string memory starName,
        string memory starDesignation,
        uint256 resonanceFrequency,
        string memory cosmicAlignment,
        string memory archetype,
        uint256 luminosity
    ) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(_isValidSacredFrequency(resonanceFrequency), "Not a sacred frequency");
        require(luminosity <= 1000, "Invalid luminosity");
        
        pleiadesAttributes[tokenId] = PleiadesAttributes({
            starName: starName,
            starDesignation: starDesignation,
            resonanceFrequency: resonanceFrequency,
            cosmicAlignment: cosmicAlignment,
            archetype: archetype,
            luminosity: luminosity,
            clusterMembership: "Seven Sisters",
            isAligned: true
        });
        
        emit PleiadesAligned(tokenId, starName, resonanceFrequency, block.timestamp);
    }
    
    // ============================================================================
    // View Functions
    // ============================================================================
    
    /**
     * @dev Get complete Akashic attributes for a token
     */
    function getAkashicAttributes(uint256 tokenId) public view returns (
        uint256 frequencyLevel,
        uint256 ethericalDensity,
        uint256 consciousnessLevel,
        string memory auricAlignment,
        uint8[] memory dimensionalAccess,
        string memory sacredGeometry,
        string memory evolutionStage,
        uint256 evolutionVelocity,
        bool isActive
    ) {
        AkashicAttributes memory attrs = akashicAttributes[tokenId];
        return (
            attrs.frequencyLevel,
            attrs.ethericalDensity,
            attrs.consciousnessLevel,
            attrs.auricAlignment,
            attrs.dimensionalAccess,
            attrs.sacredGeometry,
            attrs.evolutionStage,
            attrs.evolutionVelocity,
            attrs.isActive
        );
    }
    
    /**
     * @dev Get token embodiment details
     */
    function getTokenEmbodiment(uint256 tokenId) public view returns (
        string memory scrollSoulId,
        uint256 createdAt,
        uint256 lastEvolved,
        uint256 evolutionCount,
        uint256 resonanceScore,
        uint256 prophecyCount
    ) {
        TokenEmbodiment memory embodiment = tokenEmbodiments[tokenId];
        return (
            embodiment.scrollSoulId,
            embodiment.createdAt,
            embodiment.lastEvolved,
            embodiment.evolutionCount,
            embodiment.resonanceScore,
            embodiment.prophecyLinks.length
        );
    }
    
    /**
     * @dev Get Pleiades attributes for a token
     */
    function getPleiadesAttributes(uint256 tokenId) public view returns (
        string memory starName,
        string memory starDesignation,
        uint256 resonanceFrequency,
        string memory cosmicAlignment,
        string memory archetype,
        uint256 luminosity,
        string memory clusterMembership,
        bool isAligned
    ) {
        PleiadesAttributes memory pleiades = pleiadesAttributes[tokenId];
        return (
            pleiades.starName,
            pleiades.starDesignation,
            pleiades.resonanceFrequency,
            pleiades.cosmicAlignment,
            pleiades.archetype,
            pleiades.luminosity,
            pleiades.clusterMembership,
            pleiades.isAligned
        );
    }
    
    /**
     * @dev Get IPFS hash for token metadata
     */
    function getTokenIPFSHash(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenIPFSHashes[tokenId];
    }
    
    /**
     * @dev Get current token supply
     */
    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
    
    /**
     * @dev Check if frequency is valid sacred frequency
     */
    function isValidSacredFrequency(uint256 frequency) public pure returns (bool) {
        return _isValidSacredFrequency(frequency);
    }
    
    // ============================================================================
    // Internal Helper Functions
    // ============================================================================
    
    /**
     * @dev Get next evolution stage
     */
    function _getNextEvolutionStage(string memory currentStage) internal pure returns (string memory) {
        if (_stringsEqual(currentStage, "Awakening")) return "Alignment";
        if (_stringsEqual(currentStage, "Alignment")) return "Embodiment";
        if (_stringsEqual(currentStage, "Embodiment")) return "Transcendence";
        if (_stringsEqual(currentStage, "Transcendence")) return "Ascension";
        return "Ascension"; // Max stage
    }
    
    /**
     * @dev Check if frequency is a valid sacred frequency
     */
    function _isValidSacredFrequency(uint256 frequency) internal pure returns (bool) {
        return (
            frequency == 396 ||  // Liberation
            frequency == 417 ||  // Undoing
            frequency == 528 ||  // Miracle/Transformation
            frequency == 639 ||  // Connection
            frequency == 741 ||  // Awakening
            frequency == 852 ||  // Spiritual Order
            frequency == 963     // Divine Connection
        );
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
