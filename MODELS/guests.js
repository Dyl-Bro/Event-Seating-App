const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  //relation to the event... ex: father of the bride, boss, competitor, etc.
  description: {
    type: String,
    required: false,
    default: "No Description Provided",
  },
});

guestSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
guestSchema.set("toJSON", {
  virtuals: true,
});
exports.Guest = mongoose.model("Guest", guestSchema);
