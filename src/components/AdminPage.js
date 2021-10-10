import React from 'react';
import Header from './Header';
import MenuItem from './MenuItem';
import FormAddUser from './AdminComponents/FormAddUser';
import FormListUser from './AdminComponents/FormListUser';
import FormModifUser from './AdminComponents/FormModifUser';
import HelpPage from './AdminComponents/HelpPage';
import Footer from './Footer';
import FormModifFooter from './AdminComponents/FormModifFooter';
import ProgramsPage from './AdminComponents/ProgramsPage';
import {history} from '../routers/AppRouter';
import RegisterPage from './UserComponents/RegisterPage';
import UserAccount from './UserAccount';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown} from '@fortawesome/free-solid-svg-icons';
import * as constantes from './Constantes';


export default class AdminPage extends React.Component {

    state = {
        renderComponent: RegisterPage
    }

    renderHandler = (renderComponent,selected) => {
        this.setState(() => ({
            renderComponent,
        }));
    }

    valida_sesion=()=>{
        let user = JSON.parse(sessionStorage.getItem("USER"));
        if(user==null){
            history.push(`/`);
            window.location.reload();
        }
    }

    componentDidMount=()=>{
        this.valida_sesion();
    }
    

    render(){
        return(
            <div>
                <Header renderHandler={this.renderHandler}/>
                <div className='container'>
                    <nav className="menu-navegacion">
                        <MenuItem renderHandler={this.renderHandler} Component={RegisterPage} titulo="Cargar Archivo Asistencias"/>
                        {/*Agregamos drop menu para usuarios*/}
                        <div className="menu-item drop-menu-item">
                            <div className="drop-menu-item-info">
                                <span>Usuarios </span>
                                <FontAwesomeIcon icon={faChevronDown} className="icono"/>
                            </div>
                            <div className="drop-menu-item-options">
                                <MenuItem renderHandler={this.renderHandler} Component={FormAddUser} titulo="Agregar Usuario"/>
                                <MenuItem renderHandler={this.renderHandler} Component={FormListUser} titulo="Listar Usuarios"/>
                                <MenuItem renderHandler={this.renderHandler} Component={FormModifUser} titulo="Modificar Usuario"/> 
                            </div>
                        </div>
                        
                        <MenuItem renderHandler={this.renderHandler} Component={FormModifFooter} titulo="Pie de Pagina"/>
                        <MenuItem renderHandler={this.renderHandler} Component={ProgramsPage} titulo="Programas"/>
                        <MenuItem renderHandler={this.renderHandler} Component={HelpPage} titulo="Ayuda"/>
                    </nav>
                    <div className='panel' id="panel">
                        <this.state.renderComponent/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}