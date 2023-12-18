import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    // Return all workouts
});

router.get("/:id", (req, res) => {
    // Return one workout
});

router.post("/", (req, res) => {
    // Post new workout
});

router.put("/", (req, res) => {
    // Update a workout
});

router.delete("/excersise", (req, res) => {
    // Delete a workout
});

export default router;
