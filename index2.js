/* eslint-disable no-undef */

import express from "express";
import express_graphql from "express-graphql";
import bodyParser from "body-parser";
import { buildSchema } from "graphql";

//grapql Schema

var schema = buildSchema(`
                type Query {

                    message: String
                    
                        
                }

                        `);

var root = { 
                message: () => 'Hello World'
            
            }

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/graphql', express_graphql({

        schema: schema,
        rootValue : root,
        graphiql:true

}));

app.get("/", (req, res) => {
    const sonuc = {
        durum: true,
        mesaj: "tamam güzelim"
    };

    res.send("Expressle Siteyi Actik :) !" + sonuc);
});

app.post("/", (req, res) => {
    const sonuc = {
        durum: true,
        mesaj: "post tamam güzelim"
    };

    // res.send('Expressle Siteyi Post Olarak Actik :) !' + sonuc) ;

    res.send(req.body);
});

app.get("/login", (req, res) =>
    res.send("Expressle Login Oldum Kader Hanım :) !")
);

app.listen(port, () =>
    console.log(`Express destegiyle su portu dinledıgimi tespit ettim ${port}!`)
);
