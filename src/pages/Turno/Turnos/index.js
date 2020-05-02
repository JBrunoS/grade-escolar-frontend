import React, {useState, useEffect} from 'react'
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'

import Menu from '../../Menu'
import '../Turnos/style.css'

import api from '../../../services/api'

Modal.setAppElement('#root')

export default function Turnos(){
    const [turnos, setTurnos] = useState([])
    const [turno, setNomeTurno] = useState('')
    const [turno_id, setTurnoId] = useState('')


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
        setTurnoId(id)
        setNomeTurno(nome)
        setRegisterIsOpen(true);
     }
    
     function closeRegisterModal(){
       
       setRegisterIsOpen(false);
     }

     function handleEditNivel(){

        const data = {turno};

        try {
            api.put(`turno/${turno_id}`, data, {
                headers: {
                    Authorization: escola_id
                }
            })
            setTurnos(turnos.filter(!isNaN))
            closeRegisterModal();
            
        } catch (error) {
            
        }
     }

    useEffect(() => {
        api.get('turnos', {
            headers: {
                Authorization: escola_id,
            }
        }).then(response => {
            setTurnos(response.data);
        })
    }, [escola_id]);


    return(
        <div className='container-turno'>
             <Modal
            isOpen={modalRegisterOpen}
            onRequestClose={closeRegisterModal}
            style={registerStyles}
            contentLabel="Register"
            >
    
                <form className='form-modal-edit'>
                    <h3>Editar nome do nível</h3>
                
                <input value={turno} onChange={e => setNomeTurno(e.target.value)}></input>
                    <button onClick={() => handleEditNivel()}>Editar</button>   
                </form>
            </Modal>
            <Menu />
            <div className='component-turno'>
                <div className='header-turno' >
                    <h1>turnos</h1>
                    <Link to='/new/turno' className='button'><FaPlus size={18} color='#FFFFFF' /> Adicionar</Link>
                </div>

                <section>
                
                {turnos.map(incidents => (
                    <div className='body-turno'key={ incidents.id }>
                        <span>Turno:{ incidents.turno } </span>
                        <span>Código: { incidents.id } </span>
                        <Link onClick={() => openRegisterModal(incidents.id, incidents.turno)}><FaEdit size={25} color='#FCA14D' /> </Link>
                </div>
                ))}
                
                
                
                </section>
                
            </div>
            
        </div>
    )
}