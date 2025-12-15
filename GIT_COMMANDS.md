# Git Commands Cheat Sheet

## Initial Setup

```bash
# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/skolasti-ui-automation.git
```

## Daily Workflow

```bash
# Check status
git status

# Pull latest changes
git pull origin main

# Create new branch
git checkout -b feature/your-feature-name

# Add files
git add .
# or specific file
git add tests/new-test.spec.ts

# Commit changes
git commit -m "feat: Add new test case"

# Push to GitHub
git push origin feature/your-feature-name

# Switch branches
git checkout main

# Delete branch locally
git branch -d feature/your-feature-name

# Delete branch remotely
git push origin --delete feature/your-feature-name
```

## Useful Commands

```bash
# View commit history
git log --oneline --graph --all

# View changes
git diff

# Undo uncommitted changes
git checkout -- filename.ts

# Amend last commit
git commit --amend -m "New message"

# Stash changes temporarily
git stash
git stash pop

# View all branches
git branch -a

# Merge branch to main
git checkout main
git merge feature/your-feature-name
```

## Commit Message Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `test:` Add or update tests
- `refactor:` Code refactoring
- `chore:` Maintenance tasks
- `style:` Formatting changes
