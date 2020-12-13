var methods = module.exports = {};


methods.encryption = function (pass) {
    let result = [];
    let interim = [];

    //Transform parola initiala in cod ASCII
    for (var i in pass) {
        interim.push(pass.charCodeAt(i));
    }

    for (var i = 0; i < interim.length; i = i + 2) {

        //Adaug 1 sau 0 in functie de paritatea numarului(codului ASCII)
        if (interim[i] % 2 == 0) {
            interim.splice(i + 1, 0, 48);
        } else {
            //Din numerele impare scad 1
            interim[i]--;
            interim.splice(i + 1, 0, 49);
        }
        interim[i] = interim[i]/2;
    }
    for (var i = 0; i < interim.length; i++){
        result.push(String.fromCharCode(interim[i]))
    }
    /*for (var i = 0; i < result.length; i++) {
        console.log(result[i]);
    }*/
    var result_final = result.join('');
    return result_final;
}

methods.decryption = function (pass) {
    let result = [];
    let interim1 = [];
    let interim2 = [];
    var j=0;

    for (var i in pass) {
        interim1.push(pass.charCodeAt(i));
    }

    for (var i=0; i<interim1.length; i=i+2){
        interim2[j] = interim1[i]*2;
        if (interim1[i+1] == 49){
            interim2[j]++;
        }
        j++;
    }
    for (var i in interim2){
        result.push(String.fromCharCode(interim2[i]))
    }

    var result_final = result.join('');
    return result_final;
}

module.exports.data = methods;