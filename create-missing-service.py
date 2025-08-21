#!/usr/bin/env python3

import paramiko

SERVER_IP = "5.181.218.15"
SERVER_USER = "root"
SERVER_PASSWORD = "&8KXC4D+Ojfhuu0LSMhE"

def create_missing_service():
    try:
        ssh = paramiko.SSHClient()
        ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        ssh.connect(SERVER_IP, username=SERVER_USER, password=SERVER_PASSWORD)
        
        print("Creating missing 'search-engine-optimization' service...")
        
        # First get the digital-marketing-seo category ID
        stdin, stdout, stderr = ssh.exec_command('mysql -u netiedb -p"h5pLF9833" -h 5.181.218.15 ienetdb -e "SELECT id FROM service_categories WHERE slug = \\"digital-marketing-seo\\";"')
        result = stdout.read().decode()
        print("Category query result:", result)
        
        if "4" in result:
            category_id = 4
            
            # Insert the missing service
            print("Inserting search-engine-optimization service...")
            insert_cmd = f'''mysql -u netiedb -p"h5pLF9833" -h 5.181.218.15 ienetdb -e "INSERT INTO services (name, slug, description, category_id, is_active, sort_order) VALUES ('Search Engine Optimization', 'search-engine-optimization', 'Professional search engine optimization services with industry-leading expertise and proven results.', {category_id}, 1, 1) ON DUPLICATE KEY UPDATE name=VALUES(name);"'''
            
            stdin, stdout, stderr = ssh.exec_command(insert_cmd)
            result = stdout.read().decode()
            error = stderr.read().decode()
            
            print("Insert result:", result)
            print("Insert error:", error)
            
            # Verify the service was created
            stdin, stdout, stderr = ssh.exec_command('mysql -u netiedb -p"h5pLF9833" -h 5.181.218.15 ienetdb -e "SELECT id, name, slug FROM services WHERE slug = \\"search-engine-optimization\\";"')
            result = stdout.read().decode()
            print("Verification:", result)
        
        ssh.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_missing_service()