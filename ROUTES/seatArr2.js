const express = require("express");
const router = express.Router();
const { seatArrangement } = require("../MODELS/seatArrangement");
const { User } = require("../MODELS/user");
const { Table } = require("../MODELS/tables");

router.post(`/`, async (req, res) => {
  let seatarrangement = new seatArrangement({
    eventName: req.body.eventName,
    eventDescription: req.body.eventDescription,
    user: req.user,
  });
  if (req.body.eventName == null || req.body.eventDescription == null) {
    return res.status(400).send("client error, cannot be created");
  }
  seatarrangement = await seatarrangement.save();

  if (!seatarrangement) {
    return res.status(400).send("seatingArrangement cant be created. ");
  }
  res.status(200).send(seatarrangement);
});
router.get(`/:userid`, async (req, res) => {
  if (!req.params.userid.match(/^[0-9a-fA-F]{24}$/)) {
    console.log("reported USERID--------------->>>>>>" + req.params.userid);
    return res.status(400).send("invalid object Id");
  }
  const userArrangementList = await seatArrangement.find({
    user: req.params.userid,
  });

  if (!userArrangementList) {
    res
      .status(204)
      .json({ success: true, message: "no events associated w/ this user" });
  }
  res.status(200).send(userArrangementList);
});
router.delete(`/:id`, async (req, res) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("BAD CLIENT REQUEST, invalid object Id");
  }
  seatArrangement
    .findByIdAndRemove(req.params.id)
    .then((seatarrangement) => {
      if (seatarrangement) {
        try {
          Table.deleteMany({ event: req.params.id });
        } catch (e) {
          console.log("error cascade deleting tables---->" + e);
        }
        return res.status(200).json({
          success: true,
          message: "Seating Arrangement was successfully deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "Seating Arrangement failed to be deleted",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

module.exports = router;
