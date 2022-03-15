import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../context'
import MyButton from '../button/MyButton'
import cl from './Navbar.module.css'

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = event => {
        event.preventDefault()
        setIsAuth(false)
        localStorage.removeItem('auth')
    }
    return (
        <div className={cl.navbar}>
            <MyButton onClick={logout}>
                Logout
            </MyButton>
            <div className={cl.navbar__item}>
            <Link to='/about' className={cl.navbar__link}>About</Link>
            <Link to='/' className={cl.navbar__link}>Posts</Link>
            </div>
        </div>
    )
}

export default Navbar