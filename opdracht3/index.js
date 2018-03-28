const express =	require( 'express' ),
	session =	require( 'express-session' ),
	bodyParser =	require( 'body-parser' ),
	ejs =		require( 'ejs' ),

	messageData =	require( './scripts/message_data' ),
	routes = 	require( './scripts/routes' ),

	app =		express(),
	PORT =		8000,

	http =          require( 'http' ),
        WebSocket =     require( 'ws' )

app.use( session( {
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
} ) )

app.use( express.static( 'public' ) )
app.set( 'views', './views' )
app.set( 'view engine', 'ejs' )

app.use( bodyParser.urlencoded( { extended: false } ) )
app.use( bodyParser.json() )

app.get( '*', ( req, res, next ) => {

	if ( req.session.uuid ) {

		res.locals.uuid = req.session.uuid

		const { message, date, time, from } = messageData.messages
		res.locals.messages = {
			message,
			date,
			time,
			from: from === req.session.uuid ? 'you': ''
		}

	}

	next()

} )

app.use( '/', routes )

const httpServer =	http.createServer( app ),
	wss =		new WebSocket.Server( { server: httpServer } ),
	onConnection =  require( './scripts/ws_routes' )

wss.on( 'connection', ( ws, req ) => {

	onConnection( ws, req, wss )

} )

httpServer.listen( PORT, () => {

	console.log( `You can find me at http://localhost:${ PORT }` )

} )
