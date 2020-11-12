import chalk from 'chalk';
import { injectable } from 'inversify';

@injectable()
export class ConsoleHelper {
  public coloredLog(
    text: string,
    template: 'YELLOW' | 'RED' | 'BLUE' = 'YELLOW'
  ): string | void {
    switch (template) {
      case 'YELLOW':
        console.log(chalk.bgYellow.black(text));
        break;
      case 'RED':
        console.log(chalk.bgRed.black(text));
        break;
      case 'BLUE':
        console.log(chalk.bgBlue.black(text));
        break;
    }
  }
}
