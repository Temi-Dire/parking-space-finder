const mongoose = require("mongoose");
const express = require("express");
const car = require("./models/car");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  return res.render("home");
});

//read the information from the database
app.get("/form", (req, res) => {
  car
    .find()
    .exec()
    .then((docs) => {
      return res.render("form", { cars: docs });
    })
    .catch((err) => console.log("Something went wrong with mongo db"));
});

// app.post("/:id", (req, res) => {});
app.post("/updatevehicle", (req, res, next) => {
  const { vehicle, place } = req.body;

  // Check if the parking place is available
  car
    .findOne({ place: place })
    .exec()
    .then((result) => {
      if (result && result.vehicle === "") {
        // Parking place is available, update the database
        return car.updateOne({ place: place }, { $set: { vehicle: vehicle } });
      } else {
        // Parking place is already taken, show an error message
        console.log(`The place ${place} has already been taken.`);
        res.render("failure");
      }
    })
    .then((updateResult) => {
      if (updateResult && updateResult.modifiedCount > 0) {
        console.log(`Successfully updated vehicle for place: ${place}`);
        // Send success response
        // res.status(200).send("Successfully updated vehicle.");
        res.render("success");
      } else {
        console.log(`No documents found for place: ${place}`);
        // Send failure response
        res.status(400).send("Failed to update vehicle.");
      }
    })
    .catch((err) => {
      console.log("Error updating document", err);
      // Handle any unexpected errors and send an appropriate response
      if (!res.headersSent) {
        res.status(500).send("Internal server error.");
      }
    });
});

mongoose
  .connect("mongodb+srv://temidire:Gl%40rious10@cluster0.28usg0y.mongodb.net/")
  .then(() => console.log("Connected to mongoDB..."));

const db = mongoose.connection;
db.on("error", () =>
  console.log("something went wrong to connect to the database")
);
db.once("open", () => {
  console.log("db connection has been made successfully");
});

app.listen(port, () => console.log("Listening on port 3000"));
