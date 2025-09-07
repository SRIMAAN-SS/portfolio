# 🚀 Vercel Deployment Guide

## Prerequisites

1. **GitHub Account** (free)
2. **Vercel Account** (free)
3. **Firebase Project** (already set up)

## Step 1: Prepare Your Project

### 1.1 Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `portfolio` or `srimaan-portfolio`
3. Make it public (required for free Vercel hosting)

### 1.2 Upload Your Code to GitHub
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial portfolio commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 2: Deploy to Vercel

### 2.1 Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click "New Project"
4. Import your GitHub repository

### 2.2 Configure Vercel
- **Framework Preset**: Other
- **Root Directory**: `./` (leave as default)
- **Build Command**: Leave empty (not needed)
- **Output Directory**: Leave empty (not needed)

### 2.3 Environment Variables
In Vercel dashboard, go to Settings → Environment Variables and add:

```
GOOGLE_APPLICATION_CREDENTIALS = ./server/serviceAccountKey.json
FIREBASE_PROJECT_ID = srimaan-portfolio
```

### 2.4 Deploy
Click "Deploy" and wait for deployment to complete!

## Step 3: Upload Firebase Service Account Key

### 3.1 Upload to Vercel
1. Go to your Vercel project dashboard
2. Go to Settings → Functions
3. Upload your `serviceAccountKey.json` file to the server directory

### 3.2 Alternative: Use Environment Variables
Instead of uploading the file, you can:
1. Copy the contents of `serviceAccountKey.json`
2. Add it as an environment variable in Vercel
3. Update your `firebase-config.js` to read from environment variable

## Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## 🎉 Your Portfolio is Live!

Your portfolio will be available at:
- `https://your-project-name.vercel.app`
- Or your custom domain if configured

## 📝 Editing After Deployment

### Method 1: Local Development (Recommended)
1. Make changes on your local computer
2. Test with `npm start`
3. Commit and push to GitHub
4. Vercel automatically redeploys

### Method 2: Direct GitHub Editing
1. Edit files directly on GitHub.com
2. Commit changes
3. Vercel automatically redeploys

## 🔧 Troubleshooting

### Common Issues:
1. **Build Fails**: Check that all dependencies are in package.json
2. **Firebase Not Working**: Ensure serviceAccountKey.json is uploaded
3. **API Routes Not Working**: Check vercel.json configuration

### Support:
- Vercel Documentation: https://vercel.com/docs
- Vercel Community: https://github.com/vercel/vercel/discussions

## 🎯 Next Steps

1. **Test Your Live Site**: Visit your Vercel URL
2. **Test Contact Form**: Submit a test message
3. **Check Firebase**: Verify data is being saved
4. **Custom Domain**: Add your own domain name
5. **Analytics**: Add Google Analytics or Vercel Analytics

Your portfolio is now live and professional! 🚀
