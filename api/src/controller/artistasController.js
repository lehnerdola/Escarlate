import { Router } from "express";
import { addArtista, InserirImagemArtista, listarArtistas, salvarArtista } from "../repository/artistasRepository.js";

const server = Router();

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

