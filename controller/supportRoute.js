const express = require("express");
const supportSchema = require("../model/supportSchema");
const mongoose = require("mongoose");
const supportRoute = express.Router();
const nodemailer = require("nodemailer");

supportRoute.post("/send-email", (req, res) => {
  const { eme, sub, t } = req.body;

  // Set up transporter
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    logger: false,
    debug: true,
    secureConnection: false,
    auth: {
      user: "nodemailerpronode@gmail.com",
      pass: "grhhponcyqubpyis",
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  let mailOptions = {
    from: "nodemailerpronode@gmail.com",
    to: eme,
    subject: sub,
    text: t,
  };

  try {
    transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    res.status(500).send("Error sending email: " + error.message);
  }
});

supportRoute.post("/create-support", (req, res) => {
  supportSchema.create(req.body, (err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

supportRoute.get("/", (req, res) => {
  supportSchema.find((err, data) => {
    if (err) return err;
    else res.json(data);
  });
});

supportRoute
  .route("/update-support/:id")
  .get((req, res) => {
    supportSchema.findById(
      mongoose.Types.ObjectId(req.params.id),
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  })
  .put((req, res) => {
    supportSchema.findByIdAndUpdate(
      mongoose.Types.ObjectId(req.params.id),
      { $set: req.body },
      (err, data) => {
        if (err) return err;
        else res.json(data);
      }
    );
  });

supportRoute.delete("/delete-support/:id", (req, res) => {
  supportSchema.findByIdAndDelete(
    mongoose.Types.ObjectId(req.params.id),
    (err, data) => {
      if (err) return err;
      else res.json(data);
    }
  );
});
// support.Route.get("/update-support/:id")
// support.Route.put("/update-support/:id")
// localhost:4000/supportRoute/

module.exports = supportRoute;
