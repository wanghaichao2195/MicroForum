require("dotenv").config();//load environment variables
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const errorHandler = require("./handlers/error");

<<<<<<< HEAD
const authRoutes = require("./routes/auth");
const messagesRoutes = require("./routes/messages");
=======
const resetRoutes = require("./routes/pwReset");

const authRoutes = require("./routes/auth");

const messagesRoutes = require("./routes/messages");
const commentRoutes = require("./routes/comments");

>>>>>>> addComments
const {loginRequired, ensureCorrectUser} = require("./middleware/auth");

const db = require("./models");

const PORT = 8081;

<<<<<<< HEAD
app.use(cors());
app.use(bodyParser.json());


app.use("/api/auth", authRoutes);
=======
app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use("/api/auth", authRoutes);

>>>>>>> addComments
app.use(
  "/api/users/:id/messages", 
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
<<<<<<< HEAD
  
);

=======

  
);

app.use(
  "/api/users/:id/messages/:message_id/comment", 
  loginRequired,
  ensureCorrectUser,
  commentRoutes
  
);


app.use("/api",resetRoutes);


>>>>>>> addComments
app.get("/api/messages", loginRequired, async function(req, res ,next){
  try{
    let messages = await db.Message.find()
    .sort({createdAt:"desc"})
    .populate("user",{
      username: true,
      profileImageUrl:true
    });
    return res.status(200).json(messages);
  }catch(err){
    return next(err);
  }
})

<<<<<<< HEAD
=======


>>>>>>> addComments
app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

app.use(errorHandler);

app.listen(PORT, function() {
    console.log(`Server is starting on port ${PORT}`);
  });
  