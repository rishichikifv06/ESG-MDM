const { map } = require("async");
let { query } = require("express");

class Country{
    
    map = new Map();
    constructor(alpha3){
        //map = new Map();
        this.label = 'country';
        this.alpha3= alpha3;
    }

    setValue(key,value){
        //map= new Map();
        this.map.set(key,value);
    }

    getValue(key){
        return this.map.get(key);
    }
    find(client,key){
         query = `g.V().has('alpha_3_code','${key}').valueMap(true)`;
         console.log(query);
         client.submit(query)
         .then((result)=>{
            console.log(JSON.stringify(result))
         })
        //  console.log(result.item)
        //  if(result){
        //     for(item in result){
        //         console.log(item);
        //     }
        //  }
    }

    

    save(client){
        // return client.submit("g.addV(%s).property('name',%s).property('alpha3','RUS')",'country','Russia' ).then(function (result){
        //     console.log("Result:%s\n" , JSON.stringify(result));
        // })
        query = `g.V().has('alpha_3_code','${this.alpha3}').fold().coalesce(unfold(), addV('${this.label}')`;
        for(let [key,value] of this.map.entries()){
            query += `.property('${key}','${value}')`;
        } 
        query += `.property('alpha_3_code','${this.alpha3}').property('pk','pk'))`;
        //console.log(query)
        client.submit(query).then(function (result){
            console.log("Result:%s\n" , JSON.stringify(result));
        })
    }
}

module.exports = Country;