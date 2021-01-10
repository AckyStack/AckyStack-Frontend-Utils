export default class CodecUtils {
    private readonly text;
    constructor(text: string);
    base64Decode(): string;
    base64Encode(): string;
}
