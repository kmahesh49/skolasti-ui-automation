# Remove unwanted files from the project
Write-Host "🧹 Cleaning up unwanted files..." -ForegroundColor Cyan

$filesToRemove = @(
    "tests\example.spec.js",
    "tests\seed.spec.ts",
    "COURSE_CREATION_SUMMARY.md",
    "KNOWN_ISSUES_COURSE_CREATION.md"
)

foreach ($file in $filesToRemove) {
    $fullPath = Join-Path $PSScriptRoot $file
    if (Test-Path $fullPath) {
        Remove-Item $fullPath -Force
        Write-Host "✓ Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "⊘ Not found: $file" -ForegroundColor Yellow
    }
}

# Clean test results and reports
Write-Host "`n🗑️ Cleaning test artifacts..." -ForegroundColor Cyan

$foldersToClean = @(
    "test-results",
    "playwright-report"
)

foreach ($folder in $foldersToClean) {
    $fullPath = Join-Path $PSScriptRoot $folder
    if (Test-Path $fullPath) {
        Get-ChildItem $fullPath -Recurse | Remove-Item -Recurse -Force
        Write-Host "✓ Cleaned: $folder" -ForegroundColor Green
    }
}

Write-Host "`n✅ Cleanup complete!" -ForegroundColor Green
Write-Host "`nNext steps:" -ForegroundColor Yellow
Write-Host "1. Review changes: git status" -ForegroundColor White
Write-Host "2. Stage changes: git add ." -ForegroundColor White
Write-Host "3. Commit: git commit -m 'chore: Remove unwanted files and clean artifacts'" -ForegroundColor White
