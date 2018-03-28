import createNewMessageElement from '../create_new_message_element.js'
import handleSocketsFormSubmission from './sockets_form_submission.js'

let protocol = 'ws'

if ( window.location.protocol.includes( 'https' ) ) {

	protocol = 'wss'

}

const socket = new WebSocket( `${ protocol }://${ window.location.host }` )

function handleUsingWebSockets() {

	const form = document.querySelector( 'form' )

	if ( !form ) return

	socket.addEventListener( 'open', e => {

		console.log( 'open', e )

	} )

	socket.addEventListener( 'close', e => {

		console.log( 'close', e )

	} )

	socket.addEventListener( 'message', handleMessages )

	form.addEventListener( 'submit', handleSocketsFormSubmission )

}

function handleMessages( e ) {

	const data = JSON.parse( e.data )

	if ( data.succes ) {

		const ul = document.querySelector( 'ul.chat' ),
			li = createNewMessageElement( data.message )

		ul.appendChild( li )

	}

}

function send( name, data ) {

	socket.send( JSON.stringify( { [ name ]: data } ) )

}

export default handleUsingWebSockets
export {
	socket,
	send
}
