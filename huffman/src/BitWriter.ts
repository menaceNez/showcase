import * as fs from 'fs';

export class BitWriter {
    private byte = 0;
    private bitsFilled = 0;
    private buffer: number[] = [];

    constructor() { }

    writeBit(bit: number) {
        this.byte = (this.byte << 1) | bit;
        this.bitsFilled++;

        if (this.bitsFilled === 8) {
            this.buffer.push(this.byte);
            this.byte = 0;
            this.bitsFilled = 0;
        }
    }

    flush() {
        if (this.bitsFilled > 0) {
            this.byte <<= (8 - this.bitsFilled); // pad remaining bits with 0
            this.buffer.push(this.byte);
            this.byte = 0;
            this.bitsFilled = 0;
        }

        fs.writeFileSync('output.bin', Buffer.from(this.buffer));
    }

    toString() {
        return this.buffer;
    }
}
