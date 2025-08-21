#!/bin/bash

echo "🚀 DEPLOYING STATIC HTML PAGES - EMERGENCY SOLUTION"
echo "=================================================="

sshpass -p '&8KXC4D+Ojfhuu0LSMhE' ssh -o StrictHostKeyChecking=no root@5.181.218.15 << 'EOF'

cd /var/www/vhosts/vivaindia.com/ienet.online/httpdocs

echo "Creating static contact.html with correct title..."
cat > contact.html << 'CONTACT_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact IeNet - India Office</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 60px 0; text-align: center; margin: -40px -40px 40px -40px; }
        .header h1 { font-size: 48px; margin: 0; }
        .contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; margin: 40px 0; }
        .contact-item { background: #f8f9fa; padding: 30px; border-radius: 10px; text-align: center; }
        .contact-item h3 { color: #333; margin-bottom: 15px; }
        .contact-item p { color: #666; margin: 5px 0; }
        .address { font-weight: bold; color: #2c3e50; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Contact IeNet</h1>
            <p>Ready to transform your business with cutting-edge technology? Get in touch with our expert team for a free consultation and project quote.</p>
        </div>
        
        <div class="contact-grid">
            <div class="contact-item">
                <h3>📧 Email Us</h3>
                <p>info.indiaespectacular@gmail.com</p>
            </div>
            
            <div class="contact-item">
                <h3>📞 Call Us</h3>
                <p>+592 750-3901</p>
            </div>
            
            <div class="contact-item">
                <h3>🏢 Visit Our India Office</h3>
                <p class="address">101 SIYOL NAGAR, Laxman Nagar Road Via Chadi</p>
                <p class="address">Phalodi, JODHPUR 342312</p>
            </div>
            
            <div class="contact-item">
                <h3>🕒 Business Hours</h3>
                <p>Mon-Fri: 9AM-6PM IST</p>
                <p>Sat: 10AM-2PM IST</p>
            </div>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding: 20px; background: #e8f4fd; border-radius: 10px;">
            <h2>Get Your Free Quote Today!</h2>
            <p>Contact us through any of the methods above and we'll respond within 24 hours.</p>
        </div>
    </div>
</body>
</html>
CONTACT_EOF

echo "Creating static privacy.html..."
cat > privacy.html << 'PRIVACY_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - India Espectacular</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; }
        .header { background: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%); color: white; padding: 40px; text-align: center; margin: -40px -40px 40px -40px; }
        .section { margin: 30px 0; padding: 20px; border-left: 4px solid #2196F3; background: #f8f9fa; }
        .contact-info { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 30px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Privacy Policy</h1>
            <h2>India Espectacular</h2>
        </div>
        
        <div class="section">
            <h3>Company Information</h3>
            <p><strong>Company Name:</strong> India Espectacular</p>
            <p><strong>India Office Address:</strong><br>
            101 SIYOL NAGAR, Laxman Nagar Road Via Chadi<br>
            Phalodi, JODHPUR 342312</p>
        </div>
        
        <div class="section">
            <h3>Data Protection Compliance</h3>
            <p>India Espectacular is committed to protecting your privacy and personal data in accordance with Indian data protection laws and regulations.</p>
        </div>
        
        <div class="contact-info">
            <h3>Contact Us About Privacy</h3>
            <p><strong>Email:</strong> info.indiaespectacular@gmail.com</p>
            <p><strong>Phone:</strong> +592 750-3901</p>
            <p><strong>Business Hours:</strong> Mon-Fri: 9AM-6PM IST, Sat: 10AM-2PM IST</p>
        </div>
        
        <p><em>Last updated: August 21, 2025</em></p>
    </div>
</body>
</html>
PRIVACY_EOF

echo "Creating static terms.html..."
cat > terms.html << 'TERMS_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Terms of Service - India Espectacular</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; }
        .header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; padding: 40px; text-align: center; margin: -40px -40px 40px -40px; }
        .section { margin: 30px 0; padding: 20px; border-left: 4px solid #4CAF50; background: #f8f9fa; }
        .contact-info { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 30px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Terms of Service</h1>
            <h2>India Espectacular</h2>
        </div>
        
        <div class="section">
            <h3>Company Information</h3>
            <p><strong>Company Name:</strong> India Espectacular</p>
            <p><strong>India Office Address:</strong><br>
            101 SIYOL NAGAR, Laxman Nagar Road Via Chadi<br>
            Phalodi, JODHPUR 342312</p>
        </div>
        
        <div class="section">
            <h3>Governing Law</h3>
            <p>These terms are governed by the laws of India. Any disputes will be resolved through the Jodhpur District Courts, Rajasthan, India.</p>
        </div>
        
        <div class="contact-info">
            <h3>Questions About These Terms?</h3>
            <p><strong>Email:</strong> info.indiaespectacular@gmail.com</p>
            <p><strong>Phone:</strong> +592 750-3901</p>
            <p><strong>Business Hours:</strong> Mon-Fri: 9AM-6PM IST, Sat: 10AM-2PM IST</p>
        </div>
        
        <p><em>Last updated: August 21, 2025</em></p>
    </div>
</body>
</html>
TERMS_EOF

echo "Creating static refund.html..."
cat > refund.html << 'REFUND_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Refund Policy - India Espectacular</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1000px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; }
        .header { background: linear-gradient(135deg, #e91e63 0%, #ad1457 100%); color: white; padding: 40px; text-align: center; margin: -40px -40px 40px -40px; }
        .section { margin: 30px 0; padding: 20px; border-left: 4px solid #e91e63; background: #f8f9fa; }
        .contact-info { background: #fce4ec; padding: 20px; border-radius: 8px; margin: 30px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Cancellation & Refund Policy</h1>
            <h2>India Espectacular</h2>
        </div>
        
        <div class="section">
            <h3>Company Information</h3>
            <p><strong>Company Name:</strong> India Espectacular</p>
            <p><strong>India Office Address:</strong><br>
            101 SIYOL NAGAR, Laxman Nagar Road Via Chadi<br>
            Phalodi, JODHPUR 342312</p>
        </div>
        
        <div class="section">
            <h3>Refund Policy</h3>
            <p>Our refund policy is governed by the Indian Consumer Protection Act, 2019 and RBI payment guidelines.</p>
            <p>Jurisdiction: Jodhpur District Consumer Forum, Rajasthan</p>
        </div>
        
        <div class="contact-info">
            <h3>Request a Refund</h3>
            <p><strong>Email:</strong> info.indiaespectacular@gmail.com</p>
            <p><strong>Phone:</strong> +592 750-3901</p>
            <p><strong>Business Hours:</strong> Mon-Fri: 9AM-6PM IST, Sat: 10AM-2PM IST</p>
        </div>
        
        <p><em>Last updated: August 21, 2025</em></p>
    </div>
</body>
</html>
REFUND_EOF

echo "Setting permissions..."
chmod 755 *.html
chown nginx:nginx *.html 2>/dev/null || chown apache:apache *.html 2>/dev/null || echo "Permission setting attempted"

echo "Files created:"
ls -la *.html

echo "✅ Static HTML pages deployed!"

EOF

echo ""
echo "🧪 Testing static pages..."
echo "Contact page test:"
curl -o /dev/null -s -w "HTTP %{http_code}\n" https://www.ienet.online/contact.html

echo "Contact page content:"
curl -s https://www.ienet.online/contact.html | grep -i "contact" | head -2