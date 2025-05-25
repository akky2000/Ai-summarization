import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Corrected SMTP host for Gmail
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "akash.tech2511@gmail.com",
    pass: "btmxslowpntszqek",
  },
});

const sendEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: '"abhay " <akash.tech2511@gmail.com>', // sender address
      to: "kashyapakashiyda@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

