import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context'
import { privateRoutes, publicRoutes } from '../router'
import Loader from './UI/Loader/Loader'

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader />
    }

    return (
            isAuth ?
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            element={route.element}
                        />
                    )}            
                </Routes>   
            :
                <Routes>
                     {publicRoutes.map(route =>
                        <Route
                            key={route.path}
                            exact={route.exact}
                            path={route.path}
                            element={route.element}
                        />
                )}
                </Routes>         
    )
}

export default AppRouter