// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title HillFamilyAssetNFT
 * @dev NFT contract for Hill Family luxury assets with perpetual revenue distribution
 * 
 * Features:
 * - Real estate and vehicle NFT tokenization
 * - Family beneficiary system with automatic revenue distribution
 * - Digital twin integration
 * - Intergenerational succession
 * - Perpetual revenue mechanism
 * 
 * Frequency: 963Hz | Divine Connection
 */
contract HillFamilyAssetNFT is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    
    // Asset types
    enum AssetType { RealEstate, Vehicle }
    
    // Beneficiary structure
    struct Beneficiary {
        address walletAddress;
        string name;
        uint256 revenueShare; // In basis points (10000 = 100%)
        bool isActive;
    }
    
    // Asset metadata
    struct Asset {
        uint256 tokenId;
        AssetType assetType;
        string assetId;
        uint256 estimatedValue;
        bool hasDigitalTwin;
        uint256 mintedAt;
    }
    
    // Digital twin revenue model
    struct RevenueModel {
        uint256 appreciationRate; // In basis points
        uint256 rentalYield;
        uint256 nftRoyalty;
        uint256 digitalLicensing;
    }
    
    // State variables
    uint256 private _tokenIdCounter;
    mapping(uint256 => Asset) public assets;
    mapping(uint256 => Beneficiary[]) public assetBeneficiaries;
    mapping(uint256 => RevenueModel) public assetRevenueModels;
    mapping(uint256 => uint256) public accumulatedRevenue;
    
    // Family members
    address public primaryOwner; // Chais Khayree Hill
    address public coOwner;      // Selena Hill
    address public heir;         // Londyn Avani Hill
    
    // Sacred frequency
    uint256 public constant FREQUENCY = 963; // Hz - Divine Connection
    uint256 public constant BASIS_POINTS = 10000;
    
    // Events
    event AssetMinted(
        uint256 indexed tokenId,
        AssetType assetType,
        string assetId,
        uint256 estimatedValue,
        address indexed owner
    );
    
    event BeneficiaryAdded(
        uint256 indexed tokenId,
        address indexed beneficiary,
        string name,
        uint256 revenueShare
    );
    
    event RevenueDistributed(
        uint256 indexed tokenId,
        uint256 totalAmount,
        uint256 timestamp
    );
    
    event DigitalTwinActivated(
        uint256 indexed tokenId,
        uint256 appreciationRate,
        uint256 rentalYield
    );
    
    event SuccessionExecuted(
        address indexed from,
        address indexed to,
        uint256 timestamp
    );

    /**
     * @dev Constructor
     */
    constructor(
        address _primaryOwner,
        address _coOwner,
        address _heir
    ) ERC721("Hill Family Asset NFT", "HFANFT") {
        require(_primaryOwner != address(0), "Invalid primary owner");
        require(_coOwner != address(0), "Invalid co-owner");
        require(_heir != address(0), "Invalid heir");
        
        primaryOwner = _primaryOwner;
        coOwner = _coOwner;
        heir = _heir;
        
        _tokenIdCounter = 1;
    }

    /**
     * @dev Mint asset NFT with beneficiaries
     */
    function mintAsset(
        AssetType _assetType,
        string memory _assetId,
        uint256 _estimatedValue,
        string memory _tokenURI,
        bool _hasDigitalTwin
    ) external onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;
        
        _safeMint(primaryOwner, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        
        assets[tokenId] = Asset({
            tokenId: tokenId,
            assetType: _assetType,
            assetId: _assetId,
            estimatedValue: _estimatedValue,
            hasDigitalTwin: _hasDigitalTwin,
            mintedAt: block.timestamp
        });
        
        emit AssetMinted(tokenId, _assetType, _assetId, _estimatedValue, primaryOwner);
        
        return tokenId;
    }

    /**
     * @dev Add beneficiary to asset
     */
    function addBeneficiary(
        uint256 _tokenId,
        address _beneficiary,
        string memory _name,
        uint256 _revenueShare
    ) external onlyOwner {
        require(_exists(_tokenId), "Token does not exist");
        require(_beneficiary != address(0), "Invalid beneficiary address");
        require(_revenueShare > 0 && _revenueShare <= BASIS_POINTS, "Invalid revenue share");
        
        assetBeneficiaries[_tokenId].push(Beneficiary({
            walletAddress: _beneficiary,
            name: _name,
            revenueShare: _revenueShare,
            isActive: true
        }));
        
        emit BeneficiaryAdded(_tokenId, _beneficiary, _name, _revenueShare);
    }

    /**
     * @dev Activate digital twin for asset
     */
    function activateDigitalTwin(
        uint256 _tokenId,
        uint256 _appreciationRate,
        uint256 _rentalYield,
        uint256 _nftRoyalty,
        uint256 _digitalLicensing
    ) external onlyOwner {
        require(_exists(_tokenId), "Token does not exist");
        require(assets[_tokenId].hasDigitalTwin, "Asset does not support digital twin");
        
        assetRevenueModels[_tokenId] = RevenueModel({
            appreciationRate: _appreciationRate,
            rentalYield: _rentalYield,
            nftRoyalty: _nftRoyalty,
            digitalLicensing: _digitalLicensing
        });
        
        emit DigitalTwinActivated(_tokenId, _appreciationRate, _rentalYield);
    }

    /**
     * @dev Distribute revenue to beneficiaries
     */
    function distributeRevenue(uint256 _tokenId) external payable nonReentrant {
        require(_exists(_tokenId), "Token does not exist");
        require(msg.value > 0, "No revenue to distribute");
        
        Beneficiary[] memory beneficiaries = assetBeneficiaries[_tokenId];
        require(beneficiaries.length > 0, "No beneficiaries configured");
        
        uint256 totalDistributed = 0;
        
        for (uint256 i = 0; i < beneficiaries.length; i++) {
            if (beneficiaries[i].isActive) {
                uint256 share = (msg.value * beneficiaries[i].revenueShare) / BASIS_POINTS;
                
                (bool success, ) = beneficiaries[i].walletAddress.call{value: share}("");
                require(success, "Revenue distribution failed");
                
                totalDistributed += share;
            }
        }
        
        accumulatedRevenue[_tokenId] += totalDistributed;
        
        emit RevenueDistributed(_tokenId, totalDistributed, block.timestamp);
    }

    /**
     * @dev Execute succession (transfer ownership)
     */
    function executeSuccession(address _newOwner) external {
        require(msg.sender == primaryOwner || msg.sender == coOwner, "Not authorized");
        require(_newOwner != address(0), "Invalid new owner");
        
        address oldOwner = primaryOwner;
        primaryOwner = _newOwner;
        
        emit SuccessionExecuted(oldOwner, _newOwner, block.timestamp);
    }

    /**
     * @dev Get asset details
     */
    function getAsset(uint256 _tokenId) external view returns (Asset memory) {
        require(_exists(_tokenId), "Token does not exist");
        return assets[_tokenId];
    }

    /**
     * @dev Get beneficiaries for asset
     */
    function getBeneficiaries(uint256 _tokenId) external view returns (Beneficiary[] memory) {
        require(_exists(_tokenId), "Token does not exist");
        return assetBeneficiaries[_tokenId];
    }

    /**
     * @dev Get revenue model for asset
     */
    function getRevenueModel(uint256 _tokenId) external view returns (RevenueModel memory) {
        require(_exists(_tokenId), "Token does not exist");
        return assetRevenueModels[_tokenId];
    }

    /**
     * @dev Get accumulated revenue for asset
     */
    function getAccumulatedRevenue(uint256 _tokenId) external view returns (uint256) {
        require(_exists(_tokenId), "Token does not exist");
        return accumulatedRevenue[_tokenId];
    }

    /**
     * @dev Get total assets count
     */
    function getTotalAssets() external view returns (uint256) {
        return _tokenIdCounter - 1;
    }

    /**
     * @dev Check if token exists
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return tokenId > 0 && tokenId < _tokenIdCounter;
    }

    /**
     * @dev Override required by Solidity
     */
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /**
     * @dev Override required by Solidity
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /**
     * @dev Receive function to accept ETH
     */
    receive() external payable {}
}
