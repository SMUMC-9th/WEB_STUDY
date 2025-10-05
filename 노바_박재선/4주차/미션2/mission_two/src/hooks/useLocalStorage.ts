// import { useEffect, useState } from "react";

// function useLocalStorage<T>(key:string, initialValue:T) {
//     const [value, setValue] = useState(()=> {
//         try{
//             const stored = localStorage.getItem(key);
//             return stored ? (JSON.parse(stored) as T) : initialValue;
//         } catch (error) {
//             console.error("useLocalStorage get error:", error);
//             return initialValue;
//         }
        
//     });

//     useEffect(()=>{
//         try{
//             localStorage.setItem(key, JSON.stringify(value));
//         } catch (error) {
//             console.error("useLocalStorage set error:", error);
//         }
        
//     }, [key,value]);

//     const updateValue = (newValue: T | ((prev: T) => T)) => {
//         setValue((prev)=>
//             newValue instanceof Function ? newValue(prev) : newValue
//         );
//     }

//     return [value, updateValue];
// }

// export default useLocalStorage;




export const useLocalStorage = (key:string) => {
    const setItem = (value: unknown) => {
        try{
            window.localStorage.setItem(key,JSON.stringify(value));
        } catch (error) {
            console.log(error)
        }
    } 

    const getItem = () => {
        try{
            const item = window.localStorage.getItem(key);

            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.log(e);
        }
    }

    const removeItem = () => {
        try{
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    }
    return {setItem, getItem, removeItem};
}