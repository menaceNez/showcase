import { generateHistogram } from "./Frequency";
import { MinHeap } from "./MinHeap";
import { TreeNode } from "./types/TreeNode";
import { BitWriter } from "./BitWriter";
import * as fs from 'fs';
import { createInterface } from "readline";

// globals
let filenameR = '';
const filenameW = 'encodings.txt';

// main call:
async function main() {
    await histoToMinHeap();
}
main();

async function userinput(): Promise<string> {
    const rd = createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => { // return a promise so we can await it, making it synchronus 
        rd.question("Provide file name: ", (answer) => {
            rd.close();
            resolve(answer)
        });
    });
}

// function declarations
async function gethisto(): Promise<number[] | null> {
    filenameR = await userinput();

    const retarr: number[] | null = await generateHistogram(filenameR);

    return retarr;
}

async function histoToMinHeap(): Promise<void> {
    const minHeap = new MinHeap<TreeNode>((a, b) => { return a.frequency - b.frequency; });
    const histogram = await gethisto();

    if (histogram === null) {
        console.log("File does not exist, try again.");
        await userinput();
        return;
    }

    fillMinHeap(histogram, minHeap);

    buildTree(minHeap);

    const trv: TreeNode | undefined = minHeap.pop()!;
    // [key: string] is called an index signature: 
    // allows an object's property name to be defined as a type rather than a name
    const paths: { [key: string]: string } = {}; // key value map like object
    getPaths(trv, '', paths);

    // accumulate the bits into a string 
    const retStr = await buildEncoding(filenameR, paths);

    const paddingBits = (Math.ceil((retStr.length / 8)) * 8) - retStr.length; // gets # of padding

    writeEncodings(paths, paddingBits);

    const bitWriter = new BitWriter();
    // write bits to the shit
    for (const bit of retStr) {
        bitWriter.writeBit(Number(bit)); // write a single bit to 
    }
    bitWriter.flush(); // write remaining bits in buffer 
}


function getPaths(root: TreeNode | null, path: string = '', paths: { [key: string]: string } = {}): void {
    if (root === null) { return; }
    if (root.character !== null) paths[`${root.character}`] = path;

    getPaths(root.left, path + '0', paths);
    getPaths(root.right, path + '1', paths);
}

export async function buildEncoding(filePath: string, paths: { [key: string]: string }): Promise<string> {
    let retStr = '';

    const data = fs.readFileSync(filePath, 'utf-8');

    for (const char of data) {
        retStr += paths[char];
    }

    return retStr;
}

function fillMinHeap(histogram: number[], minHeap: MinHeap<TreeNode>) {
    for (let i = 0; i < histogram.length; i++) {
        if (histogram[i]) {
            const tn: TreeNode = {
                left: null,
                right: null,
                frequency: histogram[i],
                character: String.fromCharCode(i)
            }
            minHeap.insert(tn)
        }
    }
}

function buildTree(minHeap: MinHeap<TreeNode>) {
    while (minHeap.size() > 1) {

        const tn1: TreeNode = minHeap.pop()!;
        const tn2: TreeNode = minHeap.pop()!;

        const rootTn: TreeNode = {
            left: tn2,
            right: tn1,
            frequency: tn1.frequency + tn2.frequency,
            character: null,
        }

        minHeap.insert(rootTn);
    }
}

function writeEncodings(paths: { [key: string]: string }, paddingBits: number): string {
    const pathKeys = Object.keys(paths);
    let codes = ',';

    for (const key of pathKeys) {
        codes += `${key}${paths[key]},`;
    }
    codes += 'pad' + paddingBits;

    fs.writeFile(filenameW, codes, 'utf-8', (err) => {
        if (err) throw Error("error writing encodings.txt");
        console.log(`Encodings written to ${filenameW}, read from ${filenameR}`);
    });

    return codes;
}

