import { appEnv } from "../src/config/env";
import { EnvType } from "../src/types/express.types";
import { EmailType } from "./email.types";
import { TransactionalEmail } from "./TransactionalEmail";

export class GenericEmailManager extends TransactionalEmail {
  public sendEmail(
    to: string | undefined,
    subject: string,
    template: string,
    customVars: object
  ): void {
    switch (appEnv.general.ENV) {
      case EnvType.Development:
      case EnvType.Staging:
        console.log(
          "Skipping sending new account email... Option only available in production."
        );
        break;

      case EnvType.Production:
        console.log(`Sending email to ${to} - ${subject}`);
        // console.log({
        //   to,
        //   subject,
        //   template,
        //   customVars
        // });
        const htmlEmail = this.loadEmailTemplate(
          EmailType.Html,
          template,
          customVars
        );
        const textEmail = this.loadEmailTemplate(
          EmailType.Text,
          template,
          customVars
        );

        this.smartSend(
          to,
          process.env.SUPPORT_EMAIL,
          subject,
          htmlEmail,
          textEmail
        );

        break;
    }
  }
}
