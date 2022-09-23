import { con } from "./connection.js";

export async function addArtista (artista) {
    const c = 
    `
        insert into tb_artista(nm_artista, ds_artista, img_artista)
                values(?, ?, ?);
    `
    const [resp] = await con.query(c, [artista.nome, artista.descricao, artista.imagem]);
    return resp;  
} 

export async function listarArtistas() {
    const c =
     `
        select id_artista        as id,
               nm_artista        as artista
        from tb_artista
    `
    const [linhas] = await con.query(c);
    return linhas;
}

export async function InserirImagemArtista(imagem, id){
    const c = 
    `
        update tb_artista
           set img_artista      = ?
         where id_artista       = ?
    `
  const [resp] = await con.query(c, [imagem, id]);
  return resp.affectedRows;
}

export async function buscarArtistaPorId(id) {
    const c = 
    `
        select id_artista              as id,
               nm_departamento         as artista
          from tb_artista
         where id_artista = ?
    `

    const [linhas] = await con.query(c, [id]);
    return linhas[0];
}

export async function salvarArtista(artista) {
    const c = 
    `
         insert into tb_artista(id_artista, nm_artista, ds_artista, img_artista)
                  values(?, ?, ?, ?);
    `  
    const [resp] = await con.query(c, [artista.IdArtista, artista.nome, artista.descricao, artista.imagem]);
    return resp.insertId;
}

