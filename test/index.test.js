const assert = require('assert');
const fs = require("fs");
const User = require("../Manager/UserManager");

const user = new User();

let commands = fs.readdirSync("./commands");

describe("Testing Command", ()=>{
    commands.forEach((command)=>{
        let cmd = require("../commands/"+command.replace(".js", ""))
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