const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser")
const Comentarios = require("./models/Comentarios");


app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Rotas

app.get('/index', function(req, res){
    Comentarios.findAll().then(function(comentarios){
        res.render('index',{comentarios : comentarios});
    })
   
});

app.post('/index', function(req, res){
        Comentarios.create({
       comentario : req.body.comentario
      
       
    }).then(function() {
        res.status(201);
    
    
     
  
    }).catch(function(erro){
        res.send("Erro: Não foi possível criar o comentário!" + erro)
        res.status(500);
    })
  
})

// jQuery(document).ready(function(){
//     jQuery.ajax({

//         type: "POST",
//         url: "/index",
//         data: Comentarios,
//         success: function(data)
//         {
//           window.alert("Dados cadastrados com sucesso!")
         
//         },
//         error: function(err){
         
//           alert("erro");
//         }
//     });
// })


   

  

app.listen(8080);
