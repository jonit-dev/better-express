import Cryptr from "cryptr";
import { injectable } from "inversify";

import { appEnv } from "../config/env";


@injectable()
export class EncryptionHelper {

  public cryptr: Cryptr;

  constructor(
  ) {
    this.cryptr = new Cryptr(appEnv.encryption.genericHash);
  }


  public encrypt(text: string): string {
    return this.cryptr.encrypt(text);
  };

  public decrypt(hash): string {
    return this.cryptr.decrypt(hash);
  }
}

