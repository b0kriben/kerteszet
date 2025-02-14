import express from "express";
import { dbQuery, dbRun } from "../database.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const plants = await dbQuery("SELECT * FROM plants;");
        res.status(200).json(plants);
    } catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const [plant] = await dbQuery("SELECT * FROM plants WHERE id = ?;", [req.params.id]);
        if (!plant) return res.status(404).json({ message: "Plant not found" });
        res.status(200).json(plant);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const result = await dbRun("INSERT INTO plants (name, parennial, category, price) VALUES (?, ?, ?, ?);", [req.body.name, req.body.parennial, req.body.category, req.body.price]);
        res.status(201).json({ id: result.lastID, ...req.body });
    } catch (err) {
        next(err);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const [plant] = await dbQuery("SELECT * FROM plants WHERE id = ?;", [req.params.id]);
        if (!plant) return res.status(404).json({ message: "Plant not found" });

        await dbRun("UPDATE plants SET name = ?, parennial = ?, category = ?, price = ?, WHERE id = ?;", 
            [   req.body.name || user.name, 
                req.body.parennial || user.parennial, 
                req.body.category || user.category, 
                req.body.price || user.price, 
                req.params.id]);
        res.status(200).json({ id: req.params.id, 
                                name: req.body.name || user.name,
                                parennial: req.body.parennial || user.parennial,
                                category: req.body.category || user.category,
                                price: req.body.price || user.price,
                                /*...req.body*/ });
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const [plant] = await dbQuery("SELECT * FROM plants WHERE id = ?;", [req.params.id]);
        if (!plant) return res.status(404).json({ message: "Plant not found" });

        await dbRun("DELETE FROM plants WHERE id = ?;", [req.params.id]);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

export default router;
