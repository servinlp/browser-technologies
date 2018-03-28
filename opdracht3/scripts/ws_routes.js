const WebSocket =	require( 'ws' ),
      messageData =	require( './message_data' )

function onConnection( ws, req, wss ) {

	ws.on( 'message', message => {

		handleMessages( JSON.parse( message ) )

	} )

	function handleMessages( data ) {

		switch ( Object.keys( data )[ 0 ] ) {

			case 'newMessage':

				const date = new Date(),
			                hours = date.getHours(),
			                minutes = date.getMinutes()

				messageData.addMessage( {
				        message: data[ 'newMessage' ].message,
			                from: data[ 'newMessage' ].uuid,
			                date: date,
			                time: `${ hours.length === 1 ? '0' + hours : hours }:${ minutes.length === 1 ? '0' + minutes : minutes }`
			        } )

				const { message, time } = messageData.lastMessage,
					obj = {
						succes: true,
						message: {
			                                message,
				                        date,
					                time,
						        from: 'you'
																			                        }
					},
					you = JSON.stringify( obj )

				ws.send( you )

				obj.message.from = ''
				const rest = JSON.stringify( obj )

				broadcast( rest )

				break

		}

	}

	function broadcast( message ) {

		wss.clients.forEach( client => {

			if ( client !== ws && client.readyState === WebSocket.OPEN ) {

				client.send( message )

			}

		} )

	}

}

module.exports = onConnection
