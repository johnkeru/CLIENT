import React, { useState } from 'react'
import UserProvider from '../CONTEXT/UserContext'
import Children from './Children'

const Parent = () => {
    return (
        <UserProvider>
            <div>
                Parent
                <Children />
            </div>
        </UserProvider>
    )
}

export default Parent