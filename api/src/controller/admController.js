import { adminLogin, cadastrarProduto, inserirImagemProduto, salvarProdutoCategoria } from "../repository/admRepository.js";
import { addArtista, InserirImagemArtista, listarArtistas, salvarArtista } from "../repository/artistasRepository.js";

import { Router } from "express";
const server = Router();

import multer from 'multer';
import { buscarCategoriaPorId } from "../repository/categoriaRepository.js";
const upload = multer({ dest: 'storage/produtos' })

server.post('/admin/login', async (req,resp) => {
       try {
            const {cpf, senha} = req.body;
            const resposta= await adminLogin(cpf,senha);

            if(!resposta) {
               throw new Error('Credenciais inválidas')
            } 
                     
            resp.send(resposta)

      } 
       catch (err) {
            resp.status(401).send({
                erro: err.message
            });
       } 
    })
     
server.post('/admin/cadproduto' , async (req,resp) => {
     try {
          const produto = req.body;
          const idProduto = await cadastrarProduto(produto);
          
          if(!produto.nome || produto.nome == null){
              throw new Error('Nome inválido')
          }

          if(!produto.tamanho){
              throw new Error('Tamanho inválido')
          }

          if(!produto.disponivel || produto.disponivel != true){
              throw new Error('O produto não está disponivel')
          }

          if(!produto.estoque < 0){
              throw new Error('Fora de estoque')
          }

         if(!produto.preco || produto.preco < 0){
              throw new Error('Preço inválido')
         }

         for (const idCateg of produto.categorias) {
              const cat = await buscarCategoriaPorId(idCateg);

         if (cat != undefined)
              await salvarProdutoCategoria(idProduto, idCateg);
         }

        resp.status(204).send();

        } catch (err) {
          resp.status(400).send({
               erro: err.message
          })
     }
})    

server.put('/produto/:id/imagem', upload.single('imagem') , async (req, resp) => {
     try {
         const { id } = req.params;
         const imagem = req.file.path;
 
         const resposta = await inserirImagemProduto(imagem, id);
         if (resposta != 1) {
             throw new Error('UEPAAAA, deu erro!')
         }
 
         resp.status(204).send();
     } catch (err) {
         resp.status(400).send({
             erro:err.message
         })
     }
 })



server.post('/admin/artista' , async (req, resp) => {
    try{
        const novoArtista = req.body;
        const IdArtista = await salvarArtista(artista)

        if(!novoArtista.nome || novoArtista.nome == null){
            throw new Error('Nome inválido')
        }

        if(!novoArtista.descricao || novoArtista.descricao == null){
            throw new Error('Desrição inválida')
        }

        if(!novoArtista.imagem || novoArtista.imagem == null){
            throw new Error('Imagem do artista é obrigatória')
        }

        if(novoArtista.IdArtista == null || novoArtista.IdArtista != undefined){
            await salvarArtista(IdArtista);
        }

        const artista = await addArtista(novoArtista);
        resp.send(artista)

    } catch(err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})

server.put('admin/artista/:id/imagem', upload.single('imagem'), async (req, resp) => {
    try {
        if (!req.file)
            throw new Error('Escolha a imagem der perfil do artista.');
            
        const { id } = req.params;
        const imagem = req.file.path;

        const resposta = await InserirImagemArtista(imagem, id);
        if (resposta != 1)
            throw new Error('A imagem não salva.');

        resp.status(204).send();

    } catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
}) 

server.get('/artistas', async (req, resp) => {
    try {
        const l = await listarArtistas();
        resp.send(l);
    }
    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
})


export default server;