require("dotenv").config(); // ALLOWS ENVIRONMENT VARIABLES TO BE SET ON PROCESS.ENV SHOULD BE AT TOP

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//* Middleware
app.use(express.json()); // parse json bodies in the request object
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//* Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/lists", require("./routes/listingRoutes"));


app.use((err, req, res, next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);

  res.status(500).json({
    message: "Something went rely wrong",
  });
});

// Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));