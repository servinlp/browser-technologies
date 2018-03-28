const express =		require( 'express' ),
	messageData =	require( './message_data' ),
	uuid =		require( 'uuid/v4' ),
	routes =	express.Router()

routes.get( '/', ( req, res ) => {

	if ( !req.session.uuid ) {

		req.session.uuid = uuid()
		res.locals.uuid = req.session.uuid

	}

	res.render( 'index', {
		messages: messageData.messages
	} )

} )

routes.get( '/chat', ( req, res ) => {

	res.render( 'chat', {
		reload: true,
		messages: messageData.messages
	} )

} )

routes.post( '/new-message', ( req, res ) => {

	console.log( req.body )

	const date = new Date(),
		hours = date.getHours(),
		minutes = date.getMinutes()

	messageData.addMessage( {
		message: req.body.message,
		from: req.session.uuid,
		date: date,
		time: `${ hours.length === 1 ? '0' + hours : hours }:${ minutes.length === 1 ? '0' + minutes : minutes }`
	} )

	if ( req.body.fromAjax ) {

		const { message, date, time } = messageData.lastMessage

		res.json( {
			succes: true,
			message: {
				message,
				date,
				time,
				from: 'you'
			}
		} )

	} else {

		res.redirect( '/' )

	}

} )

routes.get( '/last-messages', ( req, res ) => {

	const allMessages = messageData.messages,
		messagesToSend = allMessages.slice( req.query.entries )

	console.log( messagesToSend )

	res.json( {
		succes: true,
		messages: messagesToSend
	} )

} )

module.exports = routes
