const assert = require('assert');
const fs = require("fs");
const User = require("../Manager/UserManager");
const Guild = require("../Manager/GuildManager");
const Lang = require("../Manager/LangManager");
const Item = require("../Manager/ItemManager");

const user = new User();
const guild = new Guild();
const lang = new Lang();
const item = new Item();

let commands = fs.readdirSync("./commands");

describe("Testing Command", ()=>{
    commands.forEach((command)=>{
        let cmd = require("../commands/"+command.replace(".js", ""))
        if(cmd.aliasOf != undefined) return;
        describe(`Testing ${command}`, ()=>{
            it(`${command} name should be string`, (done)=>{
                assert.equal(typeof(cmd.name), "string")
                setImmediate(done)
            });
            it(`${command} description should be string`, (done)=>{
                assert.equal(typeof(cmd.description), "string")
                setImmediate(done)
            });
            it(`${command} run should be function`, (done)=>{
                assert.equal(typeof(cmd.run), "function")
                setImmediate(done)
            });
        })
    })
});
  
describe("Testing UserManager", ()=>{
    it("getMoney should return 10", ()=>{
        assert.strictEqual(user.getMoney("a"), 10)
    });
    it("setMoney should return 15", ()=>{
        assert.strictEqual(user.setMoney("a", 15).money, 15);
    });
    it("getPath should return ./database/users/a.json", ()=>{
        assert.strictEqual(user.getPath("a"), "./database/users/a.json");
    });
    it("addMoney should return 20", ()=>{
        assert.strictEqual(user.addMoney("a", 5).money, 20);
    });
    it("removeMoney should return 10", ()=>{
        assert.strictEqual(user.removeMoney("a", 10).money, 10);
    });
    it("getJSON should return the data itself", ()=>{
        assert.deepStrictEqual(user.getJSON("a"), {username: "a", money: 10});
    })
});

describe("Testing GuildManager", ()=>{
    it("getPrefix should return pik", ()=>{
        assert.strictEqual(guild.getPrefix("a"), "pik");
    });
    it("setPrefix should return object with pik1 prefix", ()=>{
        assert.deepStrictEqual(guild.setPrefix("a", "pik1"), {name: "test", prefix: "pik1"});
        assert.deepStrictEqual(guild.setPrefix("a", "pik"), {name: "test", prefix: "pik"});
    });
    it("isExist should return true", ()=>{
        assert.deepStrictEqual(guild.isExist("a"), true);
    });
    it("getJSON should return the data itself", ()=>{
        assert.deepStrictEqual(guild.getJSON("a"), {name: "test", prefix: "pik"});
    });
});

describe("Testing LangManager", ()=>{
    it("getLang should return a ${message.author.id}", ()=>{
        assert.strictEqual(lang.getLang("test"), "a {{num}}")
    })
    it("getLang undefined should return not found object", ()=>{
        assert.deepStrictEqual(lang.getLang("a"), {error: true, code: 0})
    })
    it("parseVariable should return 9", ()=>{
        assert.strictEqual(lang.parseVariable(lang.getLang("test"), {num: 9}), "a 9");
    })
    it("getJSON should return object", ()=>{
        assert.strictEqual(typeof(lang.getJSON("test")), "object");
    })
});

describe("Testing ItemManager", ()=>{
    it("getJSON should return object", ()=>{
        assert.deepStrictEqual(typeof(item.getJSON()), "object");
    });
    it("getItem should return Batu", ()=>{
        assert.deepStrictEqual(item.getItem(1, "Forest"), "Batu");
    });
    it("getRandom should return string", ()=>{
        assert.deepStrictEqual(typeof(item.getRandom()), "string");
        assert.deepStrictEqual(typeof(item.getRandom("Forest")), "string");
        assert.deepStrictEqual(typeof(item.getRandom("Hunting")), "string");
    });
});