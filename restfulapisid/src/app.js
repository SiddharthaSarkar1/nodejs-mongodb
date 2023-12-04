const express = require("express");
require("./db/conn");
const Student = require("./models/students");

const studentRouter = require("./routers/student");

const app = express();



const port = process.env.PORT || 3000;

app.use(express.json());

//3: We need to register our router
app.use(studentRouter);



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

// app.post("/students", async(req,res) => {

//     try {
//         console.log(req.body);
//         const user = new Student(req.body);
//         const createUser = await user.save();
//         res.status(201).send(createUser);
//     } catch (error) {
//         res.status(400).send(err);
//     }
    
// })

// app.get("/students", async (req, res) => {
//     try{
//         const studentsData = await Student.find();
//         res.send(studentsData);
//     }catch(err){
//         console.log(err);
//     }
// })

// app.get("/students/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         console.log(_id);

//         const studentData = await Student.findById(_id);
//         console.log(studentData);
//         if(!studentData){
//             res.status(404).send();
//         }else{
//             res.send(studentData);
//         }
        

//     } catch (error) {
//         res.status(500).send(error);
//     }
// })

// //Update the student by id

// app.patch("/students/:id", async (req, res) => {
    
//     try {
//         const _id = req.params.id;
//         console.log(_id);

//         const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
//             new: true
//         });
//         res.send(updateStudent);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// })

// //Delete the student record by its id

// app.delete("/students/:id", async (req, res) => {
//     try {
//         const _id = req.params.id;
//         console.log(_id);
//         const deleteStudent = await Student.findByIdAndDelete(_id);

//         if(!deleteStudent){
//             return res.status(404).send();
//         }
//         res.send(deleteStudent);
//     } catch (error) {
//         res.status(500).send(error);        
//     }
// })


app.listen(port, () => {
    console.log(`Connection is setup at port no : ${port}`);
});