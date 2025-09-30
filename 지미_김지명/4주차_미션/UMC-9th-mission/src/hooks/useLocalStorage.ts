export const useLocalStorage = (key: string) => {
    
    const setItem = (value: unknown) => {
        try {
            // 문자열이면 그대로 저장, 객체면 JSON.stringify
            const valueToStore = typeof value === 'string' 
                ? value 
                : JSON.stringify(value);
            window.localStorage.setItem(key, valueToStore);
        } catch(error) {
            console.log(error);
        }
    };

    const getItem = () => {
        try {
            const item: string | null = window.localStorage.getItem(key);
            if (!item) return null;
            
            // JSON 파싱 시도, 실패하면 원본 문자열 반환
            try {
                return JSON.parse(item);
            } catch {
                return item;
            }
        } catch (e) {
            console.log(e);
        }
    };
      
    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    return { setItem, getItem, removeItem };
};