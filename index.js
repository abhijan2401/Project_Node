const express = require('express')
const app = express();
const mongoose = require('mongoose')
const Todies = require("./todies");

app.use(express.json());
app.listen(process.env.PORT || 3000, () => {
    console.log("server running at 3000");
    mongoose.connect("mongodb+srv://abhikhus24:abhijan2402@cluster0.5rlpuen.mongodb.net/Todo?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(() => {
        console.warn("db connected")

    });
})
app.get('/read', async (req, res) => {
    const Todoss = await Todies.find({});
    res.send({ Todoss: Todoss })
})
app.post('/addTodo', async (req, res) => {
    const data = Todies({
        _id: mongoose.Types.ObjectId(),
        Name: req.body.Name,
        EmpTitle: req.body.EmpTitle,
        Department: req.body.Department,
        Salary: req.body.Salary
    })
    const AddData = await data.save()
    console.log(AddData)
    res.send({ message: "Hello", data: AddData })
})
app.delete('/Delete/:id', async function (req, res) {
    await Todies.deleteOne({ _id: req.params.id }).then((result) => {
        res.status(200).json(result)
    }).catch((error) => {
        console.log(error)
    })
})
app.put('/update/:id', async function (req, res) {

    const Name = req.body.Name;
    const EmpTitle = req.body.EmpTitle;
    const Department = req.body.Department;
    const Salary = req.body.Salary;
    console.log(Name, EmpTitle, Department, Salary);
    await Todies.updateOne({ _id: req.params.id }, { $set: { Name: Name, EmpTitle: EmpTitle, Department: Department, Salary: Salary } }).then((result) => {
        console.log(result)
        res.send({ message: "Data is Updated" })
    }).catch((e) => {
        console.log(e)
    })

})