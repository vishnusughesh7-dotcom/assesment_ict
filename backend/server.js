import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((item) => item.trim())
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "ok", service: "Venuora API" });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

app.use("/api/events", eventRoutes);

const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing. Create backend/.env using backend/.env.example.");
    }
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Venuora API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

start();