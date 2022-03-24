const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
const BASE_API_URL = "/api/v1";

app.use(bodyParser.json());





//######################   API Jesús Vena Campos  ###############################//


var co2 = [
    {		
        country : "spain",
        year : 2020,
        co2_tot : 214.817,
        co2_kg : 0.13,
        co2_tpc : 4.62
    },
    {
        country : "alemania",
        year : 2017,
        co2_tot : 250.177,
        co2_kg : 0.15,
        co2_tpc : 4.77
    }
];

//##########################################
//GET
app.get(BASE_API_URL+"/co2-stats",(req,res)=>{
    res.send(JSON.stringify(co2,null,2));

});

app.get(BASE_API_URL+"/co2-stats/docs",(req,res)=>{
    res.redirect(API_DOC_PORTAL);

});

app.get(BASE_API_URL+"/co2-stats/:country", (req, res)=>{
    var countryName = req.params.country;
    filteredCountries = co2.filter((c)=>{
        return(c.country == countryName);
    })
    if(filteredCountries == 0){
        res.sendStatus(404,"NOT FOUND");
    }else{
        res.send(JSON.stringify(filteredCountries[0],null,2));
    }

    res.sendStatus(200,"OK");


});

//##########################################

//POST


app.post(BASE_API_URL+"/co2-stats",(req,res)=>{
    co2.push(req.body);
    res.sendStatus(201,"CREATED");

});

app.post(BASE_API_URL+"/co2-stats/:country",(req,res)=>{
    var countryName = req.params.country;
    filteredCountries = co2.filter((c)=>{
        return(c.country == countryName);
    });
    if(filteredCountries == 0){
        res.sendStatus(409,"Conflict");
    }else{
        res.sendStatus(405,"Method Not Allowed");
    }
  

});

//##########################################

//PUT


app.put(BASE_API_URL+"/co2-stats",(req,res)=>{
    res.sendStatus(405,"Method Not Allowed");

})

app.put(BASE_API_URL+"/co2-stats/:country/:year",(req,res)=>{
    var countryName = req.params.country;
    var yearReq = req.params.year;
    filteredCountryYear = co2.filter((c)=>{
        return(c.country == countryName && c.year == yearReq);
    });
    if(filteredCountryYear == 0){
        res.sendStatus(400,"Bad Request");
    }else{
        co2.push(req.body)  ;
        //co2.splice(filteredCountryYear);

        res.sendStatus(200,"OK");
    }
})


//##########################################
//DELETE


app.delete(BASE_API_URL+"/co2-stats/:country", (req, res)=>{
    var countryName = req.params.country;
    co2.filter((c)=>{
        return(c.country!=countryName);
    })
    res.sendStatus(200,"OK");
});

//ESTO BORRA TODOS LOS RECURSO  
app.delete(BASE_API_URL+"/co2-stats", (req, res)=>{
    co2 = [];
    res.sendStatus(200,"OK");
});










//##########################################

app.use("/",express.static('public'));

//----------------------------------------------------

app.listen(port, () =>{
    console.log(`Server ready at port ${port}`);
});
//----------------------------------------------------

