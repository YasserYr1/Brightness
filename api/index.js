const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/User');
const Subject = require('./models/Subject');
const Student = require('./models/Student');
const Class = require('./models/Class');

require('dotenv').config();
 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

mongoose.connect(process.env.MONGO_URL);

bcryptSalt = bcrypt.genSalt(10);
jwtSecret = "****bcrypt****";


const teachers = [
    {name: 'John Doe', email: 'john@doe.com', password: 'useruser'},
    {name: 'Michael Rosa', email: 'Michael@Rosa.com', password: 'useruser'},
    {name: 'Georgette Adams', email: 'Georgette@Adams.com', password: 'useruser'},
    {name: 'Adella Feliciano', email: 'Adella@Feliciano.com', password: 'useruser'},
    {name: 'Glenda Garceau', email: 'Glenda@Garceau.com', password: 'useruser'},
    {name: 'Reginald Rivera', email: 'Reginald@Rivera.com', password: 'useruser'},
    {name: 'Douglas Santos', email: 'Douglas@Santos.com', password: 'useruser'},
    {name: 'Joseph Young', email: 'Joseph@Young.com', password: 'useruser'},
    {name: 'Byron Bois', email: 'Byron@Bois.com', password: 'useruser'},

]

const classes = ["Math class", "Physics class", "Science class", "Arab class", "French class", "English class", "History class", "islamic class", "Sport class"]


app.get('/test', (req,res)=>{
    res.send('yooow it works')
})

//HrXOK3TI60Cr85nf

const teacherSeeder = async() => {
    try {
        for (const teacher of teachers){
            const hashedPass = await bcrypt.hash(teacher.password, 10);

            await User.create({
                name: teacher.name,
                email: teacher.email,
                password: hashedPass,
            })

            console.log('user created successfully');
        }
    }catch(e){
        console.error('error creating user', e);
    }
}


app.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    try{
        const userDoc = await User.findOne({email})
        .populate('classes')
        .populate('subject');
        if (userDoc){
            const passOk = await bcrypt.compare(password, userDoc.password);
            if (passOk){
                jwt.sign(
                    {email: userDoc.email, id: userDoc._id},
                    jwtSecret,
                    {},
                    (err, token) => {
                        if (err){
                            res.status(500).send('Error creating token');
                        }else{
                            res.cookie("token", token, {httpOnly:true}).json(userDoc);
                        }    
                    }
                );
            }else{
                res.status(422).send('Password not valid');
            }
        }else {
            res.status(422).send('User not found');
        }
    }catch(err){
        res.status(500).send('An error occurred');
    }
});

app.get('/profile', (req, res)=>{
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err){
                res.status(500).send('Error verifying token');
            }else{
                const {name, email, _id, classes, num, subject} = await User.findById(userData.id)
                .populate('classes')
                .populate('subject');
                res.json({name, email, _id, classes, num, subject});
            }
        })
    }else {
        res.json(null);
    }
});

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true); 
});

app.get('/class/:classId', async (req, res) => {
        const {classId} = req.params;
        const { userId } = req.query;
        if (userId){
            const foundClass = await Class.findOne({ _id: classId, teacher: userId }).populate('students');
            if (!foundClass) {
                return res.status(404).json({ message: 'Class not found or you are not the teacher of this class' });
            }
            res.json(foundClass.students);
        }else{
            res.status(404).json('error getting the userID')
        }
        
})

app.post('/update-scores', async (req, res) => {
    const { studentId, examNumber, score, userId } = req.body;
    try {
      const student = await Student.findById(studentId);
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      const user = await User.findById(userId).populate('subject');
  
      if (!user || !user.subject) { 
        return res.status(404).json({ error: 'Teacher not found or subject not assigned' });
      }
  
      const subjectId = user.subject._id; 

      const subjectIndex = student.scoress.findIndex(scoreObj => scoreObj.subject.equals(subjectId));
  
      if (subjectIndex === -1) {
        return res.status(404).json({ error: 'Subject not found for the given score' });
      }
  

      student.scoress[subjectIndex].values[examNumber - 1] = score;
  
      // Recalculate totalScore for the specific subject
      const totalScores = student.scoress[subjectIndex].values.reduce((total, value) => total + value, 0)/3;
      student.totalScoress[subjectIndex].value = totalScores;
  
      await student.save();
  
      res.status(200).json({ message: 'Scores updated successfully' });
    } catch (error) {
      console.error('Error updating scores:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  async function addScoresToStudent() {
    try {
      // Step 1: Find the student
      const user = await User.findOne({name:"Byron Bois"}).maxTimeMS(30000);
  
      if (!user) {
        console.log('user not found');
        return; 
      }
  
      // Step 3: Use $addToSet to add or update scores for the specified subject
      await User.updateOne(
        { name: user.name},
        { $set: { 'num': 8 } },
        { upsert: true }
      );
  
      console.log('Scores added successfully');
    } catch (error) {
      console.error('Error adding scores:', error.message);
    }
  }

  app.get('/students', async (req, res) => {
    const { userId } = req.query;
  
    try {
      const user = await User.findById(userId)  // Add 'await' here
        .populate({
          path: 'classes',
          populate: {
            path: 'students',
            model: 'Student',
            populate: {
              path: 'scoress.subject',
              model: 'Subject',
            },
          },
        });
  
      if (!user) {
        return res.status(404).json('User not found');
      }
  
      const students = user.classes.reduce((allStudents, classObj) => {
        return allStudents.concat(classObj.students);
      }, []);
  
      res.json(students);
    } catch (error) {
      console.error('Error fetching students:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  app.get('/student/:studentId', async (req, res) => {
    const {studentId} = req.params;
    if (studentId){
        const student = await Student.findOne({ _id: studentId});
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);  
    }else{
        res.status(404).json('error getting the userID')
    }
    
})




app.listen(4000); 