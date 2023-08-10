import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RequireNoAuth({children}) {
	const userID = useSelector(state => state.user.id)
	if (userID) return <Navigate to='/account' replace={true} />
	return children
}

export default RequireNoAuth