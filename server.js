//DEPENDANCIES 
require("dotenv").config();
require("./db/connection");
const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 2004;

//MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());
app.use(express.json());
app.use(morgan("dev"));

//MOUNT ROUTES
const authRouter = require("./routes/user-routes");
app.use("/api/auth", authRouter);

const noteRouter = require('./routes/note-routes');
app.use('/api/notes', noteRouter);


//PORT
app.listen(PORT, () => {
  console.log(`Server is listening @ http://localhost:${PORT}`);
});




