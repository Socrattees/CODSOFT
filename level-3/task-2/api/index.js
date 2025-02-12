import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import "dotenv/config";
import helmet from "helmet";
import path from "path";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/users.js";
import projectRoute from "./routes/projects.js";
import taskRoute from "./routes/tasks.js";
import { fileURLToPath } from "url";
import multer from "multer";

const app = express();

// Database connection to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to mongoDB");
});

// Allows server to serve static files in order to access and display images
const __filename = fileURLToPath(import.meta.url); // Arg contains URL of current module and converts to file path
const __dirname = path.dirname(__filename); // Extracts directory from the file path
app.use("/", express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// Store profile pictures in the public folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/profilePictures");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage });

// Upload profile picture
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/projects", projectRoute);
app.use("/api/tasks", taskRoute);

// Server
app.listen(8800, () => {
  console.log("api server is running...");
});