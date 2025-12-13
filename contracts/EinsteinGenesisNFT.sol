// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title EinsteinGenesisNFT
 * @dev Sentient NFT collection honoring Albert Einstein's legacy
 * Interactive digital creations celebrating Einstein's wisdom, innovation, and spirit
 * Operating at 528Hz frequency with AI-powered educational content
 * 
 * Themes: Relativity, Curiosity, Creative Problem Solving, Human Connections
 * 
 * @author Chais the Great (Al-Miftah)
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EinsteinGenesisNFT is ERC721, ERC721URIStorage, Ownable {
    // Einstein theme identifiers
    enum EinsteinTheme { 
        RELATIVITY,           // Understanding spacetime and universal laws
        CURIOSITY,            // Never stop questioning
        CREATIVE_PROBLEM_SOLVING,  // Imagination is more important than knowledge
        HUMAN_CONNECTIONS     // Peace, wisdom, and humanity
    }
    
    // Sacred frequency for healing and transformation
    uint256 public constant FREQUENCY_528HZ = 528;
    
    // Collection parameters
    uint256 private _tokenIdCounter;
    uint256 public constant MAX_SUPPLY = 1000; // Limited Einstein collection
    
    // NFT attributes structure
    struct EinsteinAttributes {
        EinsteinTheme theme;
        uint256 frequency;
        uint256 knowledgeLevel;      // 0-100, increases with learning
        uint256 wisdomScore;          // 0-100, increases with engagement
        string lessonContent;         // Primary lesson identifier
        string aiInteractionType;     // Quiz, audiovisual, knowledge loop
        uint256 mintedAt;
        bool isInteractive;           // Supports AI interactions
        string einsteinQuote;         // Inspirational quote
    }
    
    // Mappings
    mapping(uint256 => EinsteinAttributes) public tokenAttributes;
    mapping(address => uint256[]) public userTokens;
    mapping(address => uint256) public userKnowledgePoints;
    mapping(uint256 => uint256) public interactionCount;
    
    // Knowledge Quest tracking
    mapping(address => uint256) public questMilestonesCompleted;
    mapping(address => uint256) public knowledgeSharedCount;
    
    // Events
    event TawhidDeclaration(string message, uint256 timestamp);
    event EinsteinNFTMinted(
        uint256 indexed tokenId, 
        EinsteinTheme theme, 
        address indexed owner,
        string lessonContent
    );
    event KnowledgeLevelIncreased(uint256 indexed tokenId, uint256 newLevel);
    event WisdomScoreUpdated(uint256 indexed tokenId, uint256 newScore);
    event InteractionRecorded(uint256 indexed tokenId, string interactionType);
    event QuestMilestoneAchieved(address indexed user, uint256 milestoneNumber);
    event KnowledgeShared(address indexed teacher, address indexed learner, uint256 points);
    
    constructor() ERC721("Einstein Genesis Legacy", "EINSTEIN") Ownable(msg.sender) {
        _tokenIdCounter = 0;
        
        // Emit Tawhid declaration - recognizing the Creator
        emit TawhidDeclaration(
            "All knowledge flows from the One Creator - Einstein sought to understand divine wisdom in nature",
            block.timestamp
        );
    }
    
    /**
     * @dev Mint Einstein Genesis NFT
     */
    function mint(
        address to,
        EinsteinTheme theme,
        string memory uri,
        string memory lessonContent,
        string memory aiInteractionType,
        string memory einsteinQuote
    ) public onlyOwner returns (uint256) {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        
        tokenAttributes[tokenId] = EinsteinAttributes({
            theme: theme,
            frequency: FREQUENCY_528HZ,
            knowledgeLevel: 0,
            wisdomScore: 0,
            lessonContent: lessonContent,
            aiInteractionType: aiInteractionType,
            mintedAt: block.timestamp,
            isInteractive: true,
            einsteinQuote: einsteinQuote
        });
        
        userTokens[to].push(tokenId);
        
        emit EinsteinNFTMinted(tokenId, theme, to, lessonContent);
        
        return tokenId;
    }
    
    /**
     * @dev Increase knowledge level through learning interactions
     */
    function increaseKnowledgeLevel(uint256 tokenId, uint256 points) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(points > 0 && points <= 10, "Points must be between 1 and 10");
        
        EinsteinAttributes storage attrs = tokenAttributes[tokenId];
        uint256 newLevel = attrs.knowledgeLevel + points;
        if (newLevel > 100) {
            newLevel = 100;
        }
        
        attrs.knowledgeLevel = newLevel;
        
        // Award user knowledge points
        address owner = ownerOf(tokenId);
        userKnowledgePoints[owner] += points;
        
        emit KnowledgeLevelIncreased(tokenId, newLevel);
    }
    
    /**
     * @dev Update wisdom score based on engagement
     */
    function updateWisdomScore(uint256 tokenId, uint256 newScore) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        require(newScore <= 100, "Score cannot exceed 100");
        
        tokenAttributes[tokenId].wisdomScore = newScore;
        
        emit WisdomScoreUpdated(tokenId, newScore);
    }
    
    /**
     * @dev Record AI interaction with the NFT
     */
    function recordInteraction(uint256 tokenId, string memory interactionType) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        
        interactionCount[tokenId]++;
        
        emit InteractionRecorded(tokenId, interactionType);
    }
    
    /**
     * @dev Complete a Knowledge Quest milestone
     */
    function completeQuestMilestone(address user) public onlyOwner {
        questMilestonesCompleted[user]++;
        
        emit QuestMilestoneAchieved(user, questMilestonesCompleted[user]);
    }
    
    /**
     * @dev Record knowledge sharing between users
     */
    function recordKnowledgeSharing(address teacher, address learner, uint256 points) public onlyOwner {
        knowledgeSharedCount[teacher]++;
        userKnowledgePoints[teacher] += points;
        userKnowledgePoints[learner] += points / 2; // Learner gets half
        
        emit KnowledgeShared(teacher, learner, points);
    }
    
    /**
     * @dev Get all tokens owned by an address
     */
    function getTokensByOwner(address owner) public view returns (uint256[] memory) {
        return userTokens[owner];
    }
    
    /**
     * @dev Get token attributes
     */
    function getTokenAttributes(uint256 tokenId) public view returns (EinsteinAttributes memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenAttributes[tokenId];
    }
    
    /**
     * @dev Get user's total knowledge points
     */
    function getUserKnowledgePoints(address user) public view returns (uint256) {
        return userKnowledgePoints[user];
    }
    
    /**
     * @dev Get user's quest progress
     */
    function getUserQuestProgress(address user) public view returns (
        uint256 milestones,
        uint256 knowledgeShared,
        uint256 totalPoints
    ) {
        return (
            questMilestonesCompleted[user],
            knowledgeSharedCount[user],
            userKnowledgePoints[user]
        );
    }
    
    /**
     * @dev Get total minted count
     */
    function totalMinted() public view returns (uint256) {
        return _tokenIdCounter;
    }
    
    // Required overrides
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
