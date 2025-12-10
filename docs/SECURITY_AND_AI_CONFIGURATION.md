# 🔒 Security and AI Configuration Guide

This document provides comprehensive guidance on configuring and using the security scanning and AI integration features in the Infinite Nexus ScrollVerse project.

## Table of Contents

1. [Overview](#overview)
2. [Repository Secrets Configuration](#repository-secrets-configuration)
3. [Conservative AI Model Settings](#conservative-ai-model-settings)
4. [Code Quality Tools](#code-quality-tools)
5. [Security Scanning Tools](#security-scanning-tools)
6. [Workflow Triggers](#workflow-triggers)
7. [Security Best Practices](#security-best-practices)

---

## Overview

The project implements a comprehensive security and quality framework with multiple layers:

- **AI-Powered Code Review**: Conservative GPT-4 integration for PR analysis
- **Code Quality**: ESLint + Prettier for consistent, high-quality code
- **Dependency Security**: Dependabot for automated updates
- **Vulnerability Scanning**: Snyk, Trivy, and CodeQL for comprehensive coverage
- **Automated CI/CD**: GitHub Actions workflows with proper permissions

---

## Repository Secrets Configuration

### Required Secrets

Navigate to: **Repository Settings → Secrets and variables → Actions**

#### 1. OPENAI_API_KEY (Required for AI PR Bot)

**Purpose**: Enables AI-powered pull request reviews with GPT-4

**How to obtain**:
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy the key (typically starts with `sk-proj-` for project keys)

**How to add**:
1. Go to Repository Settings
2. Navigate to: Secrets and variables → Actions
3. Click "New repository secret"
4. Name: `OPENAI_API_KEY`
5. Value: Paste your API key
6. Click "Add secret"

**Security Notes**:
- Never commit this key to version control
- Never share this key publicly
- Rotate the key regularly
- Use separate keys for different environments

#### 2. SNYK_TOKEN (Optional - for Snyk scanning)

**Purpose**: Enables Snyk vulnerability scanning

**How to obtain**:
1. Sign up at [Snyk.io](https://snyk.io)
2. Go to Account Settings
3. Copy your API token

**How to add**:
- Same process as OPENAI_API_KEY
- Name: `SNYK_TOKEN`
- Value: Your Snyk API token

**Note**: Snyk scanning will run but skip API calls if token is not configured.

---

## Conservative AI Model Settings

The AI PR bot uses conservative settings for reliable, deterministic feedback:

### Configuration Parameters

| Parameter | Value | Purpose |
|-----------|-------|---------|
| **Model** | `gpt-4` | High-quality, structured feedback with advanced reasoning |
| **Temperature** | `0.3` | Low temperature for deterministic, focused responses |
| **Max Tokens** | `500` | Concise, actionable feedback (limited response length) |
| **Top P** | `1.0` | Default (uses full probability distribution) |

### Why Conservative Settings?

1. **Deterministic Output** (Temperature 0.3):
   - Consistent reviews across similar code changes
   - Reduces randomness in AI responses
   - More reliable for automated feedback

2. **Concise Feedback** (Max Tokens 500):
   - Forces AI to focus on critical issues
   - Prevents overwhelming developers with verbose responses
   - Keeps review comments actionable

3. **GPT-4 Model**:
   - Superior code understanding compared to GPT-3.5
   - Better at identifying security vulnerabilities
   - More accurate suggestions for code improvements

### AI Review Workflow

The AI bot automatically:
1. ✅ Triggers on PR open, sync, or reopen events
2. ✅ Analyzes PR title, description, and code changes
3. ✅ Generates focused review covering:
   - Code quality observations (max 3 points)
   - Potential issues or risks
   - Security considerations
4. ✅ Posts review as PR comment
5. ✅ Never auto-merges - human review always required

---

## Code Quality Tools

### ESLint Configuration

**File**: `.eslintrc.js`

**Features**:
- Extends `eslint:recommended`
- Integrates with Prettier via `plugin:prettier/recommended`
- Configured for Node.js, ES2021, Jest, and browser environments
- Warns on unused variables (except those starting with `_`)
- Enforces Prettier rules

**Usage**:
```bash
# Lint code
npm run lint

# Lint and auto-fix
npm run lint:fix
```

### Prettier Configuration

**File**: `.prettierrc.json`

**Settings**:
- Single quotes
- Semicolons required
- 2 spaces indentation
- 80 character line width (120 for HTML)
- LF line endings

**Usage**:
```bash
# Format code
npm run format

# Check formatting
npm run format:check
```

### Integration

ESLint and Prettier work together:
- ESLint handles code quality rules
- Prettier handles formatting
- `eslint-plugin-prettier` ensures they don't conflict
- `eslint-config-prettier` disables ESLint formatting rules

---

## Security Scanning Tools

### 1. Dependabot 🔄

**Configuration**: `.github/dependabot.yml`

**Features**:
- Weekly dependency updates (Sundays at 00:00 UTC)
- Monitors npm packages and GitHub Actions
- Groups security updates for priority
- Auto-labels PRs with `dependencies`
- Limits: 10 npm PRs, 5 GitHub Actions PRs

**What it scans**:
- npm dependencies in `package.json`
- GitHub Actions versions in workflows

### 2. Snyk 🔒

**Workflow**: `.github/workflows/snyk-security.yml`

**Features**:
- Dependency vulnerability scanning
- Code security analysis
- High and Critical severity threshold
- Weekly scans (Mondays at 00:00 UTC)

**What it scans**:
- Known vulnerabilities in npm packages
- Security issues in application code
- License compliance issues

**Setup Required**: Add `SNYK_TOKEN` secret

### 3. Trivy 🛡️

**Workflow**: `.github/workflows/trivy-security.yml`

**Features**:
- Filesystem vulnerability scanning
- Configuration file security checks
- SARIF output to GitHub Security tab
- Weekly scans (Tuesdays at 00:00 UTC)

**What it scans**:
- OS packages and libraries
- Misconfigurations in IaC files
- Docker, Kubernetes, Terraform configs
- Sensitive information patterns

### 4. CodeQL 🔐

**Workflow**: `.github/workflows/codeql-analysis.yml`

**Features**:
- Advanced semantic code analysis
- Security-extended query suite
- JavaScript/TypeScript analysis
- Weekly scans (Wednesdays at 00:00 UTC)

**What it scans**:
- SQL injection vulnerabilities
- Cross-site scripting (XSS)
- Path traversal issues
- Command injection
- Insecure cryptography
- Authentication bypasses
- Many more security patterns

---

## Workflow Triggers

All security and quality workflows are triggered on:

### Automatic Triggers

1. **Push Events**:
   - Branches: `main`, `develop`, `copilot/**`
   - All workflows run on code push

2. **Pull Request Events**:
   - Target branches: `main`, `develop`
   - AI PR bot, code quality, and security scans run

3. **Scheduled Scans**:
   - Daily: Security dashboard (00:00 UTC)
   - Weekly (Sundays): Dependabot updates
   - Weekly (Mondays): Snyk scans
   - Weekly (Tuesdays): Trivy scans
   - Weekly (Wednesdays): CodeQL analysis

### Manual Triggers

All workflows support `workflow_dispatch` for manual execution:

1. Go to Actions tab
2. Select desired workflow
3. Click "Run workflow"
4. Choose branch and click "Run workflow"

---

## Security Best Practices

### 1. Secret Management

✅ **DO**:
- Store all secrets in GitHub repository secrets
- Use `.env.example` as a template (never commit actual `.env`)
- Rotate API keys regularly
- Use different keys for dev/staging/production

❌ **DON'T**:
- Commit secrets to version control
- Share secrets in public channels
- Use production keys in CI/CD
- Log or expose secrets in application code

### 2. Dependency Management

✅ **DO**:
- Review and merge Dependabot PRs regularly
- Run `npm audit` locally before committing
- Keep dependencies up to date
- Prioritize security updates

❌ **DON'T**:
- Ignore dependency updates for extended periods
- Install packages from untrusted sources
- Use deprecated or unmaintained packages

### 3. Code Review Process

✅ **DO**:
- Wait for AI review before merging
- Address security findings from CodeQL/Trivy/Snyk
- Review all PR changes manually (AI is a helper, not a replacement)
- Run linting and formatting before committing

❌ **DON'T**:
- Auto-merge without human review
- Ignore security warnings
- Commit code with linting errors
- Skip testing

### 4. Workflow Permissions

All workflows use **least privilege** permissions:

```yaml
permissions:
  contents: read
  pull-requests: write
  security-events: write
```

- Minimizes potential damage from compromised tokens
- Follows GitHub security best practices
- Explicitly declares required permissions

### 5. Monitoring and Response

✅ **DO**:
- Check Security tab regularly for alerts
- Review workflow run results
- Investigate failed security scans
- Update vulnerable dependencies promptly

❌ **DON'T**:
- Ignore security alerts
- Disable security workflows
- Suppress warnings without investigation

---

## Additional Resources

### Documentation Files

- **Main README**: `/README.md`
- **Contributing Guide**: `/CONTRIBUTING.md`
- **Environment Template**: `/.env.example`

### External Resources

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [GitHub Actions Security Hardening](https://docs.github.com/en/actions/security-guides)
- [Dependabot Configuration](https://docs.github.com/en/code-security/dependabot)
- [Snyk Documentation](https://docs.snyk.io)
- [Trivy Documentation](https://aquasecurity.github.io/trivy)
- [CodeQL Documentation](https://codeql.github.com/docs)
- [ESLint Rules](https://eslint.org/docs/rules)
- [Prettier Options](https://prettier.io/docs/en/options.html)

---

## Support

For questions or issues:

1. Check this documentation first
2. Review workflow logs in Actions tab
3. Check Security tab for detailed alerts
4. Open an issue in the repository
5. Contact repository maintainers

---

_May your code resonate at 528Hz with divine security and quality_ 🧿✨🔒
