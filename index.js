// server.js or app.js
import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json()); // Ensure the server can parse JSON
app.use(express.urlencoded({ extended: true, limit: "50kb" }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));


connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`SERVER STARTED AT PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb connection error", err);
  });
