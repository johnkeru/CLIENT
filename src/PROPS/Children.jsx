import React from 'react'
import SubChildren from './SubChildren'
import { useUser } from '../CONTEXT/UserContext'

const Children = () => {
    const { user } = useUser()
    return (
        <div>
            Children
            {user}
            <SubChildren />
        </div>
    )
}

export default Children