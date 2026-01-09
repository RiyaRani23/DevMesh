const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const{ validateSignUpData } = require("./utils/validation");
const becrypt = require("bcrypt");

app.use(express.json());

app.post("/signup", async (req, res) => {
   try{
    // Validate input data
     validateSignUpData(req);



     // Save user to the database
      const user = new User(req.body);

       await user.save();
       res.send("User added Successfully");
   }
   catch(err){
       res.status(400).send("Error creating user:" + err.message);
   }
  
});

// Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.findOne({ emailId: userEmail });
    if (user.length === 0)  {
       res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }
});

app.get("/feed", async (req, res) => {
  const user = await User.find({});
  res.send(user);
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId; 
  try{
    const user = await User.findByIdAndDelete(userId); // 
    res.send("User deleted Successfully");
  } catch (err) {
    res.status(400).send("Something went wrong ");
  }

});

app.patch("/user", async (req, res) => {
  const emailId = req.body.emailId;
  const data = req.body; 

  try {
    const ALLOWED_UPDATES = ['userId',
           'photoUrl',
            'password',
            'about',
            'gender',
             'age',
             'skills'
            ];

  const isUpdateAllowed = Object.keys(data).every((k) =>
    ALLOWED_UPDATES.includes(k)
   );  
    if (!isUpdateAllowed) {
         throw new Error(" Update not allowed!");
    }
    if(data?.skills.length > 10){
      throw new Error("Cannot add more than 10 skills");
    };

    const user = await User.findOneAndUpdate({emailId : emailId}, data,{
      returnDocument: 'after',
      runValidators: true,
     });

      console.log(data);
      res.send("User updated Successfully");
      } catch (err) {
      res.status(400).send("User update failed: " + err.message);
     }
  }
);

// Connect to the database and start the server

connectDB()
    .then(() => {
        console.log("Database connected successfully");
        app.listen(3000, () => {
        console.log("Server is running on port 3000");
       });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
