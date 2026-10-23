const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// API Route
app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      html: message
    });
    res.json({ success: true, message: 'Email sent sucesfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('API is working');
});

app.listen(3000, () => console.log('Servr running @ port 3000 pe'));