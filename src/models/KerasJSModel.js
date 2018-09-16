import K from 'keras-js';

export class KerasJSModel {
    constructor(path, gpu = true) {
        this.model = new K.Model({
            filepath: path,
            transferLayerOutputs: false,
            pauseAfterLayerCalls: false,
            gpu: gpu,
            filesystem: true,
            visualizations: []
        });
    }

    async init() {
        try {
            await this.model.ready();
            console.warn('Model loaded');
        } catch(e) {
            console.error(e);
        }
    }

    predict(data, batchSize = 1) {
        if(!Array.isArray(data)) throw 'Data must be passed as array';
        return this.model.predict({ 'input': new Float32Array(data) });
    }
}