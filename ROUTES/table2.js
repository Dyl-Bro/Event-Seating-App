const express = require("express");
const router = express.Router();
const { Table } = require("../MODELS/tables");

router.post(`/:eventID`, async (req, res) => {
  let table = new Table({
    tableName: req.body.tableName,
    tableGuests: req.body.tableGuests,
    event: req.params.eventID,
  });
  if (req.body.tableName == null || req.body.tableGuests == null) {
    return res.status(400).send("CLIENT ERROR, cannot be created");
  }
  table = await table.save();
  console.log("Table in table_route_BE --->  " + table);
  if (!table) {
    return res.status(400).send("order cant be created. ");
  }
  res.status(200).send(table);
});
router.get(`/:tableID`, async (req, res) => {
  if (!req.params.tableID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("BAD CLIENT REQUEST, invalid object Id");
  }
  const table = await Table.findById(req.params.tableID);
  if (!table) {
    res.status(400).json({ success: true, message: "Table not found" });
  }
  res.status(200).send(table);
});
router.get(`/tables/:eventID`, async (req, res) => {
  if (!req.params.eventID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("BAD CLIENT REQUEST, invalid object Id");
  }
  const tables = await Table.find({ event: req.params.eventID });
  if (!tables) {
    res.status(200).send("No tables associated with this event yet.");
  }
  return res.status(200).send(tables);
});

router.put(`/add_guest/:tableID`, async (req, res) => {
  if (!req.params.tableID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("BAD CLIENT REQUEST, invalid object Id");
  }
  const table = await Table.updateOne(
    {
      _id: req.params.tableID,
    },
    {
      $push: {
        tableGuests: {
          $each: [
            {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            },
          ],
        },
      },
    }
  );
  console.log("Table----> " + JSON.stringify(table));
  if (!table) {
    res.status(400).send("client error");
  }
  res.status(200).send(table);
});

router.put(`/remove_guest/:tableID`, async (req, res) => {
  if (!req.params.tableID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("BAD CLIENT REQUEST, invalid object Id");
  }
  const remove_guest = await Table.updateOne(
    {
      _id: req.params.tableID,
    },
    {
      $pull: {
        tableGuests: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        },
      },
    },
    { new: true }
  );
  if (!remove_guest) {
    res.status(400).send("client error");
  }
  res.status(200).send(remove_guest);
});
router.delete(`/remove_table/:tableID`, (req, res) => {
  if (!req.params.tableID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("BAD CLIENT REQUEST, invalid object Id");
  }
  if (!req.params.tableID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send("BAD CLIENT REQUEST, invalid object Id");
  }
  Table.findByIdAndRemove(req.params.tableID)
    .then((table) => {
      if (table) {
        return res
          .status(200)
          .json({ success: true, message: "table successfully deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "table not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
