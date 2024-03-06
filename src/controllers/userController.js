const path = require('path')
const fs = require('fs')
const cryto = require('crypto');
const usersFilePath = path.join(__dirname, '../models/user.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../models/productData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const controller = {
  // index: (req, res) => {
	// 	const user = req.session.userLogin;
	// 	if(user){
	// 		res.redirect(`/user/${user.email}`);
	// 	}
	// 	res.render('home', {products,user});
		
	// },
 	search: (req, res) => {
 		// capturar informacion de queryparams
 		const busqueda = req.query.keywords;

 		//Extrar productos que matcheen con la busqueda
 		const productBuscado = products.filter((product) => product.name.toLowerCase().includes(busqueda.toLowerCase()));
 		//Vista
 		res.render('results', {busqueda, productBuscado})
 	},
  renderLogin: (req, res) => {
    res.render('login', {
      title: 'Iniciar Sesion'
    })
  },
  createUser: (req, res) => {
    res.render('register', {
      title: 'Crear Cuenta'
    })
  },
  storeUser: (req, res) => {
    const newUser = {
      id: cryto.randomUUID(),
      firstName: req.body.nombre,
      lastName: req.body.apellido,
      email: req.body.email,
      password: req.body.password,
      type: "Customer",
      avatar: "default-image.png"
    }
    users.push(newUser)
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
    res.redirect('/');
  },
  loginProcess: (req,res)=>{
    const {email,password,remember} = req.body;
    const user =  users.find(u=>u.email==email);
    if(!user){
      res.send('Error en correo');
    }
    if(user.password==password){
      req.session.userLogin = user;
    }else{
      res.send('Error contra')
    }
    console.log(remember);
    if(remember){
      res.cookie('user',user.email,{maxAge:60000});
    }
    
    res.redirect(`/user/${user.email}`);
    
  },
  renderProfile:(req,res)=>{
    // const email = req.params.email;
    const {firstName,lastName,email,type} =req.session.userLogin;
    const user= {firstName,lastName,email,type}
    //res.render('profile',{user});
    res.render('home',{user,products});
    //res.send(req.session.userLogin)
  },
  logOut:(req,res)=>{
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      if(req.cookies.user){
        res.clearCookie('user');
      }
      res.redirect('/login');
    });
  }
}
module.exports = controller;