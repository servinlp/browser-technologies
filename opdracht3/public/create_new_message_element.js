
function createNewMessageElement( message ) {

	const li = document.createElement( 'li' ),
		time = document.createElement( 'time' ),
		svg = document.createElementNS( 'http://www.w3.org/2000/svg', 'svg' ),
		path = document.createElementNS( 'http://www.w3.org/2000/svg', 'path' )

	li.textContent = message.message
	li.classList.add( message.from === uuid ? 'you' : message.from === 'you' ? 'you' : '_' )

	time.setAttribute( 'datatime', message.date )
	time.textContent = message.time

	svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' )
	svg.setAttribute( 'viewBox', '0 0 512 512' )
	path.setAttributeNS( null, 'd', 'M437.02 330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521 243.251 404 198.548 404 148 404 66.393 337.607 0 256 0S108 66.393 108 148c0 50.548 25.479 95.251 64.262 121.962-36.21 12.495-69.398 33.136-97.281 61.018C26.629 379.333 0 443.62 0 512h40c0-119.103 96.897-216 216-216s216 96.897 216 216h40c0-68.38-26.629-132.667-74.98-181.02zM256 256c-59.551 0-108-48.448-108-108S196.449 40 256 40s108 48.448 108 108-48.449 108-108 108z' )

	svg.appendChild( path )

	li.appendChild( time )
	li.appendChild( svg )

	return li

}

export default createNewMessageElement
