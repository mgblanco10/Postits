import Loggito from '../utils/Loggito'
import './IconButton.css'

function IconButton({onClick, text,classMenu}) {
    const logger = new Loggito ('IconButton')

    logger.info ('return')

    return <button className={`IconButton transparent-button ${classMenu} `} onClick={onClick}><span className="material-symbols-outlined">{text}</span></button>
}

export default IconButton
