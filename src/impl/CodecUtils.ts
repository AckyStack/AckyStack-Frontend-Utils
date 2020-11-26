import {Base64} from "js-base64";

interface CodecUtilsInterface {
    /**
     * Base64 Encoding
     * @return encoded string
     */
    base64Encode(): string;

    /**
     * Base64 Decoding
     * @return decoded string
     */
    base64Decode(): string;
}

export default class CodecUtilsImpl implements CodecUtilsInterface {
    private readonly _text: string;

    /**
     * Codec Utils Constructor
     * @param text the string value that you want encode or decode
     */
    constructor(text: string) {
        if (!text) {
            throw new Error('The parameter \'text\' cannot be empty, you have to provide value');
        }
        this._text = text;
    }

    base64Decode(): string {
        return Base64.decode(this._text);
    }

    base64Encode(): string {
        return Base64.encode(this._text);
    }
}
