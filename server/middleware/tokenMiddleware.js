import ApiError from "../error.js"
import jwt from 'jsonwebtoken'

export default async function (req, res, next) {
	let authHeader = req.headers.authorization
	if (!authHeader) return next(ApiError.unauthorized())

	let accessToken = authHeader.split(' ')[1]
	if (!accessToken) return next(ApiError.unauthorized())

	let tokenIsVerified = await jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET_KEY)
	console.log(tokenIsVerified);

	// надо вынести в tokenService ??? из-за await'a

	next()
}