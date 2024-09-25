import React from 'react'
import Child from './Child'
import UserProvider from '../CONTEXT/UserContext'

const Parent = () => {
    return (
        <UserProvider>
            <div>Parent
                <Child />
            </div>
        </UserProvider>
    )
}

export default Parent