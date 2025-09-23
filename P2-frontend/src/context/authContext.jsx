import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://localhost:6001/api/fl/user/auth', {credentials: 'include'})
        .then(res => res.ok? res.json() : null)
        .then(data => {
            setUser(data)
            setLoading(false)
        })
    }, [])

    return (
        <AuthContext.Provider value={{user, loading, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)