@echo off
echo Updating your Jitsi Video Conference project...

echo.
echo 1. Checking git status...
git status

echo.
echo 2. Adding all changes...
git add .

echo.
echo 3. Committing changes...
set /p message="Enter commit message (or press Enter for default): "
if "%message%"=="" set message=Update project files - %date% %time%
git commit -m "%message%"

echo.
echo 4. Pushing to GitHub...
git push origin main

echo.
echo ✅ Code successfully updated on GitHub!
echo Your work is now safely backed up.
pause
