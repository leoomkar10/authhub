import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import db from "./db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "./middleware/authMiddleware.js";
// import mysql from "mysql2";

// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME
// });

// db.connect((err) => {
//   if (err) {
//     console.log("DB Error:", err);
//   } else {
//     console.log("MySQL Connected ✅");
//   }
// });



const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json("User not found");
      }

      const isMatch = await bcrypt.compare(
        password,
        result[0].password_hash
      );

      if (!isMatch) {
        return res.status(401).json("Wrong password");
      }

      const token = jwt.sign(
        { id: result[0].id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({ token });
    }
  );
});


app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
          return res.status(400).json("User already exists");
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query(
          "INSERT INTO users (name,email,password_hash) VALUES (?,?,?)",
          [name, email, hashedPassword],
          (err, data) => {
            if (err) return res.status(500).json(err);

            // Create empty user_data
            db.query(
              "INSERT INTO user_data (user_id) VALUES (?)",
              [data.insertId]
            );

            return res.json("User registered successfully");
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/api/user/profile", verifyToken, (req, res) => {
  db.query(
    `SELECT users.name, users.email, user_data.address, user_data.phone, user_data.bio
     FROM users
     LEFT JOIN user_data ON users.id = user_data.user_id
     WHERE users.id = ?`,
    [req.userId],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
});



app.get("/", (req, res) => {
  res.send("AuthHub Backend Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

export default app;