const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken")

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hi from backend!");
});

app.get("/details", (req, res) => {
  const q = "SELECT * FROM registration_details";

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/details/:email", (req, res) => {
  const email = req.params.email;
  console.log(email);
  const q = "SELECT * FROM registration_details WHERE email = ?";

  // db.query(q, [email], (err, data) => {
  //   if (err) return res.json(err);
  //   if (data.length === 0) {
  //     return res.status(404).json("User not found");
  //   }
  //   return res.json(data[0]);
  // });

  db.query(q, [email], (err, data) => {
    if (err) return res.json(err);
    
    if (data.length === 0) {
      return res.status(404).json("User not found");
    }
    
    const user = data[0];
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      "mysecretKey",
      { expiresIn: "5s" }
    );
    
    return res.json({
      message: "User found",
      token: token,
      user: user 
    });
  });

});


app.post("/details", (req, res) => {
  console.log(req.body);
  const q =
    "INSERT INTO registration_details (`name`, `email`, `password`, `role`) VALUES (?)";

  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.role,
  ];

  console.log({ values });

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("New user has registered");
  });
});

app.delete("/details/:id", (req, res) => {
  const regId = req.params.id;
  const q = "DELETE FROM registration_details WHERE id= ?";

  db.query(q, [regId], (err, data) => {
    if (err) return res.json(err);
    return res.json("deleted");
  });
});

app.put("/details/:id", (req, res) => {
  const regId = req.params.id;
  const q =
    "UPDATE registration_details SET `name` = ?, `email` = ?, `password` = ?, `role` = ? WHERE id = ?";

  const values = [
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.role,
  ];

  db.query(q, [...values, regId], (err, data) => {
    if (err) return res.json(err);
    return res.json("book updated");
  });
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the DB!!!");
});

app.listen(8800, () => {
  console.log("connected to backend!!");
});
