const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.get("/", (req, res) => {
  res.send("Timestamp Microservice is running");
});


app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else if (/^\d+$/.test(dateString)) {

    date = new Date(parseInt(dateString));
  } else {

    date = new Date(dateString);
  }
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
