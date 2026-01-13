const express = require("express");
const cors = require("cors");
require("dotenv").config();

const studentRoute = require("./routes/student.Routes");
const hrRoute = require("./routes/hr.Routes");
const jobRoute = require("./routes/job.Routes");
const testRoute = require("./routes/question.Routes");
const progressRoute = require("./routes/progress.routes");
const emailRoute = require("./routes/email.Routes");
const authRoute = require("./routes/auth.Routes");

const connectDB = require("./config/database");
const logger = require("./utils/logger");




const app = express();

/* ---------- MIDDLEWARES ---------- */
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* logger MUST be a function */
app.use(logger);

/* ---------- DATABASE ---------- */
connectDB();

/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoute);
app.use("/api/students", studentRoute);
app.use("/api/hr", hrRoute);
app.use("/api/job", jobRoute);
app.use("/api/questions", testRoute);
app.use("/api/progress", progressRoute);
app.use("/api/email", emailRoute);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
