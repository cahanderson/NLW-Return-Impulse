import { SendMailData, MailAdapter } from "../mail-adapters";
import nodemailer from 'nodemailer'

    const  transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "bebe5816661a85",
            pass: "206ae7cd9c8069"
        }
  });

export class NodemailerMailAdapter implements MailAdapter{
    async sendMail ({subject, body}: SendMailData) {
        await transport.sendMail({
            from: "Equipe Feedback <oi@feedback.com.br>",
            to:"Carlos Anderson <cahanderson@gmail.com>",
            subject,
            html: body,
        })
    }
}