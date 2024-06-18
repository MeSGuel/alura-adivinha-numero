let listaDeNumerosSorteados = [];
let tentativas = 1;
let numeroLimite = 10;
// Limite de tentativas para acertar.
let numeroDeTentativas = 10;
let numeroSecreto = gerarNumeroAleatorio();

let textoTentativas = document.getElementById('tentativas');
textoTentativas.innerHTML = `
    <p class="texto__pequeno" id="tentativas">
    <i class="fa-solid fa-circle-info"></i>Você tem 10 tentativas</p>
`;

// Funções de Exibir texto
exibirMensagemInicial();
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    // responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}


// Funções essenciais
function verificarChute() {
    let chute = document.querySelector('input').value;

    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    let tentativasFalhas = `Você errou ${tentativas} vezes!`;
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', mensagemTentativas);
        let palavraSobrou = numeroDeTentativas == 2 ? 'Sobrou' : 'Sobraram';
        palavraTentativa = numeroDeTentativas == 2 ? 'tentativa' : 'tentativas';

        numeroDeTentativas--;
        textoTentativas.innerHTML = `
            <p class="texto__pequeno" id="tentativas">
            <i class="fa-solid fa-circle-info"></i>${palavraSobrou} ${numeroDeTentativas} ${palavraTentativa}</p>
        `;

        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        tentativas++;
        reduzNumeroDeTentativas();
        limparCampo();
    }

    // Condicional para ativar o "Game Over".
    if(tentativas == 11) {
        exibirTextoNaTela('h1', 'Você infelizmente fracassou!');
        exibirTextoNaTela('p', tentativasFalhas);

        document.getElementById('chutar').setAttribute('disabled', true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados)
        return numeroEscolhido;
    }
}

function reduzNumeroDeTentativas() {
    numeroDeTentativas--;
    textoTentativas.innerHTML = `
        <p class="texto__pequeno" id="tentativas">
        <i class="fa-solid fa-circle-info"></i>Você tem ${numeroDeTentativas} tentativas</p>
    `;

    if(numeroDeTentativas == 1) {
    textoTentativas.innerHTML = `
        <p class="texto__pequeno" id="tentativas">
        <i class="fa-solid fa-circle-info"></i>Você tem ${numeroDeTentativas} tentativa</p>
    `;
    } 
    if(numeroDeTentativas == 0) {
    textoTentativas.innerHTML = `
        <p class="texto__pequeno" id="tentativas">
        <i class="fa-solid fa-circle-info"></i>Você não tem mais nada...</p>
    `;
    }

    console.log(numeroDeTentativas);
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    numeroDeTentativas = 11;

    reduzNumeroDeTentativas();
    limparCampo();
    exibirMensagemInicial();

    document.getElementById('chutar').removeAttribute('disabled');
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
