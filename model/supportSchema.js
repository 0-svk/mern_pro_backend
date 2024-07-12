const mongoose = require("mongoose");
const supportSchema = mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    product_id: { type: String },
    product_name: { type: String },
    channel: { type: String },
    ticket_id: { type: Number },
    ticket: { type: String },
    ticket_type: { type: String },
  },
  { collection: "project_mern" }
);
module.exports = mongoose.model("supportSchema", supportSchema);
