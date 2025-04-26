const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middleware/errorHandler");

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",         // local frontend
  "https://craftopia-f.vercel.app" // deployed frontend
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: "PUT,POST,GET,DELETE,PATCH,HEAD",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/user/", userRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
