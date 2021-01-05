export default class EncryptionUtils {
    private readonly text;
    constructor(text: string);
    md5(): string;
    sha256(): string;
    encryptPassword(username: string): string;
}
