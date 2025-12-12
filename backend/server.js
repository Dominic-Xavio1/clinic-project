import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import patientRoutes from './routes/auth.js';
import testRoute from './routes/testRoute.js';
import authRoute from "./routes/auth.js"
dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
  : ['https://clinic-project-mu.vercel.app','http://localhost:5173', 'http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/register', patientRoutes);
app.use("/get",patientRoutes);
app.use("/auth",authRoute);
app.use('/test',testRoute)

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) {
    return next(new Error("Authentication required"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.userId;
    socket.join(String(decoded.userId));
    next();
  } catch (err) {
    next(err);
  }
});

io.on("connection", (socket) => {
  console.log("Socket connected", socket.userId);
  socket.on("disconnect", () => {
    console.log("Socket disconnected", socket.userId);
  });
});

app.set("io", io);


                    
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));