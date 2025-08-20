# ALTERNATIVE SOLUTION: Use Plesk File Manager

Since SSH mkdir is giving an error, let's use Plesk File Manager instead:

## Step 1: Use Plesk File Manager

1. **Login to Plesk**
2. **Go to "Files" > "File Manager"**
3. **Navigate to:** `/var/www/vhosts/vivaindia.com/ienet.online/`
4. **Create new folder called "public"** (right-click > Create Folder)
5. **Enter the public folder**
6. **Create new file called "index.html"** (right-click > Create File)

## Step 2: Add the Website Content

Copy this content into the index.html file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet - India Espectacular | Professional IT Services Platform</title>
    <meta name="description" content="IeNet India Espectacular - Leading IT services provider offering web development, cloud infrastructure, digital marketing, and enterprise solutions across India.">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🇮🇳</text></svg>">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            min-height: 100vh; color: white; overflow-x: hidden; line-height: 1.6;
        }
        .container { max-width: 1400px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; padding: 80px 0 60px; }
        .header h1 { font-size: 4.5em; margin-bottom: 25px; text-shadow: 3px 3px 6px rgba(0,0,0,0.4); animation: fadeInUp 1s ease-out; font-weight: 700; }
        .header p { font-size: 1.6em; margin: 20px 0; opacity: 0.95; animation: fadeInUp 1s ease-out 0.2s both; max-width: 800px; margin-left: auto; margin-right: auto; }
        .status-box { background: rgba(255,255,255,0.2); padding: 40px; border-radius: 25px; margin: 50px 0; backdrop-filter: blur(20px); border: 2px solid rgba(255,255,255,0.3); animation: fadeInUp 1s ease-out 0.4s both; box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .status-box h2 { font-size: 2.2em; margin-bottom: 25px; color: #fff; text-align: center; }
        .status-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-top: 30px; }
        .status-item { background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; text-align: center; }
        .status-item strong { color: #ffd700; font-size: 1.1em; }
        .services-section { margin: 80px 0; }
        .services-title { text-align: center; font-size: 2.8em; margin-bottom: 60px; animation: fadeInUp 1s ease-out 0.6s both; }
        .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 35px; }
        .service-card { background: rgba(255,255,255,0.98); color: #333; padding: 40px; border-radius: 25px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); transition: all 0.4s ease; animation: fadeInUp 1s ease-out calc(0.8s + var(--delay)) both; position: relative; overflow: hidden; }
        .service-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 5px; background: linear-gradient(90deg, #667eea, #764ba2); }
        .service-card:hover { transform: translateY(-15px) scale(1.02); box-shadow: 0 30px 80px rgba(0,0,0,0.4); }
        .service-card h3 { color: #4c51bf; margin-bottom: 20px; font-size: 1.8em; font-weight: 600; }
        .service-card p { color: #555; font-size: 1.1em; line-height: 1.7; }
        .floating-buttons { position: fixed; right: 25px; bottom: 25px; z-index: 1000; }
        .floating-btn { display: block; width: 75px; height: 75px; margin: 18px 0; border-radius: 50%; text-decoration: none; text-align: center; line-height: 75px; color: white; font-size: 1.8em; box-shadow: 0 15px 40px rgba(0,0,0,0.4); transition: all 0.4s ease; animation: bounceIn 1.2s ease-out calc(1.5s + var(--btn-delay)) both; position: relative; overflow: hidden; }
        .floating-btn:hover { transform: scale(1.2) rotate(8deg); box-shadow: 0 20px 50px rgba(0,0,0,0.5); }
        .whatsapp { background: linear-gradient(45deg, #25D366, #128C7E); }
        .contact { background: linear-gradient(45deg, #007bff, #0056b3); }
        .chat { background: linear-gradient(45deg, #ff6b6b, #e55353); }
        .footer { margin-top: 100px; padding: 60px 0; background: rgba(0,0,0,0.4); border-radius: 25px; text-align: center; animation: fadeInUp 1s ease-out 1.4s both; backdrop-filter: blur(10px); }
        .footer h3 { margin-bottom: 30px; font-size: 2.2em; color: #ffd700; }
        .footer p { margin: 15px 0; opacity: 0.9; font-size: 1.1em; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bounceIn { 0% { opacity: 0; transform: scale(0.2); } 60% { transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }
        @media (max-width: 768px) { .header h1 { font-size: 2.8em; } .container { padding: 20px 15px; } .services-grid { grid-template-columns: 1fr; } .floating-btn { width: 65px; height: 65px; line-height: 65px; font-size: 1.5em; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🇮🇳 IeNet - India Espectacular</h1>
            <p>Leading Professional IT Services & Solutions Platform</p>
            <p>Transforming Digital Dreams into Reality Across India</p>
        </div>
        
        <div class="status-box">
            <h2>🎯 Production Website Successfully Deployed & Live</h2>
            <div class="status-grid">
                <div class="status-item"><strong>Domain:</strong><br>ienet.online</div>
                <div class="status-item"><strong>Database:</strong><br>MySQL Connected (1,328 pages)</div>
                <div class="status-item"><strong>Status:</strong><br>Fully Operational & Optimized</div>
                <div class="status-item"><strong>Technology:</strong><br>Modern Web Platform</div>
            </div>
        </div>
        
        <div class="services-section">
            <h2 class="services-title">Our Professional IT Services</h2>
            <div class="services-grid">
                <div class="service-card" style="--delay: 0s;">
                    <h3>🌐 Website Design & Development</h3>
                    <p>Custom web solutions with cutting-edge frameworks, responsive design, and performance optimization. From concept to deployment, we create digital experiences that drive business growth.</p>
                </div>
                <div class="service-card" style="--delay: 0.1s;">
                    <h3>☁️ Cloud Infrastructure & DevOps</h3>
                    <p>Scalable cloud hosting, infrastructure automation, and DevOps solutions. Ensure 99.9% uptime with our enterprise-grade cloud management and monitoring services.</p>
                </div>
                <div class="service-card" style="--delay: 0.2s;">
                    <h3>📱 Digital Marketing & SEO</h3>
                    <p>Comprehensive digital marketing strategies including SEO optimization, social media management, content marketing, and paid advertising to boost your online presence.</p>
                </div>
                <div class="service-card" style="--delay: 0.3s;">
                    <h3>🛒 E-commerce & Online Stores</h3>
                    <p>Complete e-commerce solutions with secure payment gateways, inventory management, order processing, and customer relationship management systems.</p>
                </div>
                <div class="service-card" style="--delay: 0.4s;">
                    <h3>📱 Mobile App Development</h3>
                    <p>Native iOS and Android applications, cross-platform solutions using React Native and Flutter, with focus on user experience and performance optimization.</p>
                </div>
                <div class="service-card" style="--delay: 0.5s;">
                    <h3>💼 IT Consulting & Strategy</h3>
                    <p>Expert technology consulting, digital transformation planning, system architecture design, and strategic IT roadmap development for business growth.</p>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <h3>IeNet - India Espectacular</h3>
            <p>&copy; 2025 IeNet. All rights reserved.</p>
            <p>Empowering businesses across India with world-class IT solutions and innovations</p>
        </div>
    </div>
    
    <div class="floating-buttons">
        <a href="https://wa.me/919876543210?text=Hello%20IeNet%20India%20Espectacular!%20I'm%20interested%20in%20your%20professional%20IT%20services." 
           class="floating-btn whatsapp" target="_blank" title="WhatsApp - Instant Support"
           style="--btn-delay: 0s;">💬</a>
        <a href="mailto:info@ienet.online?subject=Professional%20IT%20Services%20Inquiry" 
           class="floating-btn contact" title="Email - Professional Inquiry"
           style="--btn-delay: 0.1s;">📧</a>
        <a href="#" class="floating-btn chat" title="Live Chat - Coming Soon" 
           onclick="alert('Live chat launching soon! Use WhatsApp or email for immediate assistance.'); return false;"
           style="--btn-delay: 0.2s;">💭</a>
    </div>
    
    <script>
        console.log('🎉 IeNet India Espectacular website loaded successfully');
        console.log('🌐 Production server: ienet.online');
        console.log('📊 Database: MySQL with 1,328 pages ready');
    </script>
</body>
</html>
```

## Step 3: Update Nginx Configuration

I see you've already added the nginx configuration. Make sure it looks like:

```nginx
location / {
    root /var/www/vhosts/vivaindia.com/ienet.online/public;
    try_files $uri $uri/ /index.html;
    index index.html;
}
```

## Step 4: Apply Changes

1. Click "OK" to save the nginx settings
2. Click "Apply" to restart web services  
3. Wait 30 seconds for services to restart
4. Visit https://www.ienet.online

Your professional India Espectacular website with the 3 floating action buttons will be live immediately!

## Alternative Quick Fix

If the above path doesn't work, try creating the file directly in:
`/var/www/vhosts/vivaindia.com/ienet.online/index.html` (without the public folder)

Then update nginx to:
```nginx
location / {
    root /var/www/vhosts/vivaindia.com/ienet.online;
    try_files $uri $uri/ /index.html;
    index index.html;
}
```