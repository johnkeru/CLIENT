import { createContext, useContext } from "react";

const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState('user 1');
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}
export const useUser = () => useContext(UserContext)
export default UserProvider;

