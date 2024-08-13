const input = document.getElementById('meu_input');
const botao = document.getElementById('meu_botao');
const lista = document.getElementById('minha_lista');


/*Checkbox */
function adicionarCheckbox(meuItemDaLista) {
    const meuCheckBox = document.createElement('input');

    meuCheckBox.setAttribute('type', 'checkbox');

    meuCheckBox.addEventListener('change', concluirTarefa);

    meuItemDaLista.appendChild(meuCheckBox);
}

function concluirTarefa(event) {
    const meuCheckBox = event.currentTarget;

    const meuItemDaLista = meuCheckBox.parentElement;

    const meuLabel = meuCheckBox.nextElementSibling;

    if (meuCheckBox.checked) {
        meuLabel.classList.add('riscado');

        const meuBotaoDeRemover = meuLabel.nextElementSibling;

        const meuBotaoDeEditar = meuBotaoDeRemover.nextElementSibling;

        meuItemDaLista.removeChild(meuBotaoDeEditar);

        meuItemDaLista.removeChild(meuBotaoDeRemover);
    } else {
        meuLabel.classList.remove('riscado');

        adicionarBotaoRemover(meuItemDaLista);

        adicionarBotaoEditar(meuItemDaLista);
    }
}

function removerTarefa(event) {    
    const meuBotao = event.target;

    const meuItemDaLista = meuBotao.parentElement;

    lista.removeChild(meuItemDaLista);
}


function adicionarSpan(meuItemDaLista, input) {
    const meuLabel = document.createElement('span');

    meuLabel.textContent = input.value;

    meuLabel.setAttribute('class', 'text-muted-foreground text-sm');

    meuItemDaLista.appendChild(meuLabel);
}

function adicionarBotaoRemover(meuItemDaLista) {
    const meuBotaoDeRemover = document.createElement('button')

    meuBotaoDeRemover.textContent = 'X'

    meuBotaoDeRemover.classList.add('botao-remover');

    meuBotaoDeRemover.setAttribute('class', 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10');

    meuBotaoDeRemover.addEventListener('click', removerTarefa);

    meuItemDaLista.appendChild(meuBotaoDeRemover);
}

/* Editando tarefas */
function adicionarBotaoEditar(meuItemDaLista) {
    const meuBotaoDeEditar = document.createElement('button');

    meuBotaoDeEditar.textContent = 'editar';

    meuBotaoDeEditar.setAttribute('class', 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10');

    meuBotaoDeEditar.addEventListener('click', editarTarefa);

    meuItemDaLista.appendChild(meuBotaoDeEditar);
}

function enviarEdicaoDeTarefa(meuItemDaLista, inputDeEditar) {
    meuItemDaLista.innerHTML = "";

    adicionarCheckbox(meuItemDaLista);

    adicionarSpan(meuItemDaLista, inputDeEditar);

    adicionarBotaoRemover(meuItemDaLista);

    adicionarBotaoEditar(meuItemDaLista)
}

function editarTarefa(event) {
    const meuBotao = event.target;

    const meuItemDaLista = meuBotao.parentElement;

    const minhaLabel = meuItemDaLista.querySelector('span');

    const inputDeEditar = document.createElement('input');

    inputDeEditar.setAttribute('type', 'text');
    inputDeEditar.setAttribute('value', minhaLabel.textContent);
    
    const botaoDeEnviarMudanca = document.createElement('button');
    
    botaoDeEnviarMudanca.textContent = "Enviar";

    botaoDeEnviarMudanca.addEventListener('click', () => enviarEdicaoDeTarefa(meuItemDaLista, inputDeEditar));
    
    meuItemDaLista.innerHTML = "";

    meuItemDaLista.appendChild(inputDeEditar);
    meuItemDaLista.appendChild(botaoDeEnviarMudanca);
}

/* Criando novas tarefas */
function criarTarefa() {
    const validaString = /^\S+$/;
    const inputValueFormatado = input.value.trim();

    // Se for true, significa que a string tem texto
    // Se for false, significa que a string tem somente espaços em branco
    const stringNaoTemTexto = !validaString.test(inputValueFormatado);

    // ! <- Negação do valor boleano
    if (stringNaoTemTexto){
        alert('Tarefa não pode ser vazia')
        return;
    }

    const meuItemDaLista = document.createElement('li');

    meuItemDaLista.textContent = input.value;

    lista.appendChild(meuItemDaLista);

    input.value = ''

    adicionarCheckbox(meuItemDaLista);

    adicionarSpan(meuItemDaLista, input);

    adicionarBotaoRemover(meuItemDaLista);

    adicionarBotaoEditar(meuItemDaLista);

    const minhaListaAtual = lista.children;

    const arrayDaMinhaLista = Array.from(minhaListaAtual);

    // Lista original: [HTMLElement1, HTMLElement2, HTMLElement3, HTMLElement4]
    // prioridade: 1
    // meuItemDaLista: HTMLElement5
    // Lista gerada: [HTMLElement1, HTMLElement5, HTMLElement2, HTMLElement3, HTMLElement4]
    arrayDaMinhaLista.splice(prioridadeValor, 0, meuItemDaLista);

    lista.innerHTML = '';

    arrayDaMinhaLista.forEach((item) => {
        lista.appendChild(item);
    })

    input.value = '';
}

botao.addEventListener('click', criarTarefa)

