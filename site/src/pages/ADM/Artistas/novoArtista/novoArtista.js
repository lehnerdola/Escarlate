import '../../../../Common.scss'
import './novoArtista.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import storage from 'local-storage';
import { novoArtista, listarArtistas, salvarArtista, buscarimagemArtista, InserirImagemArtista, buscarImagemArtista } from '../../../../api/adminAPI.js';

import addImagem from '../../../../assets/images/Group 61.png';
import MenuADM from '../../../Components/Adm/menu/';
import logo from '../../../../assets/images/logo.png';
import iconCarrinho from '../../../../assets/carrinho.png';
import iconProdutos from '../../../../assets/produto.png';
import iconArtistas from '../../../../assets/artista.png';
import iconSair from '../../../../assets/Vector.png';

export default function addArtista() {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [artistaImagem, setArtistaImagem] = useState();
    const [Id, setId] = useState(0);

    const { idParam } = useParams();

    async function salvarNovoArtista(){
        try{
            const r = await novoArtista(nome, descricao, artista);
                      await InserirImagemArtista(novoArtista.id, imagem);
                      setId(novoArtista.id);

            alert('Artista cadastrado!');

        } catch(err){
            alert(err.message);
        }
    }

    function imagemArtista(){
        document.getElementById('imagemArtista').click();
    }

    function mostrarImagemArtista(){
        if( typeof (imagem) == 'object'){
            return URL.createObjectURL(imagem);
        }
        else{
            return buscarImagemArtista(imagem);
        }
    }

    function novoClick() {
        setNome('');
        setDescricao('');
        setArtistaImagem('');
    }

    useEffect(() => {
        if (idParam) {
            carregarArtistas();
        }
    }, [])

    return (
        <section className='sct'>

            <div className='menu'>
                 <img className='logo' src={logo}/>
                 <span className='txt'> 
                    <img className='icon-carrinho' src={iconCarrinho}/>
                   <h3 className="txt"> Pedidos </h3> 
                 </span>

                 <span> 
                    <img className='icon-produtos' src={iconProdutos}/>
                    <h3 className="txt2"> Produtos </h3>
                 </span>
                 
                 <span> 
                    <img className='icon-artistas' src={iconArtistas}/>
                    <h3 className='txt3'> Artistas </h3>
                 </span>
                 
                <span>
                    <img className='icon-sair' src={iconSair}/>
                    <Link className="bt-sair" to='/'></Link>
                </span>
                 
            </div>

            <hr/>

            <div className='addImg' onClick={imagemArtista}>
            <input type='file' id='img' onChange={e => setArtistaImagem(e.target.files[0])} className='artImg'/>
                   
                   {imagem &&
                   <img src={mostrarImagemArtista()}/> 
                   }

                   {!imagem &&
                   <img src={addImagem} width={250}/>
                   }
            </div>

            <div className='art'>
                <h1 className='tit'> Artistas </h1>

                <div className='form'>
                    <label> Nome do Artista:</label>
                    <input type="text" placeholder="Nome do Artista" />
                </div>

                <div className='form1'>
                    <label> Descrição do Artista: </label>
                    <textarea placeholder="Descrição:"></textarea>
                </div>

                <div className='form2'>
                    <label> Categoria do Artista: </label>
                    <input type="text" placeholder='Categoria 1:'/>
                    <input type="text" placeholder='Categoria 2:'/>
                    <input type="text" placeholder='Categoria 3:'/>
                </div>

                <button className='bt-salvarr'> Salvar </button>

            </div>
        </section>
    )
}