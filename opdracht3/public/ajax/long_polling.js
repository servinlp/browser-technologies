import createNewMessageElement from '../create_new_message_element.js'

let poll

function longPolling() {

	poll = setInterval( polling, 4000 )

}

function polling() {

	const request = new XMLHttpRequest(),
		entries = messages.length

	request.open( 'GET', `/last-messages?entries=${ entries }` )
	request.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' )

	request.addEventListener( 'load', transferComplete )
        request.addEventListener( 'error', transferFailed )
        request.addEventListener( 'abort', transferCanceled )

	request.send()

}

function transferComplete( e ) {

        if ( e.target.readyState === 4 ) {

		const data = JSON.parse( e.target.response )

		if ( data.messages.length > 0 ) {

			console.log( data )

			const ul = document.querySelector( 'ul.chat' )

			messages = messages.concat( data.messages )

			data.messages.forEach( el => {

				const li = createNewMessageElement( el )

				ul.appendChild( li )

			} )

		}

	}

}

function transferFailed() {

        console.error( 'An error ocurred wuring the request' )
	clearInterval( poll )
	console.log( poll )

}

function transferCanceled() {

        console.error( 'The request was canceled by the user' )
	clearInterval( poll )
	console.log( poll )

}

export default longPolling
