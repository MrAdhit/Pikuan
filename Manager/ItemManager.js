const Manager = require("./Manager");

class ItemManager extends Manager {
    constructor(){
        super();
    }

    /**
     * Get random item from Job
     * @param {string=} jobs Job Name
     * @returns string
     */
    getRandom(jobs){
        let job = this.getJSON();
        switch(jobs){
            case "Forest":
                let random = Math.floor(Math.random() * job.Forest.length);

                return this.getJSON().Forest[random];
            case "Hunting":
                let randomq = Math.floor(Math.random() * job.Hunting.length);

                return this.getJSON().Hunting[randomq];
            default:
                let randoms = Math.floor(Math.random() * 2);
                
                switch(randoms){
                    case 0:
                        let random = Math.floor(Math.random() * job.Forest.length);

                        return this.getJSON().Forest[random];
                    case 1:
                        let randoma = Math.floor(Math.random() * job.Hunting.length);

                        return this.getJSON().Hunting[randoma];
                }
                break;
        }
    }

    /**
     * Get Item frok Specific Index
     * @param {number} index Item Index
     * @returns string
     */
    getItem(index, job){
        return this.getJSON()[job][index];
    }

    /**
     * Get JSON Data of Items
     * @returns objext
     */
    getJSON(){
        return require("../database/items.json");
    }
}

module.exports = ItemManager;