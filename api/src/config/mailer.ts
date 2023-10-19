import nodemailer from "nodemailer";

import configServer from "./configServer";

// send mail with defined transport object
export const transporter = nodemailer.createTransport({
  host: configServer.mailer.host,
  port: 465,
  secure: true,
  auth: {
    user: "easybankmessage@gmail.com",
    pass: "wevi vjpf ahxd ebmk",
  },
});

transporter.verify().then(() => {
  console.log("mailer ready");
});
