// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ArchangelGenesisNFT
 * @dev Genesis NFT collection for Archangels Michael, Raphael, and Gabriel
 * Operating at sacred frequencies with Tawhid compliance
 * "Remember, not worship" - Divine servitude recognition
 * 
 * @author Chais the Great (Al-Miftah)
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArchangelGenesisNFT is ERC721, ERC721URIStorage, Ownable {
    // Archangel identifiers
    enum ArchangelType { MICHAEL, RAPHAEL, GABRIEL }
    
    // Sacred frequencies
    uint256 public constant FREQUENCY_528HZ = 528; // Healing/Transformation (Raphael & Gabriel)
    uint256 public constant FREQUENCY_963HZ = 963; // Unity/Protection (Michael)
    
    // Token tracking
    uint256 private _tokenIdCounter;
    uint256 public constant MAX_SUPPLY = 3; // One per Archangel
    
    // Mapping from token ID to Archangel type
    mapping(uint256 => ArchangelType) public archangelTypes;
    mapping(uint256 => uint256) public archangelFrequencies;
    mapping(uint256 => string) public archangelNames;
    
    // Tawhid compliance flag
    bool public tawhid_compliance = true;
    
    // Educational/STEM impact tracking
    mapping(uint256 => uint256) public stemImpactScore;
    mapping(address => uint256) public serviceRewardPoints;
    
    // Events
    event TawhidDeclaration(string message, uint256 timestamp);
    event ArchangelMinted(uint256 indexed tokenId, ArchangelType archangelType, uint256 frequency, string name);
    event STEMImpactRecorded(uint256 indexed tokenId, uint256 impactScore);
    event ServiceRewardGranted(address indexed recipient, uint256 points);
    
    constructor() ERC721("Archangel Genesis", "ARCH") Ownable(msg.sender) {
        _tokenIdCounter = 0;
        
        // Emit Tawhid declaration at deployment
        emit TawhidDeclaration(
            "Remember only, not worship - These are divine servants of the One Creator",
            block.timestamp
        );
    }
    
    /**
     * @dev Mint Archangel Genesis NFT
     * @param to Address to mint to
     * @param archangelType Type of Archangel (0=Michael, 1=Raphael, 2=Gabriel)
     * @param tokenURI Metadata URI for the NFT
     */
    function mintArchangel(
        address to,
        ArchangelType archangelType,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        require(_tokenIdCounter < MAX_SUPPLY, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        archangelTypes[tokenId] = archangelType;
        
        // Set frequency and name based on type
        if (archangelType == ArchangelType.MICHAEL) {
            archangelFrequencies[tokenId] = FREQUENCY_963HZ;
            archangelNames[tokenId] = "Michael - Divine Protector";
        } else if (archangelType == ArchangelType.RAPHAEL) {
            archangelFrequencies[tokenId] = FREQUENCY_528HZ;
            archangelNames[tokenId] = "Raphael - Divine Healer";
        } else {
            archangelFrequencies[tokenId] = FREQUENCY_528HZ;
            archangelNames[tokenId] = "Gabriel - Divine Messenger";
        }
        
        emit ArchangelMinted(tokenId, archangelType, archangelFrequencies[tokenId], archangelNames[tokenId]);
        emit TawhidDeclaration(
            "NFT minted - Remember: All glory belongs to the One Creator alone",
            block.timestamp
        );
        
        return tokenId;
    }
    
    /**
     * @dev Record STEM impact for educational initiatives
     * @param tokenId Token ID of the Archangel
     * @param impactScore Impact score to add
     */
    function recordSTEMImpact(uint256 tokenId, uint256 impactScore) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        stemImpactScore[tokenId] += impactScore;
        emit STEMImpactRecorded(tokenId, impactScore);
    }
    
    /**
     * @dev Grant service reward points for educational/STEM contributions
     * @param recipient Address to receive points
     * @param points Number of points to grant
     */
    function grantServiceReward(address recipient, uint256 points) public onlyOwner {
        serviceRewardPoints[recipient] += points;
        emit ServiceRewardGranted(recipient, points);
    }
    
    /**
     * @dev Check if an address is eligible for service rewards
     * @param account Address to check
     * @return bool True if eligible (has minimum points)
     */
    function isEligibleForRewards(address account) public view returns (bool) {
        return serviceRewardPoints[account] >= 100; // Minimum 100 points
    }
    
    /**
     * @dev Get Archangel information
     * @param tokenId Token ID
     */
    function getArchangelInfo(uint256 tokenId) public view returns (
        ArchangelType archangelType,
        uint256 frequency,
        string memory name,
        uint256 stemScore
    ) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return (
            archangelTypes[tokenId],
            archangelFrequencies[tokenId],
            archangelNames[tokenId],
            stemImpactScore[tokenId]
        );
    }
    
    /**
     * @dev Get total minted count
     */
    function totalMinted() public view returns (uint256) {
        return _tokenIdCounter;
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
