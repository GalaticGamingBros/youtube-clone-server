const express = require("express");
const Model = require("../Model/model");

const router = express.Router();

// post method
router.post("/signup", async (req, res) => {
  const data = new Model({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });
  req.session.loggedin = true;

  console.log(data);

  try {
    const dataToSave = await data.save();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get method
router.get("/get", async (req, res) => {
  try {
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get by ID method
router.get("/get/:id", (req, res) => {
  try {
    const data = Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update by ID method
router.patch("/change-password/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Model.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete method
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.username} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
});

module.exports = router;
