import Image from 'next/image';
import logoHorizontalImg from '../../public/imagens/logoHorizontal.svg';
import imagemLupa from '../../public/imagens/lupa.svg';
import Navegacao from './Navegacao';
import { useState } from 'react';
import ResultadoPesquisa from './ResultadoPesquisa';
import UsuarioService from '@/services/UsuarioService';

const usuarioService = new UsuarioService();

export default function Cabecalho() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState([]);

    const aoPesquisar = async (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if (termoPesquisado.length < 3) {
            return;
        }

        try {
            const {data} = await usuarioService.pesquisar(termoPesquisado);
            console.log(data);
        } catch (error) {
            alert('Erro ao pesquisar usuario.' + error?.response.data?.erro);
        }

        setResultadoPesquisa([
            {
                avatar: '',
                nome: 'Douglas',
                email: 'douglas@devagram.com',
                _id: '23456'
            },
            {
                avatar: '',
                nome: 'Daniel',
                email: 'daniel@devagram.com',
                _id: '664567'
            },
            {
                avatar: '',
                nome: 'Rafael',
                email: 'rafael@devagram.com',
                _id: '788956'
            }
        ])
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', {id});
    }

    return (
        <header className='cabecalhoPrincipal'>
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPrincipal'>
                    <Image
                        src={logoHorizontalImg}
                        alt='logo devagram'
                        layout='fill'
                    />
                </div>

                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <Image
                            src={imagemLupa}
                            alt='Icone lupa'
                            layout='fill'
                        />
                    </div>

                    <input
                        type='text'
                        placeholder='Pesquisar'
                        value={termoPesquisado}
                        onChange={aoPesquisar}
                    />
                </div>

                <Navegacao className='desktop' />
            </div>
            
            {resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => (
                        <ResultadoPesquisa
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                </div>
            )}

        </header>
    );
}