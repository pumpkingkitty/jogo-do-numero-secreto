//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo Secreto :0';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Digite um número de 1 a 10';
let numeroLimite = 10
let listaDeNumerosSorteados = []
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); //utilidade extra NÃO nativa do javascript, responsive voice
}

exibirTextoNaTela('h1', 'Jogo Secreto :0');
exibirTextoNaTela('p', 'Digite um número de 1 a 10');

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let textoTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
    
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', textoTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else if (chute > numeroSecreto) {
        exibirTextoNaTela('p', 'O número é menor');
    }
    else{
        exibirTextoNaTela('p', 'O número é maior');
    }
    tentativas = tentativas + 1;
    document.querySelector('input').value = '';
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    
    if(quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function reiniciarJogo() {
    tentativas = 0;
    exibirTextoNaTela('h1', 'Jogo secreto :0');
    exibirTextoNaTela('p', 'Escolha um número de 1 a 10');
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = tentativas + 1;
    document.getElementById('reiniciar').setAttribute('disabled',true);
}

gerarNumeroAleatorio();