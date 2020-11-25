import sgMail from "@sendgrid/mail";

import { IEmailProvider } from "./email.types";




// ! SENDGRID ========================================
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);


export const emailProviders: IEmailProvider[] = [
  {
    // TODO: SENDGRID Free tier is 100 only. More info about their free plan is described here: https://sendgrid.com/pricing/
    key: "SENDGRID",
    credits: 100,
    emailSendingFunction: async (to, from, subject, html, text): Promise<boolean> => {
      try {
        sgMail.send({
          to,
          from: {
            email: from,
            name: process.env.APP_NAME
          },
          subject,
          html,
          text
        });
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    }
  }

];
