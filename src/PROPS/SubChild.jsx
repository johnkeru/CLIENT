import React, { useState } from 'react'
import { useUser } from '../CONTEXT/UserContext'

const SubChild = () => {
    const { user } = useUser()
    return (
        <div>SubChild {user}</div>
    )
}

export default SubChild