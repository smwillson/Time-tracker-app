import uniqid from 'uniqid';

export default class Entry {
    constructor(title, date, desc, category, duration) {
        this.id = uniqid();
        this.title = title;
        this.date = date;
        this.desc = desc;
        this.category = category;
        this.duration = duration;

    }

    //to add a new entry to our data storage
    addNewEntry() {
        //this function will add the newly created entry to the memory
        //we will use localStorage for persistence

        //TODO:
        //make sure that the id we are saving is not present already

        //change the incoming duration to minutes
    }

    //to delete a new entry from our data storage
    deleteEntry(id) {

    }

   

}