@echo off
echo ========================================
echo  Deutsch-Lernen - Inject Logging
echo ========================================

:: Thu Python launcher truoc
py inject_logging.py
if %errorlevel% == 0 goto done

:: Thu python
python inject_logging.py
if %errorlevel% == 0 goto done

:: Thu python3
python3 inject_logging.py
if %errorlevel% == 0 goto done

echo.
echo [ERROR] Python khong duoc cai dat!
echo Vao https://www.python.org/downloads/ cai Python roi chay lai.
pause
exit /b 1

:done
echo.
echo Xong! Kiem tra cac file roi git push len GitHub.
pause
