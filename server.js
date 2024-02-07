const express = require("express")
const  connect  = require("./connectDB")
const app = express()
// const { connect } = require("mongoose");
const mongoose = require("mongoose");
const Note = require("./noteSchema")

const PORT = 3800

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Gkj")
})

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

        if(!posts){
            console.log("Error getting posts")
            // console.log(`${res.status()}`)
        }

        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
    }
})

app.get("/api/post/:id", (req, res) => {

})

app.delete("/api/post/:id", (req, res) => {

})


mongoose.connect(connect)
    .then(
        app.listen(PORT, () => {
            console.log(`Server up & running at port ${PORT}`)
        })
    )
    .catch((err) => console.log(err));
