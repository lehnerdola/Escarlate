import  {con } from './connection.js';

export async function adminLogin(cpf, senha) {
       const c =
       `
       select * 
       from tb_admin_login
       where nr_cpf = ?
       and ds_senha = ?
       `;
       const [resp] = await con.query(c, [cpf, senha]);
       return resp[0];
 }

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

 export async function cadastrarProduto(produto){
      const c = 
      `
      insert into tb_produto(nm_produto, ds_tamanho, bt_disponivel, vl_preco, qtd_produto) 
      values (?, ?, ?, ?, ?, ?)
      `;
      const [resp] = await con.query(c, [produto.IdArtista,  produto.nome, produto.tamanho, produto.disponivel, produto.preco, produto.qtd]);
      produto.id = resp.insertId;

      return produto;
 }

 export async function inserirImagemProduto(imagem, id){
      const c = 
      `
      UPDATE tb_produto
      SET img_produto      = ?
      WHERE id_produto     = ?
      `;
    const [resp] = await con.query(c, [imagem, id]);
    return resp.affectedRows;
 }

 export async function salvarProduto(produto) {
    const c = 
    `
        insert into tb_produto (id_artista, nm_produto, ds_tamanho, bt_disponivel, vl_preco, qtd_produto)
                        values (?, ?, ?, ?, ?)
    `  
    const [resp] = await con.query(c, [produto.IdArtista, produto.nome, produto.tamanho, produto.disponivel, produto.preco, produto.qtd])
    return resp.insertId;
}

 export async function salvarProdutoCategoria(idProduto, idCategoria) {
     const comando = `
         insert into tb_produto_categoria (id_categoria, id_produto)
                                   values (?, ?)
     `
 
     const [resp] = await con.query(comando, [idCategoria, idProduto])
 }