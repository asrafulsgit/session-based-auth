const express = require("express");
const session = require("express-session");

const app = express();

app.use(express.urlencoded({extended: true}))

app.use(
  session({
    secret: "secret_key", 
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000*5 }, 
  })
);

const users = [{username:'karim',password : 'karim123'}]

app.post("/login", (req, res) => {
  const {username,password}= req.body;
  console.log(username,password)
  const user = users.find((u)=> u.username === username && u.password === password)
  if(!user) return res.status(404).send({message : 'username of password is wrong!'})
  req.session.user = user; 
  res.status(200).send({
     message : 'login successfull',
     user
  });
});

app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}`);
  } else {
    res.status(401).send("Unauthorized: Please log in.");
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout failed!");
    res.send("Logout successful!");
  });
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

