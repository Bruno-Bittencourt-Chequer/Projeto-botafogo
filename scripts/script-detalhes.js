const id = new URLSearchParams(window.location.search).get('id')
console.log(id)
const options = {method: 'GET'};

fetch('https://botafogo-atletas.mange.li/2024-1/'+id, options)
  .then(response => response.json())
  .then(response => {
renderizar(response)
  })
  .catch(err => console.error(err));
  function renderizar(dados){
document.getElementById('nome').innerHTML=dados.nome
document.getElementById('Foto-perfil').setAttribute('src',dados.imagem)
document.getElementById('posicao').innerHTML=dados.posicao
document.getElementById('jogos-nascimento').innerHTML=`JOGOS PELO BOTAFOGO: ${dados.n_jogos}. | NASCIMENTO: ${dados.nascimento}.`
document.getElementById('altura-natural').innerHTML=`ALTURA: ${dados.altura}. | NATURALIDADE: ${dados.naturalidade}.`
document.getElementById('descricao').innerHTML=dados.detalhes

  }