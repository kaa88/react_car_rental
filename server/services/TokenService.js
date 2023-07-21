import jwt from 'jsonwebtoken'

const TokenService = {
	generateToken (data = {}) {
		if (!data || (typeof data === 'object' && objectIsEmpty(data))) return new Error('Failed to generate token, "data" is empty.')
		let accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '15m'})
		let refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '15d'})
		return {accessToken, refreshToken}
	},
	validateAccessToken(token) {
		return validateToken(token, process.env.JWT_ACCESS_SECRET_KEY)
	},
	validateRefreshToken(token) {
		return validateToken(token, process.env.JWT_REFRESH_SECRET_KEY)
	},
}

function validateToken(token, key) {
	try {
		if (!token || !key) throw new Error('Missing token or key')
		let tokenUserData = jwt.verify(token, key)
		return tokenUserData
	}
	catch(err) {
		return err
	}
}

function objectIsEmpty(obj) {
	if (Array.isArray(obj)) return !obj.length
	for (let prop in obj) {
		if (Object.hasOwn(obj, prop)) return false
	}
	return true
}

export default TokenService
