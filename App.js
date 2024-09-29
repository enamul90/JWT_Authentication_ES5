const express = require("express");
const app = new express();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const router = require("./routes/api");
const config = require("./App/config/Config");

const {
    DefaultErrorHandler,
    NotFoundError,
} = require("./App/utillity/ErrorHandler");


let URL = config.DataBaseUrl
mongoose
    .connect(URL)
    .then((res) => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.log(err);
    });




app.use(cookieParser());
app.use(cors());


app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: config.MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: config.URL_ENCODED }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);


app.use("/api", router);

app.use(NotFoundError);
app.use(DefaultErrorHandler);


let port = config.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));