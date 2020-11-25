export class TextHelper {
  public static capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  private static escapeRegExp(str): string {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
  }

  public static replaceAll(str: string, find: string, replace: string): string {
    return str.replace(new RegExp(TextHelper.escapeRegExp(find), "g"), replace);
  }

  public static stringPrepare(str: string): string {
    return str.toLowerCase().trim();
  }

  public static getFileExtension(path: string): string {
    return path.slice((Math.max(0, path.lastIndexOf(".")) || Infinity) + 1);
  }
}
