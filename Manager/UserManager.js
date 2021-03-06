const Manager = require("./Manager");
const fs = require("fs");

class UserManager extends Manager{
    constructor(){
        super();
    }

    /**
     * Get User database Path
     * @param {string} userid User ID
     * @returns string
     */
    getPath(userid){
        return `./database/users/${userid}.json`;
    }

    /**
     * Create new user or overwrite existing
     * @param {string} userid User ID
     * @param {string} username Username
     * @param {number} money Money amount
     */
    createUser(userid, username, money){
        fs.writeFileSync(this.getPath(userid), JSON.stringify({
            username: username,
            money: money,
            daily: 0,
            inventories: {}
        }, null, 2));
    }

    /**
     * Get User Daily Time
     * @param {string} userid User ID
     * @returns object
     */
    getDailyTime(userid){
        if(!this.isExist(userid)) return {error: true, code: 0}
        return this.getJSON(userid).daily;
    }

    /**
     * Set User Daily Time
     * @param {string} userid User ID
     * @param {number} timestamp Timestamp
     * @returns obkect
     */
    setDailyTime(userid, timestamp){
        if(!this.isExist(userid)) return {error: true, code: 0}
        let data = this.getJSON(userid);
        data.daily = parseInt(timestamp);
        fs.writeFileSync(this.getPath(userid), JSON.stringify(data, null, 2));
        return data;
    }

    /**
     * Get Item Amount from User
     * @param {string} userid User ID
     * @param {string} id Item ID
     * @returns number
     */
    getItemAmount(userid, id){
        if(!this.isExist(userid)) return {error: true, code: 0}
        return this.getJSON(userid).inventories[id.toString()];
    }

    /**
     * Get user inventory
     * @param {string} userid User ID
     * @returns object
     */
    getInventory(userid){
        if(!this.isExist(userid)) return {error: true, code: 0}
        let arr = [];
        for (const [key, value] of Object.entries(this.getJSON(userid).inventories)) {
            arr.push({id: key, amount: value});
        }
        return arr;
    }

    /**
     * Add item to User inventory
     * @param {string} userid User ID
     * @param {string} id Item ID
     * @param {number} amount Item Amount
     * @returns object
     */
    addItem(userid, id, amount){
        if(!this.isExist(userid)) return {error: true, code: 0}
        let data = this.getJSON(userid).inventories;
        if(id in data){
            data[id] = parseInt(data[id]) + parseInt(amount);
        }else{
            data[id] = parseInt(amount);
        }
        this.setItem(userid, data);
        return data;
    }

    /**
     * Remove item from User inventory
     * @param {string} userid User ID
     * @param {string} id Item ID
     * @param {number} amount Item Amount
     * @returns object
     */
    removeItem(userid, id, amount){
        if(!this.isExist(userid)) return {error: true, code: 0}
        let data = this.getJSON(userid).inventories;
        if(id in data){
            data[id] = parseInt(data[id]) - parseInt(amount);
        }else{
            data[id] = parseInt(amount);
        }
        this.setItem(userid, data);
        return data;
    }

    /**
     * Replace exisiting Inventory object with the new one
     * @param {string} userid User ID
     * @param {object} object Inventory Object
     * @returns object
     */
    setItem(userid, object){
        if(!this.isExist(userid)) return {error: true, code: 0}
        let data = this.getJSON(userid);
        data.inventories = object;
        fs.writeFileSync(this.getPath(userid), JSON.stringify(data, null, 2));
        return data;
    }

    /**
     * Get User Money
     * @param {string} userid User ID
     */
    getMoney(userid){
        if(!this.isExist(userid)) return {error: true, code: 0}
        return this.getJSON(userid).money;
    }

    /**
     * Add money to User
     * @param {string} userid User ID
     * @param {number} amount Amount to Add
     * @returns object
     */
    addMoney(userid, amount){
        return this.setMoney(userid, this.getMoney(userid) + parseInt(amount));
    }

    /**
     * Add money to User
     * @param {string} userid User ID
     * @param {number} amount Amount to Remove
     * @returns object
     */
    removeMoney(userid, amount){
        return this.setMoney(userid, this.getMoney(userid) - parseInt(amount));
    }

    /**
     * Set User Money
     * @param {string} userid User ID
     * @param {number} amount Money Amount
     */
    setMoney(userid, amount){
        if(!this.isExist(userid)) return {error: true, code: 0}
        let data = this.getJSON(userid);
        data.money = parseInt(amount);
        fs.writeFileSync(this.getPath(userid), JSON.stringify(data, null, 2));
        return data;
    }

    /**
     * Check if User database exist
     * @param {string} userid User ID
     * @returns boolean
     */
    isExist(userid){
        return fs.existsSync(this.getPath(userid));
    }

    /**
     * Get JSON Object of User Database
     * @param {string} userid User ID
     * @returns object
     */
    getJSON(userid){
        if(!fs.existsSync(`./database/users/${userid}.json`)) return {error: true, code: 0}
        return JSON.parse(fs.readFileSync(`./database/users/${userid}.json`).toString());
    }
}

module.exports = UserManager;