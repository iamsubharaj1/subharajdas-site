# Deployment Guide: www.subharajdas.com

## Overview
This guide will help you deploy your professional website to your custom domain www.subharajdas.com using Replit Deployments and configure it with your GoDaddy domain.

## Step 1: Deploy on Replit

### 1.1 Create Replit Deployment
1. **Open the Deployments tab** in your Replit workspace
2. **Click "Create Deployment"**
3. **Choose "Autoscale"** for cost-effective hosting with automatic scaling
4. **Configure deployment settings:**
   - Build Command: `npm install`
   - Run Command: `npm start`
   - Port: `5000` (or auto-detect)
5. **Click "Deploy"** - Your app will be available at `[repl-name].replit.app`

### 1.2 Verify Deployment
- Check that your website loads at the default Replit URL
- Test all functionality (contact form, navigation, etc.)
- Verify database connection is working

## Step 2: Configure Custom Domain in Replit

### 2.1 Link Your Domain
1. **In Deployments tab** → **Settings** → **Link a domain**
2. **Enter your domain:** `www.subharajdas.com`
3. **Copy the DNS records** provided by Replit:
   - **A Record**: `@` or `www` → `[IP Address from Replit]`
   - **TXT Record**: `@` → `replit-user-[your-username]`

## Step 3: Configure GoDaddy DNS

### 3.1 Access GoDaddy DNS Management
1. **Login to GoDaddy** → **My Products**
2. **Find your domain** `subharajdas.com`
3. **Click "DNS"** or **"Manage DNS"**

### 3.2 Add DNS Records
1. **Add A Record for www:**
   - Type: `A`
   - Name: `www`
   - Value: `[IP from Replit]`
   - TTL: `600` (10 minutes)

2. **Add A Record for root domain (optional):**
   - Type: `A`
   - Name: `@`
   - Value: `[IP from Replit]`
   - TTL: `600`

3. **Add TXT Record for verification:**
   - Type: `TXT`
   - Name: `@`
   - Value: `replit-user-[your-username]`
   - TTL: `600`

### 3.3 Remove Conflicting Records
- **Delete any existing A records** pointing to other IPs
- **Remove parking page records** if present
- **Keep MX records** for email (if you use GoDaddy email)

## Step 4: SSL Certificate & Verification

### 4.1 Wait for DNS Propagation
- **Typical time:** 5-30 minutes
- **Maximum time:** Up to 48 hours
- **Check status:** Use online DNS propagation checkers

### 4.2 Verify in Replit
1. **Return to Replit** Deployments → Domain settings
2. **Check verification status** - should show "Verified"
3. **SSL certificate** will be automatically issued by Let's Encrypt

## Step 5: Environment Variables & Database

### 5.1 Production Environment Variables
Your existing environment variables will carry over:
- `DATABASE_URL` - PostgreSQL connection
- `NODE_ENV=production`
- Any other secrets you've configured

### 5.2 Database Access
- Your PostgreSQL database is already configured
- Connection string is automatically available in production
- No additional setup required

## Step 6: Final Testing

### 6.1 Test Your Live Site
1. **Visit** `https://www.subharajdas.com`
2. **Verify all sections load:**
   - Hero with your photo
   - Experience timeline
   - Skills showcase
   - Testimonials
   - LinkedIn showcase
   - Contact form functionality
3. **Test contact form** - submissions should save to database
4. **Check mobile responsiveness**

### 6.2 Performance Verification
- **SSL Certificate:** Should show secure (🔒) in browser
- **Load speed:** Should be fast due to Replit's CDN
- **Database connectivity:** Contact form submissions work

## Step 7: Optional Enhancements

### 7.1 Add Root Domain Redirect
If you want `subharajdas.com` to redirect to `www.subharajdas.com`:
1. Add CNAME record in GoDaddy: `@` → `www.subharajdas.com`
2. Or add A record: `@` → `[same IP as www]`

### 7.2 Professional Email Setup
Consider setting up professional email:
- `contact@subharajdas.com`
- Use GoDaddy email or Google Workspace

## Troubleshooting

### Common Issues

**Domain not verifying:**
- Double-check DNS records match exactly
- Wait longer for DNS propagation
- Clear browser cache

**Site not loading:**
- Verify A record points to correct IP
- Check if GoDaddy has parking page blocking
- Ensure no conflicting DNS records

**SSL certificate not working:**
- Wait 24 hours for automatic SSL provisioning
- Ensure domain is fully verified first

**Database connection errors:**
- Check environment variables in deployment
- Verify DATABASE_URL is present
- Test database connectivity in Replit console

### Support Resources
- **Replit Docs:** docs.replit.com/cloud-services/deployments
- **GoDaddy Support:** help.godaddy.com
- **DNS Checker:** whatsmydns.net

## Costs

### Replit Hosting
- **Autoscale Deployment:** ~$0.20/day per active day
- **PostgreSQL Database:** Usage-based pricing
- **SSL Certificate:** Free (Let's Encrypt)

### GoDaddy
- **Domain renewal:** ~$15-20/year
- **DNS management:** Free

## Maintenance

### Regular Tasks
- **Monitor deployment** in Replit dashboard
- **Update content** as needed (LinkedIn posts, experience)
- **Renew domain** annually through GoDaddy
- **Review database usage** monthly

### Updates & Changes
- **Code changes:** Push to Replit → Auto-redeploy
- **Domain changes:** Update DNS in GoDaddy
- **Database changes:** Use Replit database tools

---

## Quick Deployment Checklist

- [ ] Deploy on Replit
- [ ] Copy DNS records from Replit
- [ ] Add A and TXT records in GoDaddy
- [ ] Remove conflicting DNS records
- [ ] Wait for DNS propagation (5-30 minutes)
- [ ] Verify domain in Replit
- [ ] Test website at www.subharajdas.com
- [ ] Verify SSL certificate
- [ ] Test contact form functionality
- [ ] Set up analytics (optional)

**Estimated total time:** 30-60 minutes (plus DNS propagation wait time)

Your professional website will be live at www.subharajdas.com showcasing your operations expertise, testimonials, and LinkedIn presence!