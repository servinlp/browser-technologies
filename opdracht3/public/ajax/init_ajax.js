import longPolling from './long_polling.js'
import handleAjaxFormSubmission from './ajax_form_submission.js'

function handleUsingAjax() {

	const form = document.querySelector( 'form' )

	if ( !form ) return

	form.addEventListener( 'submit', handleAjaxFormSubmission )

	longPolling()

}

export default handleUsingAjax
