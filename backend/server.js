
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed frontend URLs
const allowedOrigins = [
  "https://assesment-ict.vercel.app",
  "http://localhost:5173",
  ...(process.env.CLIENT_URL
    ? process.env.CLIENT_URL.split(",").map((item) => item.trim())
    : [])
];

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as health checks
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
  })
);

// Parse JSON request bodies
app.use(express.json());

// API home route
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "Venuora API"
  });
});

// Database health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected"
  });
});

// Event routes
app.use("/api/events", eventRoutes);

// Start server and connect to MongoDB
const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in Render environment variables.");
    }

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Venuora API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

start();
