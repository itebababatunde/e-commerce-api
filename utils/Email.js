import nodemailer from 'nodemailer'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'
import htmlToText from 'html-to-text'
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

class Email {
  constructor(store, url) {
    this.to = store.email
    this.name = store.storename
    this.url = url
    this.from = `iteoluwababatunde@gmail.com`
  }

  async resetPassword() {
    const html = `<strong>Click <a href='${this.url}'>here</a> to reset your password</strong>`

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: 'Reset your Password',
      html,
      text: htmlToText.fromString(html),
    }

    await sgMail
      .send(mailOptions)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error.response.body)
      })
  }
}

export default Email
