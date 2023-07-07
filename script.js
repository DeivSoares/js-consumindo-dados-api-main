async function buscaEndereco(cep) {
    var mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";
    try {
        var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        var consultaCEPConvertida = await consultaCEP.json();
        if (consultaCEPConvertida.erro) {
            throw Error('CEP não existente!');
        }
        var estado = document.getElementById('estado');
        var cidade = document.getElementById('cidade');
        var bairro = document.getElementById('bairro');
        var logradouro = document.getElementById('endereco')
        var complemento = document.getElementById('complemento');

        estado.value = consultaCEPConvertida.uf;
        cidade.value = consultaCEPConvertida.localidade;
        bairro.value = consultaCEPConvertida.bairro;
        logradouro.value = consultaCEPConvertida.logradouro;
        complemento.value = consultaCEPConvertida.complemento;

        console.log(consultaCEPConvertida);
        return consultaCEPConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = `<p style="color: red;">CEP inválido. Tente novamente!</p>`
        console.log(erro);
    }
}

var cep = document.getElementById('cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));

/* --- Lidando com várias requisições ao mesmo tempo com Promise.all ---

let ceps = ['01001000', '01001001'];
let conjuntoCeps = ceps.map(valores => buscaEndereco(valores));
console.log(conjuntoCeps);
Promise.all(conjuntoCeps).then(respostas => console.log(respostas));

*/