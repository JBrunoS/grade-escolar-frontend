import React, {useEffect, useState} from 'react'
import { FaSearch, FaTrashAlt } from 'react-icons/fa'
import {Link} from 'react-router-dom'

import Modal from 'react-modal'

import Menu from '../Menu'
import './style.css'
import api from '../../services/api'

Modal.setAppElement('#root')
export default function Grade(){
    //constantes para armazenar as informações que vem do banco
    const [niveis, setNiveis] = useState([])
    const [turnos, setTurnos] = useState([])
    const [turmas, setTurmas] = useState([])
    const [disciplinas, setDisciplinas] = useState([])
    const [professores, setProfessores] = useState([])

    const [segunda, setSegunda] = useState([])
    const [terca, setTerca] = useState([])
    const [quarta, setQuarta] = useState([])
    const [quinta, setQuinta] = useState([])
    const [sexta, setSexta] = useState([])

    const [incidentProfessor1, setIncidentProfessor1] = useState([])
    const [incidentProfessor2, setIncidentProfessor2] = useState([])
    const [incidentProfessor3, setIncidentProfessor3] = useState([])
    const [incidentProfessor4, setIncidentProfessor4] = useState([])
    const [incidentProfessor5, setIncidentProfessor5] = useState([])

    
    //Constantes para receber todos os dados dos professores
    const [professorGeral, setProfessorGeral] = useState([])
    
    //constantes para armazenar todos os incidentes da tabela grade
    
    const dia1 = [];
    const dia2 = [];
    const dia3 = [];
    const dia4 = [];
    const dia5 = [];
    

    //constantes para armazaenar, editar dados na tabela grade
    const [nivel_id, setNivelId] = useState('') 
    const [turno_id, setTurnoId] = useState('')
    const [disciplina_id, setDisciplinaId] = useState('')
    const [professor_id, setProfessorId] = useState('')
    const [turma_id, setTurmaId] = useState('')
    const [dia, setDia] = useState('')
    const [horario, setHorario] = useState('')


    const [minimo, setMinino] = useState(false)
    const [maximo, setMaximo] = useState(false)
    
    
    //const [carga_horaria, setCargaHoraria] = useState('')
    const hora = [1, 2, 3, 4];
    
    
    const escola_id = localStorage.getItem('escola_id');

    const [modalRegisterOpen,setRegisterIsOpen] = useState(false);
    const [modalProfessorOpen,setProfessorIsOpen] = useState(false);
    

    const registerStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          width                 : '90%',
          height                : '90%',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

      const professorStyles = {
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          width                 : '90%',
          height                : '90%',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };


  function openRegisterModal() {
     if ( turma_id === '' || nivel_id === '' || turno_id === '' ) {
         alert('É necessário especificar uma turma antes');
        return
     }
    setRegisterIsOpen(true);
  }
 
  function closeRegisterModal(){
    setProfessorId('')
    setRegisterIsOpen(false);
  }

  function openProfessorModal(){
      setProfessorIsOpen(true)
  }

  function closeProfessorModal(){
      setProfessorId('')
      setProfessorIsOpen(false)
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
    
    useEffect(() => {
        if (turma_id) {
            api.get(`turnos/turma/${turma_id}`, {
                headers: {
                    Authorization: escola_id,
                }
            }).then(response => {
                setTurnos(response.data);
            })
        }

        
    }, [turma_id, escola_id]);

    
    useEffect(() => {
        
        if (nivel_id) {
            api.get(`turmas/nivel/${nivel_id}`, {
                headers: {
                    Authorization: escola_id,
                }
            }).then(response => {
                setTurmas(response.data)
            })
        }
        
    }, [nivel_id, escola_id]);

    useEffect(() => {
        
        if (disciplina_id) {
            api.get(`professor/disciplina/${disciplina_id}`, {
                headers: {
                    Authorization: escola_id,
                }
            }).then(response => {
                setProfessores(response.data)
                
            })
        }
        
    }, [disciplina_id, escola_id]);

    useEffect(() => {
        
        if (nivel_id) {
            api.get(`disciplinas/nivel/${nivel_id}`, {
                headers: {
                    Authorization: escola_id,
                }
            }).then(response => {
                setDisciplinas(response.data)
                
            })
        }
        
    }, [nivel_id, escola_id]);

    useEffect(() => {
        api.get('professor', {
            headers: {
                Authorization: escola_id
            }
        }).then(response => {
            setProfessorGeral(response.data)
        })
    }, [escola_id]);

    async function showGradeProfessor(){
        if(professor_id === ''){
            return
        }
        try{
            await api.get(`grade/professor/${professor_id}`, {
                headers: {
                    Authorization: escola_id
                }
            }).then(response => {

                console.log(response.data.grade);

                dia1.slice()
                dia2.slice()
                dia3.slice()
                dia4.slice()
                dia5.slice()

                for (let i = 0; i < response.data.length; i++) {
                    if (response.data.grade[i].dia === 1) {
                        dia1.push(response.data.grade[i])
                    }
                    if (response.data.grade[i].dia === 2) {
                        dia2.push(response.data.grade[i])
                    }
                    if (response.data.grade[i].dia === 3) {
                        dia3.push(response.data.grade[i])
                    }
                    if (response.data.grade[i].dia === 4) {
                        dia4.push(response.data.grade[i])
                    }
                    if (response.data.grade[i].dia === 5) {
                        dia5.push(response.data.grade[i])
                    }
                }
                setIncidentProfessor1(dia1)
                setIncidentProfessor2(dia2)
                setIncidentProfessor3(dia3)
                setIncidentProfessor4(dia4)
                setIncidentProfessor5(dia5)
            })
        } catch (error) {
            
        }
        openProfessorModal();
    }

    async function handleSubmit(e){
        e.preventDefault();
        
        if(turno_id == 1){
            setMinino(true)
            setMaximo(true)
        }   else {
            setMinino(false)
            setMaximo(false)
        }

        try {
            if (nivel_id === '' || turma_id === '' || turno_id === '') {
                alert('Você precisa selecionar os 3 campos.');
                return
            }
            
               const response = await api.get(`grade/nivel/${nivel_id}/turma/${turma_id}/turno/${turno_id}`, {
                    headers: {
                        Authorization: escola_id,
                    }
                })
                dia1.slice()
                dia2.slice()
                dia3.slice()
                dia4.slice()
                dia5.slice()
                
                
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].dia === 1) {
                        dia1.push(response.data[i])
                    }
                }
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].dia === 2) {

                        dia2.push(response.data[i])
                    }
                }
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].dia === 3) {
                        dia3.push(response.data[i])
                    }
                }
                    
                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].dia === 4) {
                        dia4.push(response.data[i])
                    }
                }

                for (let i = 0; i < response.data.length; i++) {
                    if (response.data[i].dia === 5) {
                        dia5.push(response.data[i])
                    }
                }
                
                setSegunda(dia1)
                setTerca(dia2)
                setQuarta(dia3)
                setQuinta(dia4)
                setSexta(dia5)
                
                
        } catch (error) {
            console.log({error})
        }
    }

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            disciplina_id,
            professor_id,
            turma_id,
            nivel_id,
            turno_id,
            dia,
            horario
         } 
        
         try {
            if (disciplina_id === '' || professor_id === '' || turma_id === '' || turno_id === '' || nivel_id === '' || dia === '' || horario === '') {
                alert('Todos os campos são necessários');
                
            }else{
                
                const response = await api.post('grade', data, {
                    headers: {
                        Authorization: escola_id
                    }
                })
   
                alert(`Cadastro realizado com sucesso as ${response.data}, no ${dia}`);
                closeRegisterModal()
                
                handleSubmit(e)
            }

         } catch (error) {
             alert(error.response.data)
         }

         
    }

    async function handleDelete(id){
        
        try {
            
            await api.delete(`grade/${id}`, {
                headers: {
                    Authorization: escola_id,
                }
            })

            setSegunda(segunda.filter(incident => incident.id !== id))
            setTerca(terca.filter(incident => incident.id !== id))
            setQuarta(quarta.filter(incident => incident.id !== id))
            setQuinta(quinta.filter(incident => incident.id !== id))
            setSexta(sexta.filter(incident => incident.id !== id))
            
        } catch (error) {
            console.log({error})
        }
    }


    return(
        
            
    <div>
        <Modal
        isOpen={modalProfessorOpen}
        onRequestClose={closeProfessorModal}
        style={professorStyles}
        contentLabel="Professores"
        >
    
        <div className="grade-professor">

            <div className="grade-professor-horario">
                    <div>
                        <span>Segunda-feira</span>
                    </div>
                    {incidentProfessor1.map(incident => (
                        <div key={incident.id}>
                            <span>{incident.nome}</span>
                            <span>{incident.nome_disciplina}</span>
                            <span>{incident.nome_turma}</span>
                            <span>{incident.horario}</span>
                        </div>
                    ))}

            </div>
            <div className="grade-professor-horario">
                    <div>
                        <span>Terça-feira</span>
                    </div>
                    {incidentProfessor2.map(incident => (
                        <div key={incident.id}>
                            <span>{incident.nome}</span>
                            <span>{incident.nome_disciplina}</span>
                            <span>{incident.nome_turma}</span>
                            <span>{incident.horario}</span>
                        </div>
                    ))}
            </div>
            <div className="grade-professor-horario">
                    <div>
                        <span>Quarta-feira</span>
                    </div>
                    {incidentProfessor3.map(incident => (
                        <div key={incident.id}>
                            <span>{incident.nome}</span>
                            <span>{incident.nome_disciplina}</span>
                            <span>{incident.nome_turma}</span>
                            <span>{incident.horario}</span>
                        </div>
                    ))}
            </div>
            <div className="grade-professor-horario">
                    <div>
                        <span>Quinta-feira</span>
                    </div>
                    {incidentProfessor4.map(incident => (
                        <div key={incident.id}>
                            <span>{incident.nome}</span>
                            <span>{incident.nome_disciplina}</span>
                            <span>{incident.nome_turma}</span>
                            <span>{incident.horario}</span>
                        </div>
                    ))}
            </div>
            <div className="grade-professor-horario">
                    <div>
                        <span>Sexta-feira</span>
                    </div>
                    {incidentProfessor5.map(incident => (
                        <div key={incident.id}>
                            <span>{incident.nome}</span>
                            <span>{incident.nome_disciplina}</span>
                            <span>{incident.nome_turma}</span>
                            <span>{incident.horario}</span>
                        </div>
                    ))}
            </div>
        </div>
        </Modal>
        <Modal
        isOpen={modalRegisterOpen}
        onRequestClose={closeRegisterModal}
        style={registerStyles}
        contentLabel="Register"
        >
    
        <form className='form-modal-register'  onSubmit={handleRegister}>
            <h1>Adcionar na grade</h1>
            <input disabled value={nivel_id} />
            <input disabled value={turma_id} />
            <input disabled value={turno_id} />
           <select 
                value={disciplina_id}
                onChange={e => setDisciplinaId(e.target.value)}
            >
                <option  value='' >Disciplinas</option>
                {disciplinas.map(incidents => (
                    <option key={incidents.id} value={incidents.id} > {incidents.nome_disciplina} </option>
                ))}
           </select>

           <select 
                value={professor_id}
                onChange={e => setProfessorId(e.target.value)}
            >
                <option  value='' >Professores</option>
                {professores.map(incident => (
                    <option key={incident.id} value={incident.id} > {incident.nome} </option>
                ))}
           </select>
            <div>
                <select
                    value={dia}
                    onChange={e => setDia(e.target.value)}
                >   <option value='' disabled></option>
                    <option value={1} >Segunda-feira</option>
                    <option value={2} >Terça-feira</option>
                    <option value={3} >Quarta-feira</option>
                    <option value={4} >Quinta-feira</option>
                    <option value={5} >Sexta-feira</option>
                </select>

               <input type='time' min="07:00" max="17:00" value={horario} onChange={e => setHorario(e.target.value)} />
        
            </div>
            <button>Adicionar</button>   
        </form>
        </Modal>
        
            
        <div className='container-grade'>
            <Menu />
            <div className='component-grade'>
                
                <form className='button-group-grade' onSubmit={handleSubmit}>
                    <select
                        value={nivel_id}
                        onChange={e => setNivelId(e.target.value)}
                    >
                        <option value=''>Nível</option>
                        {niveis.map( incidents => (
                            <option key={incidents.id} value={incidents.id}>{incidents.nome_nivel}</option>
                        ))}
                    </select>
                    <select
                        value={turma_id}
                        onChange={e => setTurmaId(e.target.value)}
                    >
                        <option  value=''>Turmas</option>
                        {turmas.map(incidents => (
                            <option key={incidents.id} value={incidents.id} > {incidents.nome_turma} </option>
                        ))}
                    </select>
                    <select
                        
                        value={turno_id}
                        onChange={e => setTurnoId(e.target.value)}
                    >
                        <option value=''>Turno</option>
                        {turnos.map(incidents => (
                            <option key={incidents.id} value={incidents.turno_id}> {incidents.turno} </option>
                        ))}
                    </select>

                    <button type='submit'> <FaSearch size={18} color='#FFF' /> Buscar</button>
                    
                </form>
                <form className='button-group'>
                    <div>
                    <select
                    
                        value={professor_id}
                        onChange={e => setProfessorId(e.target.value)}
                    >
                        <option value=''>Ver escala de Professor</option>
                    {professorGeral.map(incidents => (
                        <option key={incidents.id} value={incidents.id}>{incidents.nome}</option>
                    ))}

                    </select>
                    <button type='button' onClick={showGradeProfessor}><FaSearch size={18} color='#FFF' /></button>
                    </div>
                    
                    <button type='button' onClick={openRegisterModal}>Adicionar</button>
                    
                </form>

                <table>
                    <thead>
                        <tr>
                            <th>Segunda</th>
                            <th>Terça</th>
                            <th>Quarta</th>
                            <th>Quinta</th>
                            <th>Sexta</th>
                        </tr>
                    </thead>
                </table>
                <div className='body-info'>
                    <div>
                        {segunda.map(incident => (
                            <div key={incident.id}>
                                <span>{incident.nome_disciplina}</span>
                                <span>{incident.nome}</span>
                                <span>{incident.horario}</span>
                                <Link onClick={() => handleDelete(incident.id)}><FaTrashAlt size={14} color='rgb(208, 63, 58)' /></Link>
                            </div>
                        ))}
                    </div>
                    <div>
                        {terca.map(incident => (
                                <div key={incident.id}>
                                    <span>{incident.nome_disciplina}</span>
                                    <span>{incident.nome}</span>
                                    <span>{incident.horario}</span>
                                    <Link onClick={() => handleDelete(incident.id)}><FaTrashAlt size={14} color='rgb(208, 63, 58)' /></Link>
                                </div>
                            ))}
                    </div>
                    <div>
                        {quarta.map(incident => (
                                <div key={incident.id}>
                                    <span>{incident.nome_disciplina}</span>
                                    <span>{incident.nome}</span>
                                    <span>{incident.horario}</span>
                                    <Link onClick={() => handleDelete(incident.id)}><FaTrashAlt size={14} color='rgb(208, 63, 58)' /></Link>
                                </div>
                            ))}
                    </div>
                    <div>
                        {quinta.map(incident => (
                                <div key={incident.id}>
                                    <span>{incident.nome_disciplina}</span>
                                    <span>{incident.nome}</span>
                                    <span>{incident.horario}</span>
                                    <Link onClick={() => handleDelete(incident.id)}><FaTrashAlt size={14} color='rgb(208, 63, 58)' /></Link>
                                </div>
                            ))}
                    </div>
                    <div>
                        {sexta.map(incident => (
                                <div key={incident.id}>
                                    <span>{incident.nome_disciplina}</span>
                                    <span>{incident.nome}</span>
                                    <span>{incident.horario}</span>
                                    <Link onClick={() => handleDelete(incident.id)}><FaTrashAlt size={14} color='rgb(208, 63, 58)' /></Link>
                                </div>
                            ))}
                    </div>
                </div>
                
                
                
            </div>
        </div>
        </div>
    )
}
