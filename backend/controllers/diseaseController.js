import Disease from "../models/Disease.js";

export const listDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find().sort({ createdAt: -1 });
    res.json({ success: true, diseases });
  } catch (err) {
    console.error("Error fetching diseases", err);
    res.status(500).json({ success: false, message: "Failed to fetch diseases" });
  }
};

export const createDisease = async (req, res) => {
  try {
    const { title, description, prevention } = req.body;
    const disease = await Disease.create({
      title,
      description,
      prevention,
      createdBy: req.userId,
    });
    res.status(201).json({ success: true, disease });
  } catch (err) {
    console.error("Error creating disease", err);
    res.status(500).json({ success: false, message: "Failed to create disease" });
  }
};

export const updateDisease = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, prevention } = req.body;
    const updated = await Disease.findByIdAndUpdate(
      id,
      { title, description, prevention, updatedBy: req.userId },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: "Disease not found" });
    }
    res.json({ success: true, disease: updated });
  } catch (err) {
    console.error("Error updating disease", err);
    res.status(500).json({ success: false, message: "Failed to update disease" });
  }
};

export const deleteDisease = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Disease.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Disease not found" });
    }
    res.json({ success: true, message: "Disease deleted" });
  } catch (err) {
    console.error("Error deleting disease", err);
    res.status(500).json({ success: false, message: "Failed to delete disease" });
  }
};

