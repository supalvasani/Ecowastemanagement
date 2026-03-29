import express from "express";
import cors from "cors";
import "dotenv/config";
import authRoutes from "./src/routes/authRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("API running"));

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));