import React, { useState, useEffect } from 'react'
import { FaPlus, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import Menu from '../../Menu'
import './style.css'

import api from '../../../services/api'

Modal.setAppElement('#root')
export default function Niveis(){
    //const [incidents, setIncidents] = useState([])
    const [niveis, setNiveis] = useState([]);
    const [nome_nivel, setNomeNivel] = useState('');
    const [nivel_id, setNivelId] = useState('')

    const escola_id = localStorage.getItem('escola_id')

    const [modalRegisterOpen,setRegisterIsOpen] = useState(false);

    const registerStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          width                 : '40%',
          height                : '40%',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };


      function openRegisterModal(id, nome) {
        setNivelId(id)
        setNomeNivel(nome);
        setRegisterIsOpen(true);
     }
    
     function closeRegisterModal(){
       
       setRegisterIsOpen(false);
     }

     function handleEditNivel(){

        const data = {nome_nivel};

        try {
            api.put(`niveis/${nivel_id}`, data, {
                headers: {
                    Authorization: escola_id
                }
            })
            setNiveis(niveis.filter(!isNaN))
            closeRegisterModal();
            
        } catch (error) {
            
        }

         
     }

    useEffect(() => {
        api.get('niveis', {
            headers: {
                Authorization: escola_id,
            }
        }).then(response => {
            setNiveis(response.data);
        })
    }, [escola_id]);


    return(
        <div className='container-nivel'>
            <Modal
            isOpen={modalRegisterOpen}
            onRequestClose={closeRegisterModal}
            style={registerStyles}
            contentLabel="Register"
            >
    
                <form className='form-modal-edit'>
                    <h3>Editar nome do nível</h3>
                
                <input value={nome_nivel} onChange={e => setNomeNivel(e.target.value)}></input>
                    <button onClick={() => handleEditNivel()}>Editar</button>   
                </form>
            </Modal>
            <Menu />
            <div className='component-nivel'>
                <div className='header-nivel' >
                    <h1>níveis</h1>
                    <Link to='/new/nivel' className='button'><FaPlus size={18} color='#FFFFFF' /> Adicionar</Link>
                </div>

                <section>
                {niveis.map(incidents => (
                    <div className='body-nivel' key={incidents.id}>
                        <span>nível: {incidents.nome_nivel}</span>
                        <span>Código: {incidents.id} </span>
                        <Link onClick={() => openRegisterModal(incidents.id, incidents.nome_nivel)} ><FaEdit size={25} color='#FCA14D' /> </Link>
                </div>
                ))}
                
                </section>
                
            </div>
            
        </div>
    )
}