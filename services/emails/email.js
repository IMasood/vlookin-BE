const NODEMAILER = require("nodemailer");

async function sendEmail({ to, html }) {
  try {
    let NodemailerTransporter = await NODEMAILER.createTransport({
      name: "devvlookin.vlookin.com",
      smtp: "devvlookin.vlookin.com",
      host: "box5688.bluehost.com",
      port: 587,
      service: "Bluehost",
      auth: {
        user: "info@devvlookin.vlookin.com",
        pass: "$^p=zc}w@%ar",
      },
    });

    let mailOptions = {
      to: to,
      from: "VLOOKIN <info@devvlookin.vlookin.com>",
      subject: "Vlookin SignUp",
      html: html,
    };

    let sendEmailResponse = await NodemailerTransporter.sendMail(mailOptions);
    console.log(sendEmailResponse);
    return sendEmailResponse;
  } catch (err) {
    throw err;
  }
}

module.exports = { sendEmail };
