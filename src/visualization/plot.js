import Chart from 'chart.js';

export function plotECGCurve(...args) {
    let l = [];

    for(let i = 0; i < args[0].length; i++) {
        l.push(i);
    }

    const ctx = document.querySelector('#chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'ECG-Curve (subsampled, preprocessed)',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: args[0],
                fill: false
            }],
            labels: l
        },
        options: {
            elements: {
                point: {
                    radius: 0
                }
            },
            responsive: true,
        }
    });
}