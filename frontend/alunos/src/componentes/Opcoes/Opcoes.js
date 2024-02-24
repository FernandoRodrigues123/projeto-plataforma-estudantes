// Opcoes.js
import React, { useState } from 'react';
import './opcoes.css';

const Opcoes = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <input type='checkbox' id="input-opcoes" checked={modalOpen} onChange={() => setModalOpen(!modalOpen)} />
            <div className={`contem-opcoes ${modalOpen ? 'show-modal' : ''}`}>
                <label htmlFor="input-opcoes">
                    <img className='img-opcoes' src={require('../../imagens/opcoes/menu-burger.png')} alt='opcoes-lista' />
                </label>

                <div className='itens-opcoes'>
                    <ul>
                        <li>
                            <a href='/postar'><h3>postar</h3></a>
                        </li>
                        <li>
                            <a href='/cadastro'><h3>cadastrar</h3></a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Opcoes;
