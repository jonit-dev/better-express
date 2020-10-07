import fs from 'fs';

import { rootPath } from '../constants/global.constants';



export class TemplateHelper {


  // Returns template html content as a string
  public static loadTemplate(name: string): string {
    return fs.readFileSync(`${rootPath}/templates/${name}.html`, { encoding: 'utf-8' })
  }


}