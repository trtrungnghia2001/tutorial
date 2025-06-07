import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/products", productRoutes);

const start = async () => {
  await connectDB();
  app.listen(process.env.PORT, () => {
    console.log(`Product service running on port ${process.env.PORT}`);
  });
};

start();
