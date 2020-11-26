interface CodecUtilsInterface {
    base64Encode(): string;
    base64Decode(): string;
}
export default class CodecUtilsImpl implements CodecUtilsInterface {
    private readonly _text;
    constructor(text: string);
    base64Decode(): string;
    base64Encode(): string;
}
export {};
