import fili from 'fili';
import numjs from 'numjs';

export class SignalFilter {
    constructor() {
        this.processor = new fili.CalcCascades();
    }

    lowpass(signal) {
        const coeffs = this.processor.lowpass({
            order: 10,
            characteristic: 'butterworth',
            Fs: 360,
            Fc: 55,
        });

        return new fili.IirFilter(coeffs).multiStep(signal);
    }

    highpass(signal) {
        const coeffs = this.processor.highpass({
            order: 10,
            characteristic: 'butterworth',
            Fs: 360,
            Fc: 1,
        });

        return new fili.IirFilter(coeffs).multiStep(signal);
    }

    bandpass(signal) {
        const coeffs = this.processor.bandpass({
            order: 10,
            characteristic: 'butterworth',
            Fs: 360,
            F1: 1,
            F2: 55
        });

        return new fili.IirFilter(coeffs).multiStep(signal);
    }

    median(signal, width) {
        const result = [];

        for(let i = 0; i < signal.length; i++) {
            const arr = [];

            for(let j = -(width >> 1); j <= (width >> 1); j++) {
                let pos = i + j;
                // Out of bounds prevent, use mirroring
                if(pos < 0) pos = -pos;
                if(pos >= signal.length) pos = i - pos;
                // Push value into subarray
                arr.push(signal[pos]);
            }

            // Calculate median value
            const med = arr.sort()[width >> 1];

            // Set filtered value
            result.push(med);
        }

        return result;
    }
}