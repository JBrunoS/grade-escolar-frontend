import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import Professor from './pages/Professor/Professores'
import Disciplina from './pages/Disciplina/Disciplinas'
import Nivel from './pages/Nivel/Niveis'
import Turma from '../src/pages/Turma/Turmas'
import TurmaRegister from '../src/pages/Turma/TurmaRegister'
import Turno from './pages/Turno/Turnos'
import Home from '../src/pages/Home'
import ProfessorRegister from './pages/Professor/ProfessorRegister'
import ProfessorEdit from './pages/Professor/ProfessorEdit'
import NivelRegister from '../src/pages/Nivel/NivelRegister'
import TurnoRegister from '../src/pages/Turno/TurnoRegister'
import DisciplinaRegister from '../src/pages/Disciplina/DisciplinaRegister'
import DisciplinaEdit from '../src/pages/Disciplina/DisciplinaEdit'
import ForgotPassword from '../src/pages/Password/index'
import Grade from '../src/pages/Grade/index'
import Profile from '../src/pages/Perfil/index'
import LandPage from '../src/pages/LandPage'



export default function Routes(){
    return(
    <BrowserRouter>
        <Switch>
        <Route path='/' exact component={LandPage}/>
        
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/professor' component={Professor} />
                <Route path='/disciplina' component={Disciplina} />
                <Route path='/nivel' component={Nivel} />
                <Route path='/turma' component={Turma} />
                <Route path='/turno' component={Turno} />
                <Route path='/home' component={Home} />
                <Route path='/new/professor' component={ProfessorRegister} />
                <Route path='/edit/professor' component={ProfessorEdit} />
                <Route path='/new/nivel' component={NivelRegister} />
                <Route path='/new/turno' component={TurnoRegister} />
                <Route path='/new/disciplina' component={DisciplinaRegister} />
                <Route path='/edit/disciplina' component={DisciplinaEdit} />
                <Route path='/new/turma' component={TurmaRegister} />
                <Route path='/forgot' component={ForgotPassword} />
                <Route path='/grade' component={Grade} />                
                <Route path='/profile' component={Profile} />                

        </Switch>
    </BrowserRouter>
    )
}