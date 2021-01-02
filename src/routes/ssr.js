import express from "express";
import App from '../components/app';
import OneBusiness from '../components/OneBusinessComponent/oneBusiness'
import React from 'react';
import { renderToString } from 'react-dom/server';
import hbs from 'handlebars';
import { Provider } from 'react-redux'
import store from '../redux/store'
import con from '../config/mysqlConfig'
import mysql from 'mysql';
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected")
})

const router = express.Router();
router.get("/", async (req, res) => {
    // <script src="/public/app.js" charset="utf-8"></script>
    // <script src="/public/vendor.js" charset="utf-8"></script>

    const theHtml = `
    <html>
    <head><title>Local Data</title></head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script data-search-pseudo-elements defer src="https://pro.fontawesome.com/releases/v5.10.1/js/all.js"></script>
    <script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>    
    
    <body>
 
    <div id="reactele">{{{reactele}}}</div>
    <script src="app.js" charset="utf-8"></script>
    <script src="vendor.js" charset="utf-8"></script>
    
    </body>
    </html>
    `;
    const hbsTemplate = hbs.compile(theHtml)
    const reactComp = renderToString(<Provider store={store}>
        <App />
    </Provider>)
    const htmlToSend = hbsTemplate({ reactele: reactComp })


    res.send(htmlToSend);

});

router.get("/biz/:name/:city/:state/:mid", async (req, res) => {
    // <script src="vendor.js" charset="utf-8"></script>
    // <script src="business.js" charset="utf-8"></script>
    console.log(req.params)
    
    let query = "SELECT * FROM final_businesses WHERE id= " + req.params.mid.toString()
    console.log(query)
    con.query(query, (err, data) => {
        if (err) {
            console.log(err)
        }
       
        console.log(data[0])

        
        const theHtml = `
        <html>
        <head><title>My First SSR</title></head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script data-search-pseudo-elements defer src="https://pro.fontawesome.com/releases/v5.10.1/js/all.js"></script>
        <script
      src="https://code.jquery.com/jquery-3.3.1.min.js"
      integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
      crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>    
   
        <body>
        
        <div id="reactele">{{{reactele}}}</div>
        
        
        
        </body>
        </html>
        `;
        const hbsTemplate = hbs.compile(theHtml)
        console.log(hbsTemplate)
        const reactComp = renderToString(<OneBusiness params={data[0]}></OneBusiness>)
        console.log(reactComp)
        const htmlToSend = hbsTemplate({ reactele: reactComp })


        res.send(htmlToSend);
    })
});
export default router;