import ApiError from "../error.js"
import TokenService from "../services/TokenService.js"

async function tokenMiddleware(req, res, next) {
	try {
		let authHeader = req.headers.authorization
		if (!authHeader) throw 'er'

		let accessToken = authHeader.split(' ')[1]
		if (!accessToken) throw 'er'

		let tokenData = TokenService.validateAccessToken(accessToken)
		if (tokenData instanceof Error) throw 'er'

		req.tokenData = tokenData
		next()
	}
	catch(er) {
		return next(ApiError.unauthorized())
	}
}

export default tokenMiddleware