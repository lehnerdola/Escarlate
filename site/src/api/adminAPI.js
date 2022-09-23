import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000'
});

export async function Logar(cpf,senha){
    const r = await api.post('/admin/login' , {
        cpf: cpf,
        senha: senha
    })
    return r.data;
}
export async function novoArtista(nome, descricao, artista){
    const r  = await api.post('/admin/artista', { nome, descricao, artista });
    return r.data;
}

export function buscarImagemArtista(imagem){
    return `${api.getUri()}/${imagem}`
}

export async function InserirImagemArtista(id, imagem) {
    const formData = new FormData();
    formData.append('img', imagem);

    const resposta = await api.put(`/admin/artista/${id}/img`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
    
    return resposta.status;
}

export async function listarArtistas() {
    const r = await api.get('/artistas');
    return r.data;
}

export async function salvarArtista(nome, descricao, artista) {
    const r = await api.post('/admin/produto', { nome, descricao, artista });
    return r.data;
}

export async function cadastrarProduto( IdArtista, nome, tamanho, disponivel, preco, qtd, categorias) {
	const r = await api.post('/admin/cadproduto', { IdArtista, nome, tamanho, disponivel, preco, qtd, categorias});
	return r.data;
}

export async function enviarImagemProduto(imagem, id){
    const formData = new FormData();
    formData.append('imagem', imagem);

    const resposta = await api.put(`/produto/${id}/imagem`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
    return resposta.status;
}

export async function listarCategorias() {
    const r = await api.get('/produto/categoria');
    return r.data;
}

export async function listarArtistas() {
    const r = await api.get('/artistas');
    return r.data;
}

export function buscarImagem(imagem){
    return `${api.getUri()}/${imagem}`
}

export async function salvarProduto(IdArtista, nome, tamanho, disponivel, preco, qtd, categorias) {
    const r = await api.post('/admin/produto', {IdArtista, nome, tamanho, disponivel, preco, qtd, categorias });
    return r.data;
}

