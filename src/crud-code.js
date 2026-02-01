
import { v4 as uuidV4 } from 'uuid';



// Programavo Marytė - Nelyst prie kodo - kodas UNIVERSALUS CRUD
class OopCrud {

    constructor(key) {
        this.key = key;
        this.readLocalStorage();
    }

    read = id => {
        return this.list.find(item => item.id == id);
    };

    readLocalStorage = _ => {
        let data = localStorage.getItem(this.key);

        // ALTERNATYVA su ternary metodu
        // null === data ? this.list = [] : this.list = JSON.parse(data);

        if (null === data) {
            this.list = [];
        } else {
            this.list = JSON.parse(data);

        }
    };

    writeLocalStorage = _ => {
        // let data = JSON.stringify(this.list);
        // localStorage.setItem(this.key, data);
        localStorage.setItem(this.key, JSON.stringify(this.list));
    };

    Store = data => {
        const id = uuidV4();
        const dataToStore = {
            ...data,
            id
        };
        this.list.unshift(dataToStore);
        this.writeLocalStorage();
        return dataToStore;
    };

    Destroy = id => {
        this.list = this.list.filter(item => item.id != id);
        this.writeLocalStorage();
    };

    Update = (id, data) => {
        this.list = this.list.map(item => item.id == id ? { ...item, ...data, id } : item);
        this.writeLocalStorage();
    };
}


export default OopCrud; // eksportuojam failą Ls.js