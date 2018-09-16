import * as WebDNN from 'webdnn';

export class WebDNNModel {
    constructor(path) {
        this.model = null;
        this.path = path;
    }

    async init() {
        try {
            this.model = await WebDNN.load(this.path);
            console.warn('Model loaded');
        } catch(e) {
            console.error(e);
        }
    }

    async predict(data, batchSize = 1) {
        if(!Array.isArray(data)) throw 'Data must be passed as array';
        // Apply input data for model
        this.model.inputs[0].set(new Float32Array(data));
        // Run prediction
        await this.model.run();
        // Access and return results
        const response = this.model.outputs[0].toActual();
        // Resolve class label
        return WebDNN.Math.argmax(response);
    }
}