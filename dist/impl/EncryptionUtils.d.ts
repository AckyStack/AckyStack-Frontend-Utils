interface EncryptionUtilsInterface {
    md5(): string;
    hashPasswd(username: string): string;
    sha256(): string;
}
export default class EncryptionUtilsImpl implements EncryptionUtilsInterface {
    private readonly _text;
    constructor(text: string);
    md5(): string;
    hashPasswd(username: string): string;
    sha256(): string;
}
export {};
