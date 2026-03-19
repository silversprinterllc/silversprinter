$root = "C:\Users\User\SilverSprinter"
$sub  = "C:\Users\User\SilverSprinter\silversprinter"

# Folders to fully mirror from silversprinter/ -> root
$folders = @("src", "public", "prisma")

foreach ($folder in $folders) {
    $src = Join-Path $sub $folder
    $dst = Join-Path $root $folder
    Write-Host "Syncing $folder..."
    if (Test-Path $src) {
        robocopy $src $dst /E /NFL /NDL /NJH /NJS | Out-Null
        Write-Host "  Done: $folder"
    }
}

# Files to copy from silversprinter/ -> root
$files = @("next.config.ts", "tailwind.config.ts", "postcss.config.mjs", "tsconfig.json", "prisma.config.ts")
foreach ($f in $files) {
    $src = Join-Path $sub $f
    $dst = Join-Path $root $f
    if (Test-Path $src) {
        Copy-Item $src $dst -Force
        Write-Host "Copied: $f"
    }
}

# Merge package.json dependencies (copy silversprinter's package.json to root)
Copy-Item (Join-Path $sub "package.json") (Join-Path $root "package.json") -Force
Write-Host "Copied: package.json"

Write-Host "`nDone. Run 'npm install' at repo root next."
