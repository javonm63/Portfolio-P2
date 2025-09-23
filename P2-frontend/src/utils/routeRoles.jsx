import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const FreelancerRole = ({children}) => {
    const {user, loading} = useAuth()

    if (loading) return <p>LOADING...</p>
    if (!user) return <Navigate to='/' />
    if (user.role !== 'freelancer') return <Navigate to='/unauthorized' />

    return children
}

export default FreelancerRole