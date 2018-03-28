import { socket, send } from './init_socket.js'

function handleSocketsFormSubmission( e ) {

	const textarea = this.querySelector( 'textarea' ),
		message = textarea.value

	textarea.value = ''

	send( 'newMessage', {
		message,
		uuid
	} )

	e.preventDefault()

}

export default handleSocketsFormSubmission
