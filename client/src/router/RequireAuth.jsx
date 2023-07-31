import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RequireAuth({children}) {
	const userID = useSelector(state => state.user.id)
	if (!userID) return <Navigate to='/login' replace={true} />
	return children
}

export default RequireAuth