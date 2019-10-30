import uniqid from 'uniqid';

export default class Entry {
    constructor() {
        this.entries = [];
    }

    //to add a new entry to our data storage
    addNewEntry(title, date, desc='', category, duration) {
        const entry = {
            id: uniqid(),
            title,
            date,
            desc,
            category,
            duration
        }
        this.entries.push(entry);
        return entry;
    }

    //to delete a new entry from our data storage
    deleteEntry(id) {
        const index = this.entries.findIndex(el => el.id === id);
        this.entries.splice(index, 1);

    }



}