#!/usr/bin/env python3

import paramiko
import time

SERVER_IP = "5.181.218.15"
SERVER_USER = "root"
SERVER_PASSWORD = "&8KXC4D+Ojfhuu0LSMhE"
SERVER_PATH = "/var/www/vhosts/vivaindia.com/ienet.online"

def debug_database():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(SERVER_IP, username=SERVER_USER, password=SERVER_PASSWORD)
        
        print("Debugging database queries...")
        
        # Check if the service exists
        print("\n1. Checking for search-engine-optimization service:")
        stdin, stdout, stderr = ssh.exec_command('mysql -u netiedb -p"h5pLF9833" -h 5.181.218.15 ienetdb -e "SELECT id, name, slug, category_id FROM services WHERE slug = \\"search-engine-optimization\\" LIMIT 5;"')
        result = stdout.read().decode()
        print(result)
        
        # Check category digital-marketing-seo 
        print("\n2. Checking for digital-marketing-seo category:")
        stdin, stdout, stderr = ssh.exec_command('mysql -u netiedb -p"h5pLF9833" -h 5.181.218.15 ienetdb -e "SELECT id, name, slug FROM service_categories WHERE slug = \\"digital-marketing-seo\\";"')
        result = stdout.read().decode()
        print(result)
        
        # Check all SEO services
        print("\n3. Checking all SEO-related services:")
        stdin, stdout, stderr = ssh.exec_command('mysql -u netiedb -p"h5pLF9833" -h 5.181.218.15 ienetdb -e "SELECT s.id, s.name, s.slug, c.slug as category_slug FROM services s JOIN service_categories c ON s.category_id = c.id WHERE s.slug LIKE \\"%seo%\\" OR s.name LIKE \\"%SEO%\\" LIMIT 10;"')
        result = stdout.read().decode()
        print(result)
        
        # Check features table structure
        print("\n4. Checking features table for service ID 133:")
        stdin, stdout, stderr = ssh.exec_command('mysql -u netiedb -p"h5pLF9833" -h 5.181.218.15 ienetdb -e "SELECT COUNT(*) as feature_count FROM features WHERE service_id = 133;"')
        result = stdout.read().decode()
        print(result)
        
        ssh.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    debug_database()