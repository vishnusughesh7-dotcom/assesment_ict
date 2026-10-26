import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch {
    res.status(500).json({ message: "Unable to fetch events." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.json(event);
  } catch {
    res.status(400).json({ message: "Invalid event ID." });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, description, date, venue } = req.body;

    if (!name || !description || !date || !venue) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const event = await Event.create({
      name,
      description,
      date,
      venue,
      totalRegistrations: 0
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message || "Unable to create event." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, description, date, venue } = req.body;

    if (!name || !description || !date || !venue) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, venue },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.json(event);
  } catch {
    res.status(400).json({ message: "Unable to update event." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.json({ message: "Event deleted successfully." });
  } catch {
    res.status(400).json({ message: "Unable to delete event." });
  }
});

export default router;