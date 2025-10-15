import * as fs from 'fs';
import * as readline from 'readline';
// read encodings.txt for paths and 
const codes = new Map<string, string>();
let padding = -1;

function getPaths() {
    const data = fs.readFileSync('encodings.txt', 'utf-8');
    if(data.length === 1) {
        console.log("no encodings.txt present!");
        return;
    }

    // read first character, once we hit a ',' read the next character then the encodings
    let retStr = '';
    let char = '';
    for(let i = 0 ; i < data.length; i++) {
        // if ',' take next character, skip the index read the encoding save it to map
        if(data[i] === ',') {

            if(retStr !== '') {
                codes.set(retStr, char);
                retStr = ''
                char = '';
            }

            char = data[i+1];
            i += 2; // skip over ',' and its char
        }
        // accumulate 0's and 1's 
        retStr += data[i];

    }
    console.log("codes: ", codes);
}


async function readEncoding() {
    getPaths();
    const data = fs.readFileSync("output.bin");
    const lastByteIdx = data.length - 1;
    let len = 8;
    let str = '';
    let ret = '';
    let r = 0;

    for (let i = 0; i < data.length; i++) {
        r++;
        const byte = data[i].toString(2).padStart(8, '0');

        (i === lastByteIdx) ? len -= padding : len; // if we are at last byte dont read padding

        for (let j = 0; j < len; j++) {
            str += byte[j];
            const ifLetter = codes.get(str);

            if (ifLetter) {
                str = '';
                ret += ifLetter;
            }
        }
    }
    writeFile(ret);
}

function writeFile(decodedMsg: string) {
  
    fs.writeFile("decodedFile.txt", decodedMsg, 'utf-8', (err) => {
        if (err) throw Error("cannot write decoded message");
        console.log("message decoded");
    });
}

readEncoding();