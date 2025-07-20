const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const Connect_Database = require("./config/database")
const routes = require("./router/routes");

dotenv.config();

Connect_Database();
const app = express();
app.use(express.json());
app.use(cookieParser());



app.use("/api/v1", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
