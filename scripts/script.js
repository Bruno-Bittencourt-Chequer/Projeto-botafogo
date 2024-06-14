import { hex_sha256 } from './sha256-min.mjs'
const key = 'chave'
const hashPass = hex_sha256(key + 'FOGAO')

const containerGeral = document.getElementById('container-geral')
const fazerLogin = () => {
    const input = document.getElementById('campo-login')
    const hashValue = hex_sha256(key + input.value)
    if (hashValue == hashPass) {
        localStorage.setItem('logado','true')
        getData()

    }
    else {
        alert('Senha incorreta, Tente novamente')
    }
    input.value = ''
}
function gerarTelaLogin() {
    if(localStorage.getItem('logado')=='true'){
        getData()
        return
    }
    containerGeral.classList.add('container-central')
    const box = `
    <div class="box-login">
    <h3>CRAQUES DO BOTAFOGO</h3>
    <img  class="img-login"  src="assets/logo.png" alt="Imagem Não Encontrada">
    <span>Efetue o login com a senha: FOGAO</span>
    <input id="campo-login" type="password" class="campo-login" placeholder="Informe a Senha">
    <button id="btn-entrar" class="btn-login">ENTRAR</button>
</div> 
    `
    containerGeral.innerHTML = box
    document.getElementById('btn-entrar').addEventListener('click', fazerLogin)

}

function gerarListaAtletas(lista = []) {
    containerGeral.classList.remove('container-central')
    const atletas = lista.map(item => {
        return `
    <div class="card-atleta">
                    <img src="${item.imagem}" alt="Imagem Não Carregada">
                    <button id="jogador-${item.id}">DETALHES</button>
                    <h4>${item.nome}</h4>
                </div>
    `
    }).join('')
    
    const tela = `
 <div class="menu-atletas">
            <h3>CRAQUES DO BOTAFOGO</h3>
            <img src="assets/logo.png" alt="Imagem Não Carregada">
            <button id="btn-masculino">MASCULINO</button>
            <button id="btn-feminino">FEMININO</button>
            <button id="btn-completo">ELENCO COMPLETO</button>
            <button id="btn-sair">SAIR</button>
        </div>
        <div class="content-atletas">
            <input type="text" placeholder="Realize sua Busca..." id="input-busca" class="input-busca">
            <button id="btn-busca">Buscar</button>
            <div class="lista-atletas">
                ${atletas}
            </div>
        </div>
`
    containerGeral.innerHTML = tela
    lista.forEach(item=> document.getElementById(`jogador-${item.id}`).addEventListener('click', () => redirectDetalhes(item.id)) )
    document.getElementById('btn-masculino').addEventListener('click', () => getData('masculino'))
    document.getElementById('btn-feminino').addEventListener('click', () => getData('feminino'))
    document.getElementById('btn-completo').addEventListener('click', () => getData())
    document.getElementById('btn-busca').addEventListener('click', () => filtrarDados())
    document.getElementById('btn-sair').addEventListener('click', () =>sair())


}
function sair(){
    localStorage.removeItem('logado')
    window.location.reload(true)
}
function redirectDetalhes(id){
    window.location.href='./detalhes/detalhes.html?id='+id
}
let dadosOriginais = []
function getData(tipo = 'all') {
    const options = { method: 'GET' };

    fetch('https://botafogo-atletas.mange.li/2024-1/' + tipo, options)
        .then(response => response.json())
        .then(response => {
            dadosOriginais = response
            gerarListaAtletas(response)
        })
        .catch(err => console.error(err));
}
function filtrarDados(){
    const termo =document.getElementById('input-busca').value
    const filtrado=dadosOriginais.filter(item=>item.nome.toLowerCase().includes(termo.toLowerCase()))
    gerarListaAtletas(filtrado)
}
//getData()
gerarTelaLogin()