import React from 'react'
import SubChild from './SubChild'
import { useUser } from '../CONTEXT/UserContext'

const Child = () => {
    const { user, setUser } = useUser()
    return (
        <div>Child
            <SubChild />
        </div>
    )
}

export default Child