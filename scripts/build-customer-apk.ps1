# BrewPluse Android Customer App Packaging & Signing Script
$ErrorActionPreference = "Stop"

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  BrewPluse Android Customer App - Clean Assembly & Signing " -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$toolsDir = "D:\BrewPluse\.tools"
$buildToolsDir = "$toolsDir\android-sdk\build-tools\34.0.0"
$jdkBin = "$toolsDir\jdk17\jdk-17.0.20.1+1\bin"
$baseApk = "D:\BrewPluse\android\app\build\outputs\apk\debug\app-debug.apk"
$tempUnsigned = "D:\BrewPluse\android\app\build\outputs\apk\debug\app-unsigned.apk"
$alignedApk = "D:\BrewPluse\android\app\build\outputs\apk\debug\app-aligned.apk"
$finalApk = "D:\BrewPluse\android\app\build\outputs\apk\debug\app-debug.apk"
$webPublicApk = "D:\BrewPluse\public\downloads\brewpluse-app.apk"
$keystore = "D:\BrewPluse\android\app\debug.keystore"

# 1. Ensure download directory exists
New-Item -ItemType Directory -Path "D:\BrewPluse\public\downloads" -Force | Out-Null

# 2. Make working copy of APK
Copy-Item $baseApk $tempUnsigned -Force
Write-Host "[1/5] Working APK copy created: $tempUnsigned" -ForegroundColor Green

# 3. Update assets and strip old signature
$zip = [System.IO.Compression.ZipFile]::Open($tempUnsigned, [System.IO.Compression.ZipArchiveMode]::Update)

# Helper to remove and add entry
function Update-ZipEntry($zipArchive, $entryPath, $sourceFile) {
    $existing = $zipArchive.GetEntry($entryPath)
    if ($existing) {
        $existing.Delete()
    }
    if (Test-Path $sourceFile) {
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zipArchive, $sourceFile, $entryPath) | Out-Null
        Write-Host "  Updated asset: $entryPath" -ForegroundColor DarkGray
    }
}

# Delete old META-INF signatures
$entriesToDelete = @()
foreach ($entry in $zip.Entries) {
    if ($entry.FullName -like "META-INF/*.SF" -or $entry.FullName -like "META-INF/*.RSA" -or $entry.FullName -like "META-INF/*.DSA" -or $entry.FullName -like "META-INF/MANIFEST.MF") {
        $entriesToDelete += $entry
    }
}
foreach ($e in $entriesToDelete) {
    $e.Delete()
}

# Update assets
Update-ZipEntry $zip "assets/public/index.html" "D:\BrewPluse\android\app\src\main\assets\public\index.html"
Update-ZipEntry $zip "assets/public/storefront.png" "D:\BrewPluse\android\app\src\main\assets\public\storefront.png"
Update-ZipEntry $zip "assets/public/brewpluse-icon.svg" "D:\BrewPluse\android\app\src\main\assets\public\brewpluse-icon.svg"
Update-ZipEntry $zip "assets/public/brewpluse-logo.svg" "D:\BrewPluse\android\app\src\main\assets\public\brewpluse-logo.svg"
Update-ZipEntry $zip "assets/capacitor.config.json" "D:\BrewPluse\android\app\src\main\assets\capacitor.config.json"

$zip.Dispose()
Write-Host "[2/5] Embedded Customer UI, Storefront & SVG Assets successfully!" -ForegroundColor Green

# 4. ZipAlign APK (4-byte alignment)
if (Test-Path $alignedApk) { Remove-Item $alignedApk -Force }
Write-Host "[3/5] Aligning APK with zipalign..." -ForegroundColor Green
& "$buildToolsDir\zipalign.exe" -f -p 4 $tempUnsigned $alignedApk

# 5. Sign with apksigner using debug.keystore
Write-Host "[4/5] Signing APK with apksigner (v1, v2, v3)..." -ForegroundColor Green
$apksignerCmd = "$buildToolsDir\apksigner.bat"
$javaHome = "$toolsDir\jdk17\jdk-17.0.20.1+1"
$env:JAVA_HOME = $javaHome
$env:PATH = "$javaHome\bin;$env:PATH"

& cmd /c "$apksignerCmd sign --ks `"$keystore`" --ks-pass pass:android --ks-key-alias androiddebugkey --key-pass pass:android `"$alignedApk`""

# 6. Verify signature
Write-Host "[5/5] Verifying APK signature..." -ForegroundColor Green
& cmd /c "$apksignerCmd verify --verbose `"$alignedApk`""

# 7. Copy to final destinations
Copy-Item $alignedApk $finalApk -Force
Copy-Item $alignedApk $webPublicApk -Force
Remove-Item $tempUnsigned -Force -ErrorAction SilentlyContinue
Remove-Item $alignedApk -Force -ErrorAction SilentlyContinue

$apkSize = (Get-Item $finalApk).Length / 1MB
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  APK BUILD SUCCESSFUL!" -ForegroundColor Yellow
Write-Host "  Location 1: $finalApk ($([math]::Round($apkSize, 2)) MB)" -ForegroundColor White
Write-Host "  Location 2: $webPublicApk" -ForegroundColor White
Write-Host "============================================================" -ForegroundColor Cyan
