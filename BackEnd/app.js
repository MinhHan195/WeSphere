const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./app/routers/auth.route");
const postRouter = require("./app/routers/post.router");
const eventsRouter = require("./app/routers/events.route");
const systemRouter = require("./app/routers/system.route");
const movieRouter = require("./app/routers/movie.route");
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/events", eventsRouter);
app.use("/api/system", systemRouter);
app.use("/api/movie", movieRouter);

app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        errors: error.errors || "Internal Server Error",
    });
});


module.exports = app;