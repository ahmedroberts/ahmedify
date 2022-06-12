# Ahmed's Port Checking Script June 12, 2022
# netstat -ano | findstr 3000
# 
# -a – Displays all connections and listening ports.
# -o – Displays the owning process ID associated with each connection.
# -n – Displays addresses and port numbers in numerical form.
#
# taskkill /F /PID <processid# e.g. 12345>

# TCP
# Get-Process -Id (Get-NetTCPConnection -LocalPort YourPortNumberHere).OwningProcess
# UDP
# Get-Process -Id (Get-NetUDPEndpoint -LocalPort YourPortNumberHere).OwningProcess

$localhostServerProcess = Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
$localhostServerProcess

$localhostServerProcess | Stop-Process
Write-Output 'Process Stopped'