// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ERP8888NFT
 * @dev NFT collection commemorating the #8888 ERP system
 * Sacred date: 08-28-1978 (8+8+8+8 = 32, 3+2 = 5 = Divine Balance)
 * 
 * Features:
 * - Layered celestial and financial empowerment designs
 * - Geometric representations of balance, flow, and growth
 * - AI-driven virtual coach integration
 * - 528Hz frequency alignment
 * - Special tribute coin for birthdate commemoration
 * 
 * @author Chais the Great (Al-Miftah)
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERP8888NFT is ERC721, ERC721URIStorage, Ownable {
    // Sacred constants
    uint256 public constant FREQUENCY_528HZ = 528;
    uint256 public constant COSMIC_SIGNATURE = 8888;
    string public constant SACRED_DATE = "08-28-1978";
    
    // Collection parameters
    uint256 private _tokenIdCounter;
    uint256 public constant MAX_SUPPLY = 8888; // Sacred number
    uint256 public constant TRIBUTE_SUPPLY = 888; // Special tribute coins
    
    // NFT types
    enum NFTType { 
        BALANCE,      // Geometric balance designs
        FLOW,         // Energy circulation patterns
        GROWTH,       // Exponential expansion symbols
        TRIBUTE,      // Special birthdate commemoration
        MASTERY       // Ultimate financial sovereignty
    }
    
    // NFT attributes
    struct ERPAttributes {
        NFTType nftType;
        uint256 frequency;
        uint256 masteryLevel;      // 0-100
        uint256 alignmentScore;    // 0-100
        string coachPersona;       // AI coach personality
        uint256 mintedAt;
        bool isTribute;            // Special tribute token
        string sacredGeometry;     // Design pattern
    }
    
    // Mappings
    mapping(uint256 => ERPAttributes) public tokenAttributes;
    mapping(address => uint256[]) public userTokens;
    mapping(address => uint256) public masteryPoints;
    
    // Tribute tracking
    uint256 public tributesMinted;
    
    // Events
    event TawhidDeclaration(string message, uint256 timestamp);
    event ERP8888Minted(uint256 indexed tokenId, NFTType nftType, address indexed owner, bool isTribute);
    event MasteryLevelIncreased(uint256 indexed tokenId, uint256 newLevel);
    event AlignmentScoreUpdated(uint256 indexed tokenId, uint256 newScore);
    event CoachPersonaAssigned(uint256 indexed tokenId, string persona);
    
    constructor() ERC721("ERP8888 Financial Mastery", "ERP8888") Ownable(msg.sender) {
        _tokenIdCounter = 0;
        tributesMinted = 0;
        
        emit TawhidDeclaration(
            "Remember the One Creator - All abundance flows from divine source",
            block.timestamp
        );
    }
    
    /**
     * @dev Mint standard ERP8888 NFT
     */
    function mint(
        address to,
        NFTType nftType,
        string memory uri,
        string memory coachPersona,
        string memory sacredGeometry
    ) public onlyOwner returns (uint256) {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        require(nftType != NFTType.TRIBUTE, "Use mintTribute for tribute tokens");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        tokenAttributes[tokenId] = ERPAttributes({
            nftType: nftType,
            frequency: FREQUENCY_528HZ,
            masteryLevel: 0,
            alignmentScore: 100,
            coachPersona: coachPersona,
            mintedAt: block.timestamp,
            isTribute: false,
            sacredGeometry: sacredGeometry
        });
        
        userTokens[to].push(tokenId);
        
        emit ERP8888Minted(tokenId, nftType, to, false);
        emit CoachPersonaAssigned(tokenId, coachPersona);
        emit TawhidDeclaration(
            "Financial mastery through divine alignment - Remember the Creator",
            block.timestamp
        );
        
        return tokenId;
    }
    
    /**
     * @dev Mint special tribute token commemorating 08-28-1978
     */
    function mintTribute(
        address to,
        string memory uri,
        string memory sacredGeometry
    ) public onlyOwner returns (uint256) {
        require(tributesMinted < TRIBUTE_SUPPLY, "All tribute tokens minted");
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        tributesMinted++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        tokenAttributes[tokenId] = ERPAttributes({
            nftType: NFTType.TRIBUTE,
            frequency: FREQUENCY_528HZ,
            masteryLevel: 100, // Tribute tokens start at maximum
            alignmentScore: 100,
            coachPersona: "Libertas", // Sovereign persona
            mintedAt: block.timestamp,
            isTribute: true,
            sacredGeometry: sacredGeometry
        });
        
        userTokens[to].push(tokenId);
        masteryPoints[to] += 1000; // Bonus for tribute holders
        
        emit ERP8888Minted(tokenId, NFTType.TRIBUTE, to, true);
        emit TawhidDeclaration(
            "Tribute to divine timing: 08-28-1978 - Sacred birth under Creator's decree",
            block.timestamp
        );
        
        return tokenId;
    }
    
    /**
     * @dev Increase mastery level through completion of financial challenges
     */
    function increaseMasteryLevel(uint256 tokenId, uint256 points) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        ERPAttributes storage attrs = tokenAttributes[tokenId];
        uint256 newLevel = attrs.masteryLevel + points;
        if (newLevel > 100) newLevel = 100;
        
        attrs.masteryLevel = newLevel;
        
        address owner = ownerOf(tokenId);
        masteryPoints[owner] += points;
        
        emit MasteryLevelIncreased(tokenId, newLevel);
    }
    
    /**
     * @dev Update alignment score based on financial behavior
     */
    function updateAlignmentScore(uint256 tokenId, uint256 newScore) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(newScore <= 100, "Score must be 0-100");
        
        tokenAttributes[tokenId].alignmentScore = newScore;
        
        emit AlignmentScoreUpdated(tokenId, newScore);
    }
    
    /**
     * @dev Change AI coach persona
     */
    function updateCoachPersona(uint256 tokenId, string memory newPersona) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        
        tokenAttributes[tokenId].coachPersona = newPersona;
        
        emit CoachPersonaAssigned(tokenId, newPersona);
    }
    
    /**
     * @dev Get all tokens owned by an address
     */
    function getTokensOfOwner(address owner) public view returns (uint256[] memory) {
        return userTokens[owner];
    }
    
    /**
     * @dev Get token attributes
     */
    function getTokenAttributes(uint256 tokenId) public view returns (ERPAttributes memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenAttributes[tokenId];
    }
    
    /**
     * @dev Calculate total mastery for an address
     */
    function getTotalMastery(address owner) public view returns (uint256) {
        uint256[] memory tokens = userTokens[owner];
        uint256 totalMastery = 0;
        
        for (uint256 i = 0; i < tokens.length; i++) {
            totalMastery += tokenAttributes[tokens[i]].masteryLevel;
        }
        
        return totalMastery + masteryPoints[owner];
    }
    
    /**
     * @dev Get tribute token count
     */
    function getTributesMinted() public view returns (uint256) {
        return tributesMinted;
    }
    
    /**
     * @dev Check if token is a tribute
     */
    function isTributeToken(uint256 tokenId) public view returns (bool) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenAttributes[tokenId].isTribute;
    }
    
    // Override required functions
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
