const express = require("express")
const connect = require("./connectDB")
const app = express()
// const { connect } = require("mongoose");
const mongoose = require("mongoose");
const Note = require("./noteSchema")

const PORT = 3800

app.use(express.json())

app.post("/api/new-post", (req, res, next) => {
    try {
        let { title, author, body } = req.body

        if (!title || !author || !body) {
            return next(
                new HttpError("Fill in all fields and choose thmbnail.", 422)
            );
            // console.log(`Fill in all fields and choose thmbnail.", 422`)
        }

        const newPost = Note.create({
            title,
            author,
            body
        })

        res.status(200).json(newPost)

    } catch (error) {
        console.log(error)
    }
})

app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Note.find().sort({ updatedAt: -1 });

        if (!posts) {
            console.log("Error getting posts")
            // console.log(`${res.status()}`)
        }

        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/post/:id", async (req, res) => {
    try {
        const note = req.params.id

        const getNote = await Note.findById(note)

        if (!getNote) {
            console.log("error occur while getting the note")
        }
        res.status(200).json(getNote)
    } catch (error) {
        res.status(500).json({ error: "An error occur while fetching the note" })
    }
})

app.patch("/api/post/:id", async (req, res) => {
    try {
        // const note = req.params.id
        let { title, author, body } = req.body

        const updateNote = await Note.findByIdAndUpdate({
            title,
            author,
            body
        })

        if (!updateNote) {
            console.log("error occur while updating the note")
        }
        res.status(200).json(updateNote)
    } catch (error) {
        res.status(500).json({ error: "An error occur while updating the note" })
    }
})

app.delete("/api/post/:id", async(req, res) => {
    try {
        const note = req.params.id

        const deleteNote = await Note.findByIdAndDelete(note)

        if (!deleteNote) {
            console.log("error occur while deleting the note")
        }
        res.status(200).json(deleteNote)
    } catch (error) {
        res.status(500).json({ error: "An error occur while deleting the note" })
    }
})


mongoose.connect(connect)
    .then(
        app.listen(PORT, () => {
            console.log(`Server up & running at port ${PORT}`)
        })
    )
    .catch((err) => console.log(err));
