import { appEnv } from '../config/env';
import { IServerBootstrapVars as IServerBootstrapConfig } from '../types/express.types';
import { ConsoleHelper } from './console.helper';

export class ServerHelper {
  public static showBootstrapMessage(config: IServerBootstrapConfig): void {
    const {
      port,
      appName,
      language,
      timezone,
      adminEmail,
      phoneLocale,
    } = config;

    const consoleHelper = new ConsoleHelper();

    let terminalColor;
    switch (appEnv.general.ENV) {
      case 'Development':
        terminalColor = 'YELLOW';
        break;
      case 'Production':
        terminalColor = 'RED';
        break;
      default:
        terminalColor = 'BLUE';
        break;
    }
    consoleHelper.coloredLog(
      `🤖: ${appName} server's listening on port ${port} - Timezone ${timezone} - Language: ${language} - Admin: ${adminEmail} - PhoneLocale: ${phoneLocale}`,
      terminalColor
    );
  }
}
