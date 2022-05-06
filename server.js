const express = require("express");
const bodyParser = require("body-parser");

const userRoute = require("./src/routes/user.routes");
const app = express();

app.use(bodyParser.json());

app.use('/users', userRoute);

const PORT = 3000;

app.listen(PORT, (req, res) => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// module.exports = app;
