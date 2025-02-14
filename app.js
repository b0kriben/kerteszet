import express from "express";
import cors from "cors";
import { initializeDB } from "./database.js";
import plantsRouter from "./routes/plants.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/plants", plantsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
});

const startServer = async () => {
    await initializeDB();
    app.listen(3000, () => console.log("Server is running on port 3000"));
};

startServer();

