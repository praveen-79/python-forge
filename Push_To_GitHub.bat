@echo off
echo ========================================================
echo   PUSHING PYTHON FORGE TO GITHUB
echo ========================================================
echo.
git push -u origin main
echo.
if %ERRORLEVEL% EQU 0 (
  echo [SUCCESS] Python Forge successfully pushed to GitHub!
) else (
  echo [NOTE] If the remote repository does not exist yet:
  echo 1. Go to https://github.com/new
  echo 2. Create a repository named "python-forge"
  echo 3. Run this script again!
)
echo.
pause
