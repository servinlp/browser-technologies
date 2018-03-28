import createNewMessageElement from '../create_new_message_element.js'

function handleAjaxFormSubmission( e ) {

	console.log( 'e', e )
	console.log( 'this', this )

	const URL = this.getAttribute( 'action' ),
		textarea = this.querySelector( 'textarea' ),
		request = new XMLHttpRequest()

	request.open( 'POST', URL )
	request.setRequestHeader( 'Content-Type', 'application/json;charset=UTF-8' )

	request.addEventListener( 'load', transferComplete )
	request.addEventListener( 'error', transferFailed )
	request.addEventListener( 'abort', transferCanceled )

	request.send( JSON.stringify( {
		message: textarea.value,
		fromAjax: true
	} ) )

	textarea.value = ''

	e.preventDefault()

}

function transferComplete( e ) {

	console.log( 'complete', e )

	if ( e.target.readyState === 4 ) {

		console.log( e.target )
		console.log( e.target.readyState )
		console.log( JSON.parse( e.target.response ) )

		const response = JSON.parse( e.target.response ),
			ul = document.querySelector( 'ul.chat' ),
			li = createNewMessageElement( response.message )

		messages.push( response.message )

		ul.appendChild( li )

	}

}

function transferFailed() {

	console.error( 'An error ocurred wuring the request' )

}

function transferCanceled() {

	console.error( 'The request was canceled by the user' )

}

export default handleAjaxFormSubmission
