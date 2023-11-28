const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const router = require('./Routes/UserRoutes')
app.use(express.json(), cors());

app.use("/", router)

mongoose.connect('mongodb://localhost:27017/Usermanagement')
    .then(() => {
        console.log("connected to db ")
        app.listen(PORT, () => console.log(`server up and running at  ${PORT}`));
    })
    .catch((err) => { console.log(err); });
