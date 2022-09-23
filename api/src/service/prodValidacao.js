
import { buscarCategoriaPorId } from "../repository/categoriaRepository.js";


export async function validarProd(produto) {
    if (produto.nome == undefined || produto.nome == ''){
        throw new Error('Nome do produto é obrigatório!');
    }

    else if (produto.tamanho == undefined || produto.tamanho == null){
        throw new Error('O tamanho do produto é obrigatório!')
    }

    else if(produto.disponivel == undefined || produto.disponivel != true){
        throw new Error('O produto não pode estar indisponível!')
    }

    else if(IsNaN(produto.estoque == undefined || produto.estoque <= 0 || produto.estoque == null)){
        throw new Error('O produto não pode estar fora de estoque!')
    }

    else if (isNaN(produto.preco) || produto.preco <= 0) {
        throw new Error('Preço do produto é obrigatório!');
    }
    else if (produto.idCategoria == undefined) {
        throw new Error('Categoria é obrigatória!');
    }

    const catg = await buscarCategoriaPorId(produto.idCategoria);
    if (catg == undefined) {
        throw new Error('Categoria inválida');
    }
}