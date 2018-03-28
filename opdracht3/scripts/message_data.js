
class MessageData {

	constructor() {

		this.data = []

	}

	addMessage( message ) {

		this.data.push( message )

	}

	get messages() {

		return this.data

	}

	get lastMessage() {

		return this.data[ this.data.length - 1 ]

	}
}

module.exports = new MessageData()
