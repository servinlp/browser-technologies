import handleUsingAjax from './ajax/init_ajax.js'
import handleUsingWebSockets from './websockets/init_socket.js'
import renderMessagesOnPage from './render_messages_on_page.js'

( function() {

	if ( !( 'classList' in document.body ) || !( 'querySelector' in document ) || !( 'addEventListener' in window ) ) return

	/*if ( 'RTCPeerConnection' in window ) {

	} else */

       	if ( 'WebSocket' in window ) {

		handleUsingWebSockets()

	} else	if ( 'XMLHttpRequest' in window ) {

		handleUsingAjax()

	} else {

		return null

	}

	renderMessagesOnPage()

} )()
