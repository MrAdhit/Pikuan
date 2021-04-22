const assert = require('assert');
const fs = require("fs");

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
})
  
// test.each(commands, (name, desc, run)=>{
//     expect(name).toBe("a");
// })