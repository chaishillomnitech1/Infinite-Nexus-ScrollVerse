/**
 * FLAMECOURT Protocol
 *
 * Content tracking and licensing protocols aligned with FLAMECOURT.
 * Provides legal protection and IP enforcement within the ScrollVerse.
 */

class FlameCourt {
  constructor(config) {
    this.config = config;
    this.initialized = false;
    this.deployed = false;

    this.contentRegistry = new Map();
    this.licenses = new Map();
    this.disputes = new Map();
    this.rulings = [];

    this.protocolConfig = {
      registrationFee: 0.01,
      licensingFeePercentage: 0.025, // 2.5%
      disputeResolutionPeriod: 14, // days
      appealPeriod: 7 // days
    };
  }

  async initialize() {
    this.initialized = true;
    return true;
  }

  async deploy() {
    if (!this.initialized) {
      throw new Error('FLAMECOURT must be initialized before deployment');
    }

    this.deployed = true;
    return {
      deployed: true,
      protocol: 'FLAMECOURT',
      timestamp: Date.now()
    };
  }

  /**
   * Register content for IP protection
   */
  registerContent(owner, contentData) {
    const contentId = `FC-${Date.now()}-${Math.random().toString(36).substr(2, 8)}`;

    const registration = {
      id: contentId,
      owner,
      title: contentData.title,
      type: contentData.type,
      hash: this.generateContentHash(contentData),
      metadata: contentData.metadata || {},
      registeredAt: Date.now(),
      status: 'protected',
      licenses: []
    };

    this.contentRegistry.set(contentId, registration);
    return registration;
  }

  generateContentHash(contentData) {
    // Simple hash simulation (use proper cryptographic hash in production)
    return `HASH-${JSON.stringify(contentData).length}-${Date.now()}`;
  }

  /**
   * Create a license for content usage
   */
  createLicense(contentId, licensee, licenseTerms) {
    const content = this.contentRegistry.get(contentId);
    if (!content) {
      throw new Error('Content not found');
    }

    const licenseId = `LIC-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    const license = {
      id: licenseId,
      contentId,
      contentOwner: content.owner,
      licensee,
      terms: {
        type: licenseTerms.type || 'standard',
        duration: licenseTerms.duration || 365, // days
        exclusivity: licenseTerms.exclusivity || false,
        territory: licenseTerms.territory || 'worldwide',
        usageRights: licenseTerms.usageRights || ['display', 'distribute'],
        royaltyPercentage:
          licenseTerms.royaltyPercentage ||
          this.protocolConfig.licensingFeePercentage
      },
      createdAt: Date.now(),
      expiresAt:
        Date.now() + (licenseTerms.duration || 365) * 24 * 60 * 60 * 1000,
      status: 'active'
    };

    this.licenses.set(licenseId, license);
    content.licenses.push(licenseId);

    return license;
  }

  /**
   * Verify content ownership
   */
  verifyOwnership(contentId, claimedOwner) {
    const content = this.contentRegistry.get(contentId);
    if (!content) {
      return { verified: false, reason: 'Content not found' };
    }

    return {
      verified: content.owner === claimedOwner,
      contentId,
      registeredOwner: content.owner,
      registeredAt: content.registeredAt
    };
  }

  /**
   * File a dispute
   */
  fileDispute(disputeData) {
    const disputeId = `DISP-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;

    const dispute = {
      id: disputeId,
      contentId: disputeData.contentId,
      complainant: disputeData.complainant,
      defendant: disputeData.defendant,
      type: disputeData.type, // 'ownership', 'infringement', 'licensing'
      description: disputeData.description,
      evidence: disputeData.evidence || [],
      filedAt: Date.now(),
      resolutionDeadline:
        Date.now() +
        this.protocolConfig.disputeResolutionPeriod * 24 * 60 * 60 * 1000,
      status: 'pending',
      ruling: null
    };

    this.disputes.set(disputeId, dispute);
    return dispute;
  }

  /**
   * Render a ruling on a dispute
   */
  renderRuling(disputeId, ruling) {
    const dispute = this.disputes.get(disputeId);
    if (!dispute) {
      throw new Error('Dispute not found');
    }

    if (dispute.status !== 'pending') {
      throw new Error('Dispute is not pending');
    }

    dispute.ruling = {
      decision: ruling.decision, // 'in-favor-complainant', 'in-favor-defendant', 'dismissed'
      reasoning: ruling.reasoning,
      remedies: ruling.remedies || [],
      renderedAt: Date.now(),
      appealDeadline:
        Date.now() + this.protocolConfig.appealPeriod * 24 * 60 * 60 * 1000
    };

    dispute.status = 'ruled';
    this.rulings.push(dispute.ruling);

    return dispute;
  }

  /**
   * Track content usage
   */
  trackUsage(contentId, usageData) {
    const content = this.contentRegistry.get(contentId);
    if (!content) {
      throw new Error('Content not found');
    }

    if (!content.usageHistory) {
      content.usageHistory = [];
    }

    const usage = {
      timestamp: Date.now(),
      type: usageData.type,
      user: usageData.user,
      context: usageData.context,
      licenseId: usageData.licenseId
    };

    content.usageHistory.push(usage);
    return usage;
  }

  /**
   * Get content by ID
   */
  getContent(contentId) {
    return this.contentRegistry.get(contentId);
  }

  /**
   * Get all licenses for content
   */
  getLicensesForContent(contentId) {
    const content = this.contentRegistry.get(contentId);
    if (!content) {
      return [];
    }

    return content.licenses
      .map(licId => this.licenses.get(licId))
      .filter(Boolean);
  }

  getStatus() {
    return {
      initialized: this.initialized,
      deployed: this.deployed,
      registeredContent: this.contentRegistry.size,
      activeLicenses: Array.from(this.licenses.values()).filter(
        l => l.status === 'active'
      ).length,
      pendingDisputes: Array.from(this.disputes.values()).filter(
        d => d.status === 'pending'
      ).length,
      totalRulings: this.rulings.length
    };
  }
}

module.exports = FlameCourt;
