import crypto from "crypto";

export interface IEncryptedHash {
  iv: string,
  content: string
}

export class EncryptionHelper {
  private _algorithm: string;
  private _key: string;
  private _iv = crypto.randomBytes(16)

  constructor() {
    this._algorithm = "aes-256-ctr";
    this._key = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3";
  }

  public encrypt(text: string): IEncryptedHash {

    const cipher = crypto.createCipheriv(this._algorithm, this._key, this._iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: this._iv.toString("hex"),
      content: encrypted.toString("hex")
    };
  };

  public decrypt(hash): string {

    const decipher = crypto.createDecipheriv(this._algorithm, this._key, Buffer.from(hash.iv, "hex"));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, "hex")), decipher.final()]);

    return decrypted.toString();
  };
}




