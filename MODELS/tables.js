const mongoose = require("mongoose");

const tableSchema = mongoose.Schema({
  tableName: { type: String, required: true },
  tableGuests: [
    {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      //relation to the event... ex: father of the bride, boss, competitor, etc.
      relation: {
        type: String,
        required: false,
        default: "No Description Provided",
      },
    },
  ],
  event: {
    type: mongoose.Types.ObjectId,
    ref: "seatArrangement",
    required: true,
  },
});

tableSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
tableSchema.set("toJSON", {
  virtuals: true,
});

exports.Table = mongoose.model("Table", tableSchema);
