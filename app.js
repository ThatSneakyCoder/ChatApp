const expressSession = require("express-session");
const db = require("./config/mongoose-connect");
const cookieParser = require("cookie-parser");
const flash = require('connect-flash');
const express = require("express");
const path = require("path");
const http = require("http");
const app = express();
const server = http.createServer(app);
const ioConnection = require("./config/init-socket");
const port = 3000;

const homeRouter = require("./routes/home");
const userRouter = require("./routes/user");

const io = ioConnection.init(server);

app.set("io", io);
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(flash());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: "expressSessionKey"
    })
);

app.use("/", homeRouter);
app.use("/user", userRouter);

server.listen(port, () => {
    console.log(`App is running on port ${port}`);
});

