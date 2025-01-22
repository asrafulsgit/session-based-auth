// backend/server.js
const express = require("express");
const session = require("express-session");
const cors = require("cors");
// const cookie =require('cookie-parser')
const app = express();

// Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 5000, 
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
    },
  })
);

const users = [{ username: "karim", password: "karim123" }];

// Login Route
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(404).send({ message: "username or password is wrong!" });

  req.session.user = user; 
  // console.log(req.session)
  res.status(200).send({ message: "Login successful", user });
});



// Verify Auth Route
app.get("/verify-auth", (req, res) => {
  // console.log(req.headers.cookie)
  console.log(req.session.user)
  if (req.headers.cookie) {
    res.status(200).json({ credentials: true });
  } else {
    res.status(401).json({ credentials: false });
  }
});

// Dashboard Route
app.get("/dashboard", (req, res) => {
  if (req.session.user) {
    res.send(`Welcome, ${req.session.user.username}`);
  } else {
    res.status(401).send("Unauthorized: Please log in.");
  }
});

// Logout Route
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Logout failed!");
    res.send("Logout successful!");
  });
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
