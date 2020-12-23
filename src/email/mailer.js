import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '62bdbddb120535',
    pass: '58fb42f25444e2',
  },
});

export default transport;
