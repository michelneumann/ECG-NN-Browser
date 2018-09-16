
dnn_fallback_kernel={


tensordot: function(input_arrays, output_arrays, option) {
var A = input_arrays[0];
var B = input_arrays[1];
var C = output_arrays[0];

var index2pos = function(index, stride, shape) {
    var i = 0, pos = [];
    for (i = 0; i < stride.length; i++) pos[i] = Math.floor(index / stride[i]) % shape[i];
    return pos;
};

var pos2index = function(pos, stride) {
    var i = 0, index = 0;
    for (i = 0; i < stride.length; i++) index += pos[i] * stride[i];
    return index;
};

var c_index, c_pos;
var a_base_index, a_offset;
var b_base_index, b_offset;
var i;
var sum = 0;
for (c_index = 0; c_index < C.length; c_index++) {
    c_pos = index2pos(c_index, option.stride_C, option.shape_C);
    a_base_index = pos2index(c_pos, option.stride_A_for_C_axes);
    b_base_index = pos2index(c_pos, option.stride_B_for_C_axes);

    sum = 0;
    for (i = 0; i < option.reduction_size; i++) {
        a_offset = pos2index(index2pos(i, option.stride_A_reduced_axes, option.shape_A_reduced_axes), option.stride_A_reduced_axes_whole);
        b_offset = pos2index(index2pos(i, option.stride_B_reduced_axes, option.shape_B_reduced_axes), option.stride_B_reduced_axes_whole);

        sum += A[a_base_index + a_offset] * B[b_base_index + b_offset];
    }
    C[c_index] = sum;
}

},




elementwisemul_189c2cd2099b07d9b26be17558d058dad850b3433e7038c72419880f: function(input_arrays, output_arrays, option) {
    var v1 = input_arrays[0];
    var v2 = input_arrays[1];
    var v3 = input_arrays[2];
    var v4 = option['7'];
    var v5 = option['9'];
    var D0 = option['11'];
    var D1 = option['13'];
    var d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        var v6 = v1[d0];
        var d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            var v7 = v2[d0 + d1*v4];
            var v8;
            (function(){
                v8 = v7 * v6;
            })();
            v3[d0 + d1*v5] = v8;
        }
    }
},

elementwiseadd_653f37079602765521bb5cca1b07d2b80af153b45cd96b6cf18bb657: function(input_arrays, output_arrays, option) {
    var v1 = input_arrays[0];
    var v2 = input_arrays[1];
    var v3 = input_arrays[2];
    var v4 = option['7'];
    var v5 = option['9'];
    var D0 = option['11'];
    var D1 = option['13'];
    var d0;
    for (d0 = ((1 > 8) ? (0 % (1 / 8)) : 0); d0 < D0; d0 += ((1 > 8) ? (1 / 8) : 1)) {
        var v6 = v1[d0];
        var d1;
        for (d1 = ((1 > 8) ? (0 / (1 / 8)) : 0); d1 < D1; d1 += ((1 > 8) ? 8 : 1)) {
            var v7 = v2[d0 + d1*v4];
            var v8;
            (function(){
                v8 = v7 + v6;
            })();
            v3[d0 + d1*v5] = v8;
        }
    }
},

relu_3693ec08de79c27ab35127ab0a10897afa2249f09efd879f2a8158d1: function(input_arrays, output_arrays, option) {
    var v1 = input_arrays[0];
    var v2 = input_arrays[1];
    var D0 = option['5'];
    var d0;
    for (d0 = 0; d0 < D0; d0 += 1) {
        var v3 = v1[d0];
        var v4;
        (function(){
            v4 = v3 > 0 ? v3 : 0;
        })();
        v2[d0] = v4;
    }
},

softmax: function(input_arrays, output_arrays, option) {
var x = input_arrays[0];
var y = output_arrays[0];
var N = option.N | 0;
var C = option.C | 0;

for (var n = 0; n < N; n++) {
    var set_max = x[n * C];
    for (var c = 0; c < C; c++) {
        var val = x[n * C + c];
        if (val > set_max) {
            set_max = val;
        }
    }

    var sum_exp = 0.0;
    for (var c = 0; c < C; c++) {
        var val = x[n * C + c];
        var exp_x = Math.exp(val - set_max);
        sum_exp += exp_x;
        y[n * C + c] = exp_x;
    }

    for (var c = 0; c < C; c++) {
        y[n * C + c] /= sum_exp;
    }
}
},



};
