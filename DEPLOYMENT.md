# Deployment Guide for Clinic Management System

This guide will help you deploy the Clinic Management System to Vercel.

## Prerequisites

1. MongoDB Atlas account (or any MongoDB hosting service)
2. Vercel account
3. GitHub account (recommended for easy deployment)

## Backend Deployment

### Step 1: Prepare Backend for Deployment

1. **Set up MongoDB Atlas:**
   - Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
   - Create a new cluster
   - Get your connection string (MONGO_URI)
   - Whitelist IP addresses (or use 0.0.0.0/0 for all IPs in development)

2. **Deploy Backend to Vercel:**
   - Go to your Vercel dashboard
   - Click "Add New Project"
   - Import your repository
   - Set the root directory to `backend`
   - Configure build settings:
     - Build Command: Leave empty (or `npm install` if needed)
     - Output Directory: Leave empty
     - Install Command: `npm install`
   - Add Environment Variables:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_strong_random_secret_key
     JWT_EXPIRES_IN=3d
     FRONTEND_URL=https://your-frontend-url.vercel.app
     PORT=5000
     NODE_ENV=production
     ```
   - Deploy

3. **Note:** Vercel is primarily for serverless functions. For a full Express backend, consider:
   - **Alternative 1:** Deploy backend to Railway, Render, or Heroku
   - **Alternative 2:** Use Vercel Serverless Functions (requires code restructuring)

### Recommended: Deploy Backend to Railway or Render

**Railway:**
1. Go to https://railway.app
2. Create new project
3. Connect your GitHub repo
4. Select backend folder
5. Add environment variables
6. Deploy

**Render:**
1. Go to https://render.com
2. Create new Web Service
3. Connect your GitHub repo
4. Set root directory to `backend`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables
8. Deploy

## Frontend Deployment

### Step 2: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard:**
   - Click "Add New Project"
   - Import your repository
   - Set the root directory to `frontend`

2. **Configure Build Settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Add Environment Variables:**
   ```
   VITE_API_BASE_URL=https://your-backend-url.railway.app
   ```
   (Replace with your actual backend URL)

4. **Deploy**

## Environment Variables Summary

### Backend (.env)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
JWT_SECRET=your_very_strong_secret_key_here_minimum_32_characters
JWT_EXPIRES_IN=3d
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```
VITE_API_BASE_URL=https://your-backend-url.railway.app
```

## Post-Deployment Checklist

- [ ] Backend is deployed and accessible
- [ ] Frontend environment variable `VITE_API_BASE_URL` points to backend
- [ ] Backend environment variable `FRONTEND_URL` points to frontend
- [ ] MongoDB connection is working
- [ ] CORS is properly configured
- [ ] Test login/signup functionality
- [ ] Test patient registration
- [ ] Test report creation
- [ ] Test all API endpoints

## Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your frontend URL exactly
- Check that CORS allows your frontend origin

### API Connection Issues
- Verify `VITE_API_BASE_URL` is set correctly in frontend
- Check backend logs for errors
- Ensure backend is running and accessible

### MongoDB Connection Issues
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist
- Ensure database user has proper permissions

## Notes

- The frontend uses Vite, which requires environment variables to be prefixed with `VITE_`
- Backend CORS is configured to allow the frontend URL
- All API calls use the centralized `createApiEndpoint` function
- Make sure to update environment variables in your hosting platform's dashboard

