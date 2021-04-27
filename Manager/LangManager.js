const Manager = require("./Manager");

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
     * Parse Number to Small Number
     * @param {number} number Number
     * @returns string
     */
    smallNum(number){
        return number.toString().replace(/0/g, "⁰").replace(/1/g, "¹").replace(/2/g, "²").replace(/3/g, "³").replace(/4/g, "⁴").replace(/5/g, "⁵").replace(/6/g, "⁶"). replace(/7/g, "⁶").replace(/8/g, "⁸").replace(/9/g, "⁹");
    }

    /**
     * Parse smallNumber to Number
     * @param {string} number Small Number
     * @returns number
     */
    parseSmallNum(number){
        return parseInt(number.toString().replace(/⁰/g, 0).replace(/¹/g, 1).replace(/²/g, 2).replace(/³/g, 3).replace(/⁴/g, 4).replace(/⁵/g, 5).replace(/⁶/g, 6). replace(/⁶/g, 7).replace(/⁸/g, 8).replace(/⁹/g, 9));
    }

    /**
     * Parse variable to raw language string
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