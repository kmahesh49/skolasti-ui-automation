# Skolasti UI Automation - Setup Guide

## 📋 Prerequisites

- Node.js 18 or higher
- Git installed
- GitHub account
- Gmail account for sending reports (or any SMTP server)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/skolasti-ui-automation.git
cd skolasti-ui-automation
```

### 2. Install Dependencies

```bash
npm install
npx playwright install chromium
```

### 3. Run Tests Locally

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/coach-view/create-subscription-plan.spec.ts

# Run with UI mode
npx playwright test --ui

# Run in headed mode (see browser)
npx playwright test --headed

# Run specific project (browser)
npx playwright test --project=chromium
```

### 4. View Test Reports

```bash
npx playwright show-report
```

## 🔧 GitHub Setup

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `skolasti-ui-automation`
3. Don't initialize with README (we already have one)

### 2. Push Code to GitHub

```bash
# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Skolasti UI Automation Suite"

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/skolasti-ui-automation.git

# Push to main branch
git push -u origin main
```

### 3. Create Feature Branches

```bash
# Create and switch to feature branch
git checkout -b feature/new-test-case

# Make changes and commit
git add .
git commit -m "Add: New test case for feature X"

# Push feature branch
git push origin feature/new-test-case

# Create Pull Request on GitHub
# After review and approval, merge to main
```

## 📧 Email Configuration

### Set up GitHub Secrets for Email

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `EMAIL_USERNAME` | Your Gmail address | `your-email@gmail.com` |
| `EMAIL_PASSWORD` | Gmail App Password* | `abcd efgh ijkl mnop` |
| `EMAIL_RECIPIENTS` | Comma-separated recipients | `manager1@company.com,manager2@company.com` |

**Note:** For Gmail, you need to create an **App Password**:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Create app password for "Mail"
5. Copy the 16-character password (remove spaces)

## ⏰ Scheduled Execution

The tests run automatically at **6:00 AM IST** every day via GitHub Actions.

To modify the schedule:
1. Edit `.github/workflows/daily-test-run.yml`
2. Update the cron expression:
   ```yaml
   schedule:
     - cron: '30 0 * * *'  # 6:00 AM IST (UTC+5:30)
   ```

Cron format: `minute hour day month day-of-week`
- `30 0 * * *` = 12:30 AM UTC = 6:00 AM IST
- `0 6 * * *` = 6:00 AM UTC = 11:30 AM IST
- `0 12 * * 1-5` = 12:00 PM UTC, Monday to Friday

## 🔄 Manual Trigger

To run tests manually on GitHub:
1. Go to **Actions** tab
2. Select **Daily Automated Test Execution**
3. Click **Run workflow**
4. Select branch and click **Run workflow**

## 📊 View Results

### On GitHub Actions
1. Go to **Actions** tab
2. Click on latest workflow run
3. View summary, artifacts, and logs

### Email Report
- Automatically sent after each test run
- Contains summary with pass/fail counts
- Includes link to full report on GitHub

### Artifacts
- Test results (JSON, JUnit XML)
- HTML report
- Screenshots and videos (on failure)
- Available for 30 days

## 🌳 Git Workflow Best Practices

### Branch Strategy

```bash
main          # Production-ready code
├── develop   # Development branch (optional)
├── feature/* # New features
├── bugfix/*  # Bug fixes
└── hotfix/*  # Urgent fixes
```

### Standard Workflow

```bash
# 1. Start from main
git checkout main
git pull origin main

# 2. Create feature branch
git checkout -b feature/add-login-test

# 3. Make changes
# ... edit files ...

# 4. Stage and commit
git add tests/login.spec.ts
git commit -m "feat: Add login validation test"

# 5. Push to GitHub
git push origin feature/add-login-test

# 6. Create Pull Request on GitHub
# 7. After approval, merge to main
# 8. Delete feature branch
git checkout main
git pull origin main
git branch -d feature/add-login-test
```

### Commit Message Convention

```
type(scope): subject

feat: Add new test case
fix: Correct selector for button
docs: Update README with setup instructions
refactor: Reorganize test structure
test: Add edge case validation
chore: Update dependencies
```

## 📁 Project Structure

```
skolasti-ui-automation/
├── .github/
│   └── workflows/
│       └── daily-test-run.yml    # GitHub Actions workflow
├── specs/                         # Test specifications
├── tests/
│   ├── auth.setup.ts             # Authentication setup
│   ├── helpers/                  # Helper functions
│   └── coach-view/               # Coach view tests
│       ├── create-subscription-plan.spec.ts
│       ├── create-offline-course-all-types.spec.ts
│       └── ...
├── test-results/                 # Test execution results
├── playwright-report/            # HTML reports
├── playwright.config.js          # Playwright configuration
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🧹 Cleanup

Files removed from repository:
- `tests/example.spec.js` - Example test (not needed)
- `tests/seed.spec.ts` - Seed test (not needed)
- `COURSE_CREATION_SUMMARY.md` - Temporary documentation
- `KNOWN_ISSUES_COURSE_CREATION.md` - Temporary documentation

## 🐛 Troubleshooting

### Tests fail with "Session Time Out"
- The authentication token expires during test execution
- Solution: Tests run faster now after optimization

### Email not sending
- Check GitHub Secrets are configured correctly
- Verify Gmail App Password is valid
- Check email address format in `EMAIL_RECIPIENTS`

### Tests don't run at scheduled time
- Verify cron expression in workflow file
- Check GitHub Actions is enabled in repository settings
- Note: GitHub Actions can be delayed by 10-15 minutes during high load

### Git push rejected
```bash
# If remote has changes you don't have locally
git pull --rebase origin main
git push origin main
```

## 📞 Support

For issues or questions:
1. Check existing [Issues](https://github.com/YOUR_USERNAME/skolasti-ui-automation/issues)
2. Create new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots/logs if applicable

## 📝 License

This project is proprietary and confidential.

---

**Last Updated:** December 2025
