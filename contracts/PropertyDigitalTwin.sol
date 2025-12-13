// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title PropertyDigitalTwin
 * @dev Digital Twin NFT for real property at 658 Sixth Rd, Newtonville, NJ 08346
 * Implements blockchain-based asset mirroring with revenue generation capabilities
 * 
 * Ownership: Keleen Joy Simpson and daughters (Jada Joy Hill, Nyasia Chais Hill)
 * Features: QR signatures, revenue streams, NFT sets, digital art integration
 * 
 * @author Chais the Great (Al-Miftah)
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PropertyDigitalTwin is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    // Property identifiers
    struct PropertyInfo {
        string propertyAddress;
        string gpsCoordinates;
        uint256 acquisitionDate;
        uint256 digitalTwinTimestamp;
        bytes32 qrSignature;
        bool isActive;
    }
    
    // Ownership structure
    struct BeneficiaryInfo {
        address beneficiaryAddress;
        string name;
        string birthDate;
        uint256 ownershipPercentage; // In basis points (10000 = 100%)
        bool isActive;
    }
    
    // Revenue tracking
    struct RevenueStream {
        string streamType; // "NFT_SALES", "ART_SALES", "COIN_REVENUE", "RENTAL"
        uint256 totalGenerated;
        uint256 lastDistribution;
        bool isActive;
    }
    
    // Sacred frequencies
    uint256 public constant FREQUENCY_528HZ = 528; // Healing/Transformation
    uint256 public constant FREQUENCY_963HZ = 963; // Unity/Protection
    
    // Token tracking
    uint256 private _tokenIdCounter;
    uint256 public constant MAX_PROPERTY_NFTS = 528; // Sacred number for NFT collection
    
    // Property data
    PropertyInfo public mainProperty;
    
    // Beneficiaries mapping
    mapping(uint256 => BeneficiaryInfo) public beneficiaries;
    uint256 public beneficiaryCount;
    
    // Revenue streams
    mapping(string => RevenueStream) public revenueStreams;
    string[] public revenueStreamTypes;
    
    // NFT metadata mapping
    mapping(uint256 => string) public nftStories;
    mapping(uint256 => uint256) public nftMilestones;
    
    // Events
    event PropertyDigitalTwinCreated(string propertyAddress, bytes32 qrSignature, uint256 timestamp);
    event BeneficiaryAdded(address indexed beneficiary, string name, uint256 ownershipPercentage);
    event RevenueGenerated(string streamType, uint256 amount, uint256 timestamp);
    event RevenueDistributed(address indexed beneficiary, uint256 amount, uint256 timestamp);
    event NFTMinted(uint256 indexed tokenId, string story, uint256 milestone);
    event SmartContractUpdated(string updateType, uint256 timestamp);
    
    constructor() ERC721("Property Digital Twin", "PDT") Ownable(msg.sender) {
        _tokenIdCounter = 0;
        beneficiaryCount = 0;
        
        // Initialize main property
        mainProperty = PropertyInfo({
            propertyAddress: "658 Sixth Rd, Newtonville, New Jersey 08346",
            gpsCoordinates: "39.5596,-74.9136",
            acquisitionDate: block.timestamp,
            digitalTwinTimestamp: block.timestamp,
            qrSignature: keccak256(abi.encode("658-Sixth-Rd-Newtonville-NJ-08346", block.timestamp)),
            isActive: true
        });
        
        emit PropertyDigitalTwinCreated(
            mainProperty.propertyAddress,
            mainProperty.qrSignature,
            block.timestamp
        );
    }
    
    /**
     * @dev Add a beneficiary to the property
     */
    function addBeneficiary(
        address beneficiaryAddress,
        string memory name,
        string memory birthDate,
        uint256 ownershipPercentage
    ) public onlyOwner {
        require(beneficiaryAddress != address(0), "Invalid beneficiary address");
        require(ownershipPercentage > 0 && ownershipPercentage <= 10000, "Invalid ownership percentage");
        
        beneficiaries[beneficiaryCount] = BeneficiaryInfo({
            beneficiaryAddress: beneficiaryAddress,
            name: name,
            birthDate: birthDate,
            ownershipPercentage: ownershipPercentage,
            isActive: true
        });
        
        beneficiaryCount++;
        
        emit BeneficiaryAdded(beneficiaryAddress, name, ownershipPercentage);
    }
    
    /**
     * @dev Mint a property NFT with story and milestone
     */
    function mintPropertyNFT(
        address to,
        string memory tokenURI,
        string memory story,
        uint256 milestone
    ) public onlyOwner returns (uint256) {
        require(_tokenIdCounter < MAX_PROPERTY_NFTS, "Max supply reached");
        
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        nftStories[tokenId] = story;
        nftMilestones[tokenId] = milestone;
        
        emit NFTMinted(tokenId, story, milestone);
        
        return tokenId;
    }
    
    /**
     * @dev Record revenue generation
     */
    function recordRevenue(
        string memory streamType,
        uint256 amount
    ) public onlyOwner {
        if (revenueStreams[streamType].totalGenerated == 0) {
            revenueStreamTypes.push(streamType);
            revenueStreams[streamType].streamType = streamType;
            revenueStreams[streamType].isActive = true;
        }
        
        revenueStreams[streamType].totalGenerated += amount;
        
        emit RevenueGenerated(streamType, amount, block.timestamp);
    }
    
    /**
     * @dev Distribute revenue to beneficiaries
     */
    function distributeRevenue(string memory streamType) public onlyOwner nonReentrant {
        RevenueStream storage stream = revenueStreams[streamType];
        require(stream.isActive, "Revenue stream not active");
        
        uint256 totalToDistribute = stream.totalGenerated - stream.lastDistribution;
        require(totalToDistribute > 0, "No revenue to distribute");
        
        // Calculate total active ownership
        uint256 totalOwnership = 0;
        for (uint256 i = 0; i < beneficiaryCount; i++) {
            if (beneficiaries[i].isActive) {
                totalOwnership += beneficiaries[i].ownershipPercentage;
            }
        }
        
        require(totalOwnership > 0, "No active beneficiaries");
        
        // Distribute to each beneficiary
        for (uint256 i = 0; i < beneficiaryCount; i++) {
            if (beneficiaries[i].isActive) {
                uint256 beneficiaryShare = (totalToDistribute * beneficiaries[i].ownershipPercentage) / totalOwnership;
                
                emit RevenueDistributed(beneficiaries[i].beneficiaryAddress, beneficiaryShare, block.timestamp);
            }
        }
        
        stream.lastDistribution = stream.totalGenerated;
    }
    
    /**
     * @dev Get property QR signature
     */
    function getPropertyQRSignature() public view returns (bytes32) {
        return mainProperty.qrSignature;
    }
    
    /**
     * @dev Get total revenue across all streams
     */
    function getTotalRevenue() public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < revenueStreamTypes.length; i++) {
            total += revenueStreams[revenueStreamTypes[i]].totalGenerated;
        }
        return total;
    }
    
    /**
     * @dev Get NFT story
     */
    function getNFTStory(uint256 tokenId) public view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return nftStories[tokenId];
    }
    
    /**
     * @dev Update smart contract (for infinite growth potential)
     */
    function updateContract(string memory updateType) public onlyOwner {
        emit SmartContractUpdated(updateType, block.timestamp);
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
