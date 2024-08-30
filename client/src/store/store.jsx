import {create} from 'zustand';

let curruser = localStorage.getItem('_l_user');
const useStore = create((set) => ({
    
    user : curruser ?  JSON.parse(curruser) : null,
    token : "",
    chat : [],
    loading : false,
    setUser : (newUser) => set({user: newUser}),
    setToken : (newToken) => set({token : newToken}),
    setChat : (newChat) => set((state)=> ({chat : [...state.chat, newChat]})),
    setLoading : (newLoading) => set({loading : newLoading}),
}))

export default useStore;