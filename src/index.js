const express = require(`express`);
const morgan = require(`morgan`);

const taskRoutes = require("./routes/tasks.routes");

const app = express();

app.use(morgan(`dev`));

app.use(taskRoutes);

app.listen(4000);
console.log("Server on Port 4000")