const Manager = require("./Manager");
const fs = require("fs");

class LangManager extends Manager {
    constructor(){
        super();
    }

    /**
     * Get language String
     * @param {string} langKey Langauge Object Key
     * @returns string
     */
    getLang(langKey){
        if(!this.isExist(langKey)) return {error: true, code: 0};
        return this.getJSON()[langKey];
    }

    /**
     * Parse variabke to raw language string
     * @param {string} lang Raw language string
     * @param {object} object Variable object
     * @returns string
     */
    parseVariable(lang, object){
        const templateMatcher = /{{\s?([^{}\s]*)\s?}}/g;
        let text = lang.replace(templateMatcher, (substring, value, index) => {
            value = object[value];
            return value;
        });
        return text;
    }

    /**
     * If key is exist
     * @param {string} langKey Language Object Key
     * @returns string
     */
    isExist(langKey){
        return (this.getJSON()[langKey] == undefined) ? false : true;
    }

    /**
     * Get All Lang in JSON Object
     * @returns object
     */
    getJSON(){
        return require("../database/lang.json");
    }
}

module.exports = LangManager;