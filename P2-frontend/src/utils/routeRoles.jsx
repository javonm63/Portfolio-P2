import { Navigate } from "react-router-dom";

export const FreelancerRole = ({children}) => {
    const user = {}
    user.role = JSON.parse(sessionStorage.getItem('role'))
    if (!user.role) return <Navigate to='/' />
    if (user.role !== 'freelancer') return <Navigate to='/unauthorized' />

    return children
}

export const ClientRole = ({children}) => {
    const user = {}
    user.role = JSON.parse(sessionStorage.getItem('role'))
    if (!user.role) return <Navigate to='/' />
    if (user.role !== 'client') return <Navigate to='/unauthorized' />

    return children
}
