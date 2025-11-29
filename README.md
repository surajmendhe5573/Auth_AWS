# 🚀 AWS EC2 Node.js Deployment Guide (Professional README)

This guide explains how to deploy a **Node.js backend application** on an **AWS EC2 Ubuntu Server** using **PM2**, **NGINX**, and **SSL (HTTPS) with Certbot**.

---

# 📌 Overview

This deployment includes:

* EC2 setup & SSH access
* Installing Node.js, npm, git
* Cloning project from GitHub
* Running app with PM2 (process manager)
* Configuring NGINX as reverse proxy
* Setting up a custom domain
* Enabling HTTPS using Certbot
* Pulling updates from GitHub & restarting server

---

# 🔑 1. Connect to EC2 Server

Use your `.pem` key to SSH into the instance:

```bash
ssh -i "your-key.pem" ubuntu@EC2_PUBLIC_IP
```

---

# 🛠️ 2. Update Server & Install Packages

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git
```

Check versions:

```bash
node -v
npm -v
```

---

# 📂 3. Clone Your Project From GitHub

```bash
git clone YOUR_REPO_URL backend-aws
cd backend-aws/backend
```

Install dependencies:

```bash
npm install
```

---

# ⚙️ 4. Install & Use PM2 (Process Manager)

Install PM2 globally:

```bash
sudo npm install -g pm2
```

Start your backend:

```bash
pm2 start src/server.js --name backend -- --production
```

Restart anytime:

```bash
pm2 restart backend
```

Check logs:

```bash
pm2 logs backend
```

When instance restarts, start app again:

```bash
cd ~/backend-aws/backend
pm2 start src/server.js --name backend -- --production
```

---

# 🌐 5. Configure NGINX as Reverse Proxy

Install NGINX:

```bash
sudo apt install nginx -y
```

Open config file:

```bash
sudo nano /etc/nginx/sites-available/default
```

Paste the configuration:

```nginx
server {
    listen 80;
    server_name buzz.surajmendhe.xyz;

    location / {
        proxy_pass http://localhost:5000;   # Node.js port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Test NGINX config:

```bash
sudo nginx -t
```

Reload NGINX:

```bash
sudo systemctl reload nginx
sudo systemctl restart nginx
```

---

# 🌍 6. Connect Domain to EC2

Go to your domain DNS manager and add:

* `A record` → pointing to `EC2 public IP`

Example:

```
Type: A
Host: @
Value: EC2_PUBLIC_IP
TTL: Auto
```

---

# 🔐 7. Install SSL Certificate (HTTPS)

Install Certbot:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

Enable SSL for your domain:

```bash
sudo certbot --nginx -d buzz.surajmendhe.xyz

```


---

# 🔄 8. Pulling New Code From GitHub (After Updates)

```bash
cd ~/backend-aws/backend
git pull origin main
npm install
pm2 restart backend
```

---

# 🧪 9. Useful Commands

### Check NGINX status:

```bash
sudo systemctl status nginx
```

### Check running PM2 apps:

```bash
pm2 list
```

### Remove PM2 app:

```bash
pm2 delete backend
```

---

# 🎉 Deployment Completed!

You have successfully deployed a **production-ready Node.js backend** using:

* AWS EC2
* PM2
* NGINX reverse proxy
* Custom domain
* HTTPS (Certbot)

Your backend is now secure, stable, monitored, and scalable.

---

