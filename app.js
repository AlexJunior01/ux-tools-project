

const express = require("express");
var app = express();
const port = 3000



// API
app.use(express.json())

app.post('/teste', function(req, res) {

    const payload = req.body;
    console.log(payload);

    res.send("Olá mundo")

})

app.listen(port, () => {
 console.log("Server running on port 3000");
});   