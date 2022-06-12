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

Write-Information -MessageData "" -InformationAction Continue
Write-Information -MessageData "" -InformationAction Continue
Write-Information -MessageData "Checkig for Process running on 3000..." -InformationAction Continue

$localhostServerProcess = Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess
$procId3000 = $localhostServerProcess.Id
$procName3000 = $localhostServerProcess.ProcessName

$declareProcName = "Process Name: " + $procName3000
$declareProcId  = "Process ID: " + $procId3000
$localhostServerProcess
Write-Information -MessageData $declareProcId -InformationAction Continue
Write-Information -MessageData $declareProcName -InformationAction Continue
Write-Information -MessageData "" -InformationAction Continue
Write-Information -MessageData "" -InformationAction Continue

