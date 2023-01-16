import './Info.css'
import Loggito from '../utils/Loggito'
import IconButton from '../components/IconButton'

function InfoPage({onLinkClick}) {
    const logger = new Loggito('info')

    logger.info('constructor')

    const handleLinkClick = event => {
        event.preventDefault()
    
        onLinkClick()
    }

    logger.info('return')
    
        return <div className= "form container">
        <div className= "infoApp">
            <img className="imgInfo" src="https://media0.giphy.com/media/osAcIGTSyeovPq6Xph/200w.gif?cid=82a1493bj0ogbe0skwz8to1pzm5zkzywsrfb14503z8s1swm&rid=200w.gif&ct=g"/>
        
            <p> Welcome!!! </p>
        <p> Writing notes has never been so easy and fun...
Press the button in the shape of a house to start </p>
        </div>
        <IconButton text="home" onClick={handleLinkClick}/>
        {/* <a className="anchor" href="#" onClick={handleLinkClick}>Home</a> */}
    </div>
}
export default InfoPage
