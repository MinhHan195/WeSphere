const express = require("express");
const authRouter = require("./app/routers/auth.route");
const postRouter = require("./app/routers/post.router");
const eventsRouter = require("./app/routers/events.route");
const systemRouter = require("./app/routers/system.route");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/events", eventsRouter);
app.use("/api/system", systemRouter);

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});


module.exports = app;