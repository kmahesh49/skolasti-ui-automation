# GitHub Repository Setup Script
param(
    [Parameter(Mandatory=$true)]
    [string]$RepoOwner,
    
    [Parameter(Mandatory=$true)]
    [string]$RepoName = "skolasti-ui-automation",
    
    [Parameter(Mandatory=$false)]
    [string]$DefaultBranch = "main"
)

Write-Host "🚀 Setting up GitHub repository..." -ForegroundColor Cyan
Write-Host "Repository: $RepoOwner/$RepoName" -ForegroundColor White

# Check if git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

# Check if already in a git repository
if (Test-Path ".git") {
    Write-Host "⚠️ Git repository already exists" -ForegroundColor Yellow
    $continue = Read-Host "Do you want to continue? This will add a new remote. (y/n)"
    if ($continue -ne "y") {
        exit 0
    }
} else {
    # Initialize git repository
    Write-Host "`n📦 Initializing Git repository..." -ForegroundColor Cyan
    git init
    git branch -M $DefaultBranch
}

# Set remote
$remoteUrl = "https://github.com/$RepoOwner/$RepoName.git"
Write-Host "`n🔗 Adding remote origin: $remoteUrl" -ForegroundColor Cyan

# Check if origin already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $replace = Read-Host "Replace it? (y/n)"
    if ($replace -eq "y") {
        git remote remove origin
        git remote add origin $remoteUrl
        Write-Host "✓ Remote updated" -ForegroundColor Green
    }
} else {
    git remote add origin $remoteUrl
    Write-Host "✓ Remote added" -ForegroundColor Green
}

# Stage all files
Write-Host "`n📝 Staging files..." -ForegroundColor Cyan
git add .

# Create initial commit
$commitMessage = "Initial commit: Skolasti UI Automation Suite`n`n- Add Playwright test framework`n- Add coach view tests`n- Configure GitHub Actions for daily execution`n- Add email reporting capability"

git commit -m $commitMessage
Write-Host "✓ Initial commit created" -ForegroundColor Green

# Push to GitHub
Write-Host "`n⬆️ Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "You may need to authenticate with GitHub..." -ForegroundColor Yellow

try {
    git push -u origin $DefaultBranch
    Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "❌ Failed to push. You may need to:" -ForegroundColor Red
    Write-Host "   1. Create the repository on GitHub first" -ForegroundColor Yellow
    Write-Host "   2. Configure Git credentials" -ForegroundColor Yellow
    Write-Host "   3. Run: git push -u origin $DefaultBranch" -ForegroundColor Yellow
}

Write-Host "`n✅ Setup complete!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/$RepoOwner/$RepoName" -ForegroundColor White
Write-Host "2. Navigate to Settings → Secrets and variables → Actions" -ForegroundColor White
Write-Host "3. Add these secrets:" -ForegroundColor White
Write-Host "   - EMAIL_USERNAME (your Gmail)" -ForegroundColor Gray
Write-Host "   - EMAIL_PASSWORD (Gmail App Password)" -ForegroundColor Gray
Write-Host "   - EMAIL_RECIPIENTS (comma-separated emails)" -ForegroundColor Gray
Write-Host "4. Go to Actions tab and enable workflows" -ForegroundColor White
Write-Host "`n📧 To set up Gmail App Password:" -ForegroundColor Cyan
Write-Host "   https://myaccount.google.com/apppasswords" -ForegroundColor Blue
