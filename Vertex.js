const Gremlin = require('gremlin');

class Vertex {
    map = new Map();
    kv = undefined;
    lbl = undefined;
    cli=undefined;

    constructor(cli,lbl,kv) {
        this.lbl = lbl;
        this.kv = kv;
        this.cli = cli;
    }

    addAttribute(key,value) {
        this.map.set(key,value);
    }

    getAttribute(key) {
        return this.map.get(key);
    }
    
    find () {
        var query = `g.V('${this.lbl}').has('${this.kv}').valueMap(true).unfold()`;
        this.cli.submit(query).then(value=>{return JSON.stringify(value)},reason=>{console.log(reason)});
    }

    save () {
        var query = `g.V().has(T.id,"${this.kv}").fold().hasNext().coalesce(unfold(),addV("${this.lbl}").property(id,"${this.kv}")`;
        for (let [key, value] of this.map.entries()) {
            query += `.property("${key}","${value}")`;
        }
        query +=").next()";
        return this.cli.submit(query).then(
            function (result) {
                console.log(result);
            },
            function(err) {
                console.log(err.message);
            }
        );
    }
}

module.exports = Vertex;