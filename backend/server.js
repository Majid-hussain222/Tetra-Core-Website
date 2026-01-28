import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   CONTACT FORM ENDPOINT
========================= */
app.post("/api/contact", async (req, res) => {
  const { name, email, company, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // ✅ Brevo SMTP (NOT Gmail)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Tetra Core Website" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_RECEIVER,
      replyTo: email,
      subject: "New Website Inquiry – Tetra Core",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6">
          <h2>New Contact Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr />
          <small>Sent from Tetra Core website</small>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Email failed to send" });
  }
});

/* =========================
   START SERVER
========================= */
app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
