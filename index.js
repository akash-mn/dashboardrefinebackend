import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js";

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Routes with file
app.use("/api/v1/users", userRouter);
app.use("/api/v1/dashboard", propertyRouter);

// Mongose Setup
const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Adjust the timeout as needed

}).then(()=>{
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((error)=>{
   console.error(`${error} did not connect`)
})
