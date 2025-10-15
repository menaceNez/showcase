import * as fs from 'fs';

export async function generateHistogram(filePath: string): Promise<number[] | null> {
    // create a readableStream from file
    try {
        const histogram: number[] = [];
        const data = fs.readFileSync(filePath, 'utf-8');

        for (const char of data) {
            if (!histogram[char.charCodeAt(0)]) histogram[char.charCodeAt(0)] = 1;
            else if (histogram[char.charCodeAt(0)]) histogram[char.charCodeAt(0)]++;
        }

        return histogram;
    }
    catch(err) {
        return null;
    }
}
