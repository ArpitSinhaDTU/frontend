$ErrorActionPreference = "Stop"
Write-Host "Downloading FFmpeg..."
Invoke-WebRequest -Uri "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" -OutFile "ffmpeg.zip"
Write-Host "Extracting FFmpeg..."
Expand-Archive -Path "ffmpeg.zip" -DestinationPath "ffmpeg_ext" -Force
$ffmpegExe = (Get-ChildItem -Path "ffmpeg_ext" -Filter "ffmpeg.exe" -Recurse).FullName
Write-Host "FFmpeg executable found at: $ffmpegExe"

$files = Get-ChildItem "public\*.mp4", "public\*.webm"
foreach ($file in $files) {
    $inputFile = $file.FullName
    $outputFile = "$($file.DirectoryName)\$($file.BaseName).tmp.mp4"
    Write-Host "Compressing $($file.Name) from $([math]::Round($file.Length / 1MB, 2)) MB..."
    & $ffmpegExe -y -i $inputFile -vf "scale=-2:480,fps=15" -vcodec libx264 -crf 32 -preset veryfast -an $outputFile
    if ($LASTEXITCODE -eq 0 -and (Test-Path $outputFile)) {
        Remove-Item -Path $inputFile -Force
        # If original was webm, rename the new one to .mp4 but keep the same name if it was mp4. 
        # Actually, let's keep the original extension so imports don't break.
        Rename-Item -Path $outputFile -NewName $file.Name -Force
        Write-Host "Successfully compressed $($file.Name)"
    } else {
        Write-Host "Failed to compress $($file.Name)"
    }
}
Write-Host "Cleaning up FFmpeg..."
Remove-Item -Path "ffmpeg.zip" -Force
Remove-Item -Path "ffmpeg_ext" -Recurse -Force
Write-Host "Compression finished."
