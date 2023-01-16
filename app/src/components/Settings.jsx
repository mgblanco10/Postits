import './Settings.css'
import IconButton from './IconButton'
import Loggito from '../utils/Loggito'
import updateUserPassword from '../logic/updateUserPassword'
import updateUserEmail from '../logic/updateUserEmail'
import withContext from '../utils/withContext'

function Settings({onCloseClick, context: { handleFeedback }}) {
    const logger = new Loggito('Settings')

    logger.info('return')

    const handleFormSubmitPassword = event => {
        event.preventDefault()

        // const {target: {oldPassword:{value:oldPassword}, newPassword:{value:newPassword}, newPasswordRepeat:{value:newPasswordRepeat}}} = event
        const { target: form } = event

        const {
            oldPassword: { value: oldPassword },
            newPassword: { value: newPassword },
            newPasswordRepeat: { value: newPasswordRepeat } 
        } = form

        try {
            updateUserPassword(sessionStorage.token, oldPassword, newPassword, newPasswordRepeat, error => {
                if (error) {
                    handleFeedback({message:error.message, level: 'warning'})
                    
                    logger.warn(error.message)

                    return
                }
                handleFeedback({message:`Password update`, level: 'success'})
                form.reset()
                onCloseClick()
                
            })
        } catch(error) {
            handleFeedback({message:error.message, level: 'warning'})

            logger.warn(error.message)
        }
    }
        const handleFormSubmitEmail = event => {
            event.preventDefault()
            const { target: form } = event
    
            const {
                oldEmail: { value: oldEmail },
                newEmail: { value: newEmail },
                newEmailRepeat: { value: newEmailRepeat }
            } = form
        try {
            updateUserEmail(sessionStorage.token, oldEmail, newEmail, newEmailRepeat, error => {
                if (error) {
                    handleFeedback({ message: error.message, level: 'warning' })
                    logger.warn(error.message)
    
                    return
                }
    
                handleFeedback({message:`Email update`, level: 'success'})
                form.reset()
                onCloseClick()
            })
        } catch(error) {
            handleFeedback({message:error.message, level: 'warning'})

            logger.warn(error.message)
        }
    }

    logger.info('return')

        return <div className="settings container">

            <form className="update-password-form form" onSubmit={handleFormSubmitPassword}>
            <img className="imgSettings"
                src="https://www.nic.lat/wp-content/uploads/2019/01/password-big.png"/>
                <div className="form__field">
                    <label htmlFor="oldPassword">Current Password</label>
                    <input className="input" type="password" name="oldPassword" placeholder="old password" id="oldPassword" />
                </div>

                <div className="form__field">
                    <label htmlFor="newPassword">New Password</label>
                    <input className="input" type="password" name="newPassword" placeholder="new password" id="newPassword" />
                </div>

                <div className="form__field">
                    <label htmlFor="newPasswordRepeat">Repeat New Password</label>
                    <input className="input" type="password" name="newPasswordRepeat" placeholder="repeat new password" id="newPasswordRepeat" />
                </div>
                <button className="button" type="submit">Update</button>
            </form>

            <form className="update-password-form form" onSubmit={handleFormSubmitEmail}>
            <img className="imgSettings"
                src="https://www.antevenio.com/wp-content/uploads/2017/10/email-marketing-campaigns.jpg"/>
                <div className="form__field">
                    <label htmlFor="oldEmail">Current Email</label>
                    <input className="input" type="email" name="oldEmail" placeholder="old email" id="oldEmail" />
                </div>

                <div className="form__field">
                    <label htmlFor="newEmail">New Email</label>
                    <input className="input" type="email" name="newEmail" placeholder="new email" id="newEmail" />
                </div>

                <div className="form__field">
                    <label htmlFor="newEmailRepeat">Repeat New Email</label>
                    <input className="input" type="email" name="newEmailRepeat" placeholder="repeat new email" id="newEmailRepeat" />
                </div>

                <button className="button" type="submit">Update</button>
            </form>

            <IconButton text="home" onClick={onCloseClick} />
        </div>
    }
export default withContext(Settings)
