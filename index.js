/* eslint-disable no-undef */

import express from "express";
import express_graphql from "express-graphql";
import bodyParser from "body-parser";
import { buildSchema } from "graphql";

//grapql Schema

var schema = buildSchema(`
                type Query {

                    course(id: Int!) : Course
                    courses(topic: String) : [Course]
                     
                }
                type Mutation {
                                    updateCourseTopic (id: Int! , topic: String!) : Course

                              }
                type Course {
                    id: Int
                    title: String
                    author: String
                    description: String
                    topic: String
                    url: String

                }    


                        `);


var coursesData = [
    {
        id: 1,
        title: 'İlk başlık',
        author: 'Ahmet Delen',
        description: 'Öğren. Öğrenmek iyidir.',
        topic: 'Node.js',
        url: 'https://www.mobicoo.com'

    },

    {
        id: 2,
        title: 'İkinci başlık',
        author: 'Mithat Delen',
        description: 'Taşı delen suyun kuvveti değil, damlaların süreklilğidir.',
        topic: 'Graphql',
        url: 'https://www.mobicoo.com'

    },

    {
        id: 3,
        title: 'İÜçüncü başlık',
        author: 'Delhi Derin',
        description: 'Vur pençe-i Âli-deki şemşir aşkına',
        topic: 'Graphql',
        url: 'https://www.mobicoo.com'

    }


]



var updateCourseTopic = function ({ id, topic }) {

    coursesData.map( course => {
        if (course.id === id) {

            course.topic = topic;

            return course;

        }
    });

    return coursesData.filter(course => course.id === id)[0];
}



var root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: updateCourseTopic

}


var getCourse = function (args) {

    var id = args.id;
    return coursesData.filter(course => { return course.id == id; })[0];
    console.log("GETCOURSE ID".id)

}

var getCourses = function (args) {

    if (args.topic) {
        var topic = args.topic;
        return coursesData.filter(course => course.topic === topic)
    }

    else {
        return coursesData;

    }


}



const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/graphql', express_graphql({

    schema: schema,
    rootValue: root,
    graphiql: true

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
