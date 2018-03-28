import createNewMessageElement from './create_new_message_element.js'

function renderMessagesOnPage() {

	const form = document.querySelector( 'form' ),
                iframe = document.querySelector( 'iframe' )

	if ( !form ) return

	iframe.parentNode.removeChild( iframe )

	form.insertAdjacentHTML( 'beforebegin', '<ul class="chat"></ul>' )

	const ul = document.querySelector( 'ul.chat' )

	messages.forEach( el => {

		ul.appendChild( createNewMessageElement( el ) )

	} )

}

export default renderMessagesOnPage
