const userRoles = ['GUEST', 'USER', 'ADMIN'] // ascending order

const UserService = {
	checkRole(requiredRole = '', requestRole = '') {
		let requiredRoleIndex = userRoles.indexOf(requiredRole.toUpperCase())
		let requestRoleIndex = userRoles.indexOf(requestRole.toUpperCase())
		if (requiredRoleIndex === -1 || requestRoleIndex === -1) {
			console.error('Incorrect user role value(s)')
			return false
		}
		if (requestRoleIndex >= requiredRoleIndex) return true
		return false
	}
}
export default UserService
