#!/usr/bin/env python3

import paramiko
import os
import time

# Server details
SERVER_IP = "5.181.218.15"
SERVER_USER = "root"
SERVER_PASSWORD = "&8KXC4D+Ojfhuu0LSMhE"
SERVER_PATH = "/var/www/vhosts/vivaindia.com/ienet.online"
LOCAL_FILE = "EXACT_SAME_PRODUCTION_SERVER.cjs"
REMOTE_FILE = "mysql-production-server.cjs"

def connect_and_fix_server():
    try:
        # Create SSH client
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        
        print(f"Connecting to {SERVER_IP}...")
        ssh.connect(SERVER_IP, username=SERVER_USER, password=SERVER_PASSWORD)
        
        # Create SFTP client for file transfer
        sftp = ssh.open_sftp()
        
        print("Backing up current server file...")
        try:
            ssh.exec_command(f"cd {SERVER_PATH} && cp {REMOTE_FILE} {REMOTE_FILE}.backup")
        except:
            pass
        
        print("Uploading new server file...")
        sftp.put(LOCAL_FILE, f"{SERVER_PATH}/{REMOTE_FILE}")
        
        print("Stopping old server...")
        ssh.exec_command("pkill -f node")
        time.sleep(2)
        
        print("Starting new server...")
        stdin, stdout, stderr = ssh.exec_command(f"cd {SERVER_PATH} && nohup node {REMOTE_FILE} > server.log 2>&1 &")
        time.sleep(3)
        
        print("Checking server status...")
        stdin, stdout, stderr = ssh.exec_command("ps aux | grep node")
        processes = stdout.read().decode()
        print("Node processes:")
        print(processes)
        
        print("Checking server log...")
        stdin, stdout, stderr = ssh.exec_command(f"cd {SERVER_PATH} && tail -10 server.log")
        log_output = stdout.read().decode()
        print("Server log:")
        print(log_output)
        
        # Test the server
        print("Testing API endpoint...")
        stdin, stdout, stderr = ssh.exec_command('curl -s "https://www.ienet.online/api/health"')
        api_response = stdout.read().decode()
        print("API Response:")
        print(api_response)
        
        sftp.close()
        ssh.close()
        
        print("✅ Production server update complete!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

if __name__ == "__main__":
    if os.path.exists(LOCAL_FILE):
        connect_and_fix_server()
    else:
        print(f"❌ Local file {LOCAL_FILE} not found!")