import { createContext, useContext } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('user 1');
    const [user2, setUser2] = useState('user 2');
    return <UserContext.Provider value={{ user, user2, setUser, setUser2 }}>
        {children}
    </UserContext.Provider>
}
export const useUser = () => useContext(UserContext)
export default UserProvider;

