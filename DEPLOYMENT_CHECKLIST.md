# Deployment Checklist

Use this checklist to ensure your project is ready for deployment.

## Pre-Deployment

### Backend
- [x] All hardcoded URLs replaced with base URL configuration
- [x] CORS configured for production
- [x] Environment variables documented in `.env.example`
- [x] MongoDB connection string ready
- [x] JWT secret key generated (strong, random)
- [x] Server listens on PORT environment variable

### Frontend
- [x] All hardcoded API URLs replaced with `createApiEndpoint()`
- [x] API base URL configuration created (`src/config/api.js`)
- [x] Environment variables documented
- [x] `vercel.json` created for Vercel deployment
- [x] Build command configured (`npm run build`)

## Deployment Steps

### 1. Backend Deployment (Railway/Render recommended)

**Option A: Railway**
1. [ ] Create Railway account
2. [ ] Create new project
3. [ ] Connect GitHub repository
4. [ ] Set root directory to `backend`
5. [ ] Add environment variables:
   - [ ] `MONGO_URI`
   - [ ] `JWT_SECRET`
   - [ ] `JWT_EXPIRES_IN=3d`
   - [ ] `FRONTEND_URL` (your Vercel frontend URL)
   - [ ] `NODE_ENV=production`
6. [ ] Deploy
7. [ ] Copy backend URL (e.g., `https://your-app.railway.app`)

**Option B: Render**
1. [ ] Create Render account
2. [ ] Create new Web Service
3. [ ] Connect GitHub repository
4. [ ] Set root directory to `backend`
5. [ ] Build command: `npm install`
6. [ ] Start command: `npm start`
7. [ ] Add environment variables (same as Railway)
8. [ ] Deploy
9. [ ] Copy backend URL

### 2. Frontend Deployment (Vercel)

1. [ ] Create Vercel account
2. [ ] Import GitHub repository
3. [ ] Set root directory to `frontend`
4. [ ] Framework preset: Vite
5. [ ] Build command: `npm run build`
6. [ ] Output directory: `dist`
7. [ ] Add environment variable:
   - [ ] `VITE_API_BASE_URL` = your backend URL from step 1
8. [ ] Deploy
9. [ ] Copy frontend URL (e.g., `https://your-app.vercel.app`)

### 3. Update Backend CORS

1. [ ] Go back to backend deployment settings
2. [ ] Update `FRONTEND_URL` environment variable with your Vercel frontend URL
3. [ ] Redeploy backend

## Post-Deployment Testing

- [ ] Frontend loads without errors
- [ ] Can access login/signup page
- [ ] Can create new user account
- [ ] Can login with credentials
- [ ] Can view dashboard
- [ ] Can register a patient
- [ ] Can view patient list
- [ ] Can create a medical report
- [ ] Can view reports in dashboard
- [ ] Can update patient status
- [ ] All API calls work correctly
- [ ] No CORS errors in browser console
- [ ] No 404 errors for routes

## Environment Variables Reference

### Backend (.env)
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_strong_secret_key_minimum_32_chars
JWT_EXPIRES_IN=3d
FRONTEND_URL=https://your-frontend.vercel.app
PORT=5000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_BASE_URL=https://your-backend.railway.app
```

## Troubleshooting

### Issue: CORS Errors
**Solution:** 
- Verify `FRONTEND_URL` in backend matches frontend URL exactly
- Check browser console for exact error
- Ensure backend CORS allows your frontend origin

### Issue: API Connection Failed
**Solution:**
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend is running and accessible
- Test backend URL directly in browser
- Check backend logs for errors

### Issue: MongoDB Connection Failed
**Solution:**
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist (add 0.0.0.0/0 for all IPs)
- Verify database user has proper permissions
- Check MongoDB Atlas network access settings

### Issue: Build Fails
**Solution:**
- Check Node.js version (should be 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors
- Ensure environment variables are set

## Notes

- Vercel automatically sets `NODE_ENV=production` in production
- Frontend environment variables must be prefixed with `VITE_` to be accessible
- Backend should be deployed first, then frontend
- Update backend `FRONTEND_URL` after frontend is deployed
- Keep your `.env` files secure and never commit them to Git

