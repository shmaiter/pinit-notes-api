const Note = require("../models/note.js");
// const auth = require("../middlewares/auth");

const createNote = async (req, res) => {
    const note = new Note({
        ...req.body,
        owner: req.user._id,
    });
    try {
        await note.save();
        res.status(201).send({ note, message: "Note Saved" });
    } catch (e) {
        res.status(500).send(e);
    }
};

const getAllNotes = async (req, res) => {
    try {
        // await req.user.populate("notes");

        // res.status(200).send(req.user.notes);

        await req.user.populate("notes");

        res.status(200).send(req.user.notes);
    } catch (e) {
        res.status(500).send(e);
    }
};

const getSingleNote = async (req, res) => {
    try {
        const note = await Note.findById({ _id: req.params.id });
        if (!note) {
            return res.status(404).send();
        }
        res.send(note);
    } catch (e) {
        res.status(500).send();
    }
};
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.body._id });
        if (!note) {
            return res.status(404).send();
        }
        res.status(200).send({ message: "Note was deleted" });
    } catch (e) {
        res.status(500).send();
    }
};

module.exports = { createNote, getAllNotes, getSingleNote, deleteNote };
