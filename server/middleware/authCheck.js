import jwt from 'jsonwebtoken'

export default function(req, res, next) {
	try {
		const token = req.headers.authorization
		if(!token) return res.json({message: 'Authorization failed. Token is missing'})
		req.user = jwt.verify(token, process.env.SECRET_KEY)
		next()
	} catch(e) {
		res.json(e)
	}
}