const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Todies = require("./todies");
// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json();
app.use(express.json());
app.listen(process.env.PORT || 3000, () => {
    console.log("server running");
    mongoose.connect("mongodb+srv://abhikhus24:abhijan2402@cluster0.5rlpuen.mongodb.net/Todo?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.warn("db connected")

    });
})
// app.use(express.urlencoded({ extended: true }));
app.get('/read/:UserId', async (req, res) => {
    const Todoss = await Todies.find({ UserId: req.params.UserId });
    res.send({ Todoss: Todoss })
})
app.post('/addTodo', async (req, res) => {
    const data = Todies({
        _id: mongoose.Types.ObjectId(),
        Title: req.body.Title,
        description: req.body.description,
        UserId: req.body.UserId,
        Status: req.body.Status
    })
    const AddData = await data.save()
    console.log(AddData)
    res.send({ message: "Hello" })
})
app.delete('/Delete/:id', async function (req, res) {
    await Todies.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json(result)
    }).catch((error) => {
        console.log(error)
    })
})
app.put('/update/:id', async function (req, res) {
    await Todies.updateOne({ _id: req.params.id }, { $set: { Status: "completed" } }).then((res) => {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })

})
// mongodb=mongodb+srv://abhikhus24:<password>@cluster0.5rlpuen.mongodb.net/?retryWrites=true&w=majority