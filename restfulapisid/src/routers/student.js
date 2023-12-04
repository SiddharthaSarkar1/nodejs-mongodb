const express = require("express");

//1: Create a new Router
const router = new express.Router();

const Student = require("../models/students")

//Create a new Student
router.get("/", (req, res) => {
    res.send("Hello from the other side.");
})

//Here we have used promise ==> 

// app.post("/students", (req, res) => {

//     console.log(req.body);
//     const user = new Student(req.body);
//     user.save().then(() => {
//         res.status(201).send(user);
//     }).catch((err) => {
//         res.status(400).send(err);
//     })

//     //res.send("Hello from the other side.");
// })

//Here we have used async await ==> 

router.post("/students", async(req,res) => {

    try {
        console.log(req.body);
        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser);
    } catch (error) {
        res.status(400).send(err);
    }
    
})

router.get("/students", async (req, res) => {
    try{
        const studentsData = await Student.find();
        res.send(studentsData);
    }catch(err){
        console.log(err);
    }
})

router.get("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(_id);

        const studentData = await Student.findById(_id);
        console.log(studentData);
        if(!studentData){
            res.status(404).send();
        }else{
            res.send(studentData);
        }
        

    } catch (error) {
        res.status(500).send(error);
    }
})

//Update the student by id

router.patch("/students/:id", async (req, res) => {
    
    try {
        const _id = req.params.id;
        console.log(_id);

        const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.send(updateStudent);
    } catch (error) {
        res.status(404).send(error);
    }
})

//Delete the student record by its id

router.delete("/students/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(_id);
        const deleteStudent = await Student.findByIdAndDelete(_id);

        if(!deleteStudent){
            return res.status(404).send();
        }
        res.send(deleteStudent);
    } catch (error) {
        res.status(500).send(error);        
    }
})


module.exports = router;