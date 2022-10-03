class Edge {
    map = new Map();
    v1 = undefined;
    v2 =undefined;
    lbl = undefined;
    cli = undefined;

    constructor(cli,lbl,v1,v2) {
        this.cli= cli;
        this.lbl = lbl;
        this.v1 = v1;
        this.v2 = v2;
    }

    setValue(key,value) {
        this.map.set(key,value);
    }

    getValue(key) {
        return this.map.get(key);
    }
    
    find () {
        var query = `g.V('${this.lbl}').has('${this.keyName}','${this.pk}').valueMap(true).unfold()`;
        cli.submit(query).then(value=>{return JSON.stringify(value)},reason=>{console.log(reason)});
    }

    save() {
        var query = `g.V("${this.className}").has("${this.keyName}","${this.pk}").fold().coalesce(unfold(),__.addV("${this.className}").property("${this.keyName}","${this.pk}")`;
        for (let [key, value] of this.map.entries()) {
            query += `.property("${key}","${value}")`;
        }
        query +=")";

        return cli.submit(query).then(function (result) {
                console.log("Result: %s\n", JSON.stringify(result));
        });
    }
}

module.exports = Vertex;