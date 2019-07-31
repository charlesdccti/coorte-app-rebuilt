

// business.route.js

const express = require('express');
const app = express();
const businessRoutes = express.Router();

// Require Business model in our routes module
let Business = require('../models/Business');
let Univariada = require('../models/Univariada');


// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});


// Defined get data(index or listing) route
businessRoutes.route('/').get(function (req, res) {

    

  /*Business.aggregate([{$match : {variavel: "cod_raca_cor_pessoa_eq"}}, {$group: { _id: "$nivel", n: {$sum: "$n"}}}]).then(function (businesses) {
    
    res.json(businesses);
    console.log(businesses);
    
    

  }); 

   Business.find({descricao: "Indica a raça - cor da pessoa"},{ variavel: 1}, function (err, varname) {
     
      if (err) {
        console.log(err);
        
      }
      else {
        
        //res.json(varname);
        //console.log(varname[0].variavel);
        
        
        //Univariada.aggregate([{$match : {variavel: varname[0].variavel}}, {$group: { _id: "$nivel", n: {$sum: "$n"}}}]).then(function (aggregatevalue) {
          
          Univariada.find({variavel: "cod_raca_cor_pessoa_eq"},{variavel: 1, nivel:1, cod_munic_ibge_2_fam_eq:1, ano_atual_familia: 1, n: 1,  status: 2 }, function(err, valuefromdb){
               //res.json(businesses);
                  /*console.log(valuefromdb);
              //console.log(varname);
          });
         
          
          
      
       
        console.log(varname);

      }
    });

    */

    Business.find(function (err, businesses){
    if(err){
      //console.log(err);
    }
    else {
      res.json(businesses);
      
    
      
      
    }
  });




});



// Defined edit route
businessRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Business.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
/*businessRoutes.route('/update/:id').post(function (req, res) {
    Business.findById(req.params.id, function(err, next, business) {
    if (!business)
      return next(new Error('Could not load Document'));
    else {
        business.person_name = req.body.person_name;
        business.business_name = req.body.business_name;
        business.business_gst_number = req.body.business_gst_number;

        business.save().then(business => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});*/



// Defined delete | remove | destroy route
businessRoutes.route('/delete/:id').get(function (req, res) {
    Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = businessRoutes;