export const MAPPING = [
    {
        label: '/',
        description: 'Paced beat'
    },
    {
        label: 'A', 
        description: 'Atrial premature beat'
    },
    {
        label: 'N', 
        description: 'Normal beat'
    },
    {
        label: 'V', 
        description: 'Premature ventricular contraction'
    },
]

export function resolveKerasJS(data, asPercent = true) {
    let max = -Infinity;
    let idx = -1;
    
    for(const key in data) {
        if(data[key] > max) {
            max = data[key];
            idx = key;
        }
    }

    return {
        'label': MAPPING[idx].label,
        'description': MAPPING[idx].description,
        'confidence': asPercent ? data[idx] * 100 : data[idx]
    }
}

export function resolveWebDNN(data, asPercent = true) {
    const idx = data[0] % 360;
   
    if(idx >= MAPPING.length) {
        return {
            'label': 'unknown',
            'description': 'unknown'
        }
    }

    return {
        'label': MAPPING[idx].label,
        'description': MAPPING[idx].description
    }
}