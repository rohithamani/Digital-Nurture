@echo off
set /p msg="Enter commit message: "
git add .
git commit -m "%msg%"
git pull origin main --allow-unrelated-histories --no-edit
git push origin main
pause
