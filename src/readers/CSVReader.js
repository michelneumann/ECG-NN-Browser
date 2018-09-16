import { AbstractReader } from './AbstractReader';

export class CSVReader extends AbstractReader {
    constructor(path, splitChar = ',') {
        super();
        this.readPointer = 0;
        this.path = path;
        this.splitChar = splitChar;
        this.ready = false;
    }

    async init() {
        await new Promise((resolve, reject) => {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if(xhttp.readyState == 4 && xhttp.status == 200) {
                    this._preprocess(xhttp.responseText);
                    this._postprocess();
                    resolve();
                }
            };
            xhttp.open('GET', this.path, true);
            xhttp.send();
        });
    }

    _preprocess(data) {
        this.data = data.split(this.splitChar);
        // Cast string values read from csv into numbers
        for(let i = 0; i < this.data.length; i++) {
            this.data[i] = Number(this.data[i]);
        }
    }

    // Sanitize data dump from ecg device
    _postprocess() {
        for(let i = 0; i < this.data.length; i++) {
            // Dump might contains zero peaks, remove
            if(this.data[i] == 0.0) {
                // Interpolate value using previous
                this.data[i] = this.data[i - 1];
            }
        }
    }

    read(length = 500) {
        const from = this.readPointer;
        const to = this.readPointer += length;
        
        // Prevent out of bounds, return null as eof
        if(to > this.data.length) return null;
        else return this.data.slice(from, to);
    }

    canRead(length = 500) {
        return !(this.readPointer + length > this.data.length);
    }
}