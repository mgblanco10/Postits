import {useState} from 'react'
import './Header.css'
import Menu from './Menu'
import IconButton from './IconButton'
import Loggito from '../utils/Loggito'

function Header({name, onLogoutClick, onSettingsClick, view:viewHome}){
    const logger = new Loggito ('Header')
    
    const [view, setView] = useState(null) // [null, f () {}]

    const handleMenuClick = () => {
        setView('menu')

        logger.debug('setView', 'menu')
    }

    const handleCloseClick = () => {
        setView(null)
    
        logger.debug('setView', null)
    }

    const handleSettingsClick = () => {
        setView(null)

        logger.debug('setView', null)

        onSettingsClick()
    }

    logger.info('return')
       
        return (<header className="Header container">
        
    <div className= "container containerHeader">
    <img className="imgHeader" src="https://media4.giphy.com/media/lnyLJ57x8jJ13ZDhTZ/giphy.gif?cid=a267dfa35mpqsy8edagjq1n6d14c20r903cyt2gneqzbgona&rid=giphy.gif&60490a1f0d4f710d77dfff46&1653264000136"/>
        <h1 className="title"> Hello {name} ! </h1>
 
            { view === null && <IconButton classMenu='menuClose' text="menu" onClick={handleMenuClick} />}
            { view === 'menu' && <IconButton classMenu='menuClose' text="close" onClick={handleCloseClick} />}
    </div>

            { view === 'menu' && <Menu onLogoutClick={onLogoutClick} onSettingsClick={handleSettingsClick} view={viewHome} />}
        </header>)
        
}

export default Header

