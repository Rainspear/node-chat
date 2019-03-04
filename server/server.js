const path = require('path');
const pubpath = path.join(__dirname, "../public");
const express = require('express');
const app = express();
const port = process.env.PORT || 9999;
console.log(pubpath);

app.use(express.static(pubpath));
app.listen(9999, () => {
    console.log(`server node-chat is running on port ${port}`);
});