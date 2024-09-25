import React from 'react'
import { useUser } from '../CONTEXT/UserContext'

const SubChildren = () => {
    const { user, user2 } = useUser()
    return (
        <div>
            SubChildren
            {user}
            {user2}
        </div>
    )
}

export default SubChildren