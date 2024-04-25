const path = require('path')
const fs = require('fs')
const crypto = require('crypto');
const usersFilePath = path.join(__dirname, '../models/user.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const productsFilePath = path.join(__dirname, '../models/productData.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const { hashSync, compareSync } = require('bcryptjs');
const db = require("../database/models");
const sequelize  = db.sequelize;
const {Op} = require("sequelize")

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
    /*
    const existingUser = users.find(user => user.email === req.body.email);
    if (existingUser) {
      return res.render('register', {
        errors: {
            email: {
                msg: 'Este email ya está registrado'
            }
        },
        old: req.body,
        title: 'Crear Cuenta'
      });
    }*/
    if (req.body.password !== req.body.passwordConfirmation) {
      return res.render('register', {
          errors: {
            passwordConfirmation: {
                  msg: 'Las contraseñas no coinciden'
              }
          },
          old: req.body,
          title: 'Crear Cuenta'
      });
    }
    const passHash = hashSync( req.body.password, 10 );
/*
    const newUser = {
      id: crypto.randomUUID(),
      firstName: req.body.nombre,
      lastName: req.body.apellido,
      email: req.body.email,
      password: passHash,
      type: "Customer",
      avatar: req.file?.filename || 'default-image.png'
    }
    users.push(newUser)
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2))
    */
    //sequelize
    db.User.create({
      //id: crypto.randomUUID(),
      firstName: req.body.nombre,
      lastName: req.body.apellido,
      phone: req.body.telefono,
      email: req.body.email,
      password_user: passHash,
      rol: 2,
      avatar: req.file?.filename || 'default-image.png',
    })
    .then(()=> {
      res.redirect('/login');
    })
    .catch(error => res.send(error))
    //sequelize
  },
  loginProcess: (req,res)=>{
    const {email,password,remember} = req.body;
    /*const user =  users.find(u=>u.email==email);
    if(!user){
      res.send('Error en correo');
    }
    const isValid = compareSync( req.body.password, user.password );
    if(isValid  === true){
      req.session.userLogin = user;
    }else{
      res.send('Error contra')
    }
    console.log(remember);
    if(remember){
      res.cookie('user',user.email,{maxAge:60000});
    }
    
    res.redirect(`/user/${user.email}`);
    */
    db.User.findOne({ where: { email: email } })
        .then(function(user) {
            if (!user) {
                return res.send('Error en correo');
            }
            const isValid = compareSync(password, user.password_user);  
            if (isValid == true) {
                req.session.userLogin = user;
                if (remember) {
                    res.cookie('user', user.email, { maxAge: 60000 });
                }
                return res.redirect(`/user/${user.email}`);
            } else {
                return res.send('Error contra');
            }
        })
    
  },
  renderProfile:(req,res)=>{
    // const email = req.params.email;
    const {id,firstName,lastName,phone,email,type,avatar} =req.session.userLogin;
    const user= {id,firstName,lastName,phone,email,type,avatar}
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
  },
  renderEdit: (req, res) => {
    db.User.findByPk(req.params.id)
        .then(function(user) {
          res.render("edit-user", { title: 'Editar perfil', user: user });
        })
  },
  renderDetail: (req, res) => {
    db.User.findByPk(req.params.id)
        .then(function(user) {
          res.render("userDetail", { title: 'Perfil', user: user });
        })
  },
  renderUpdate: (req,res) => {
    let updateData = {
      firstName: req.body.nombre,
      lastName: req.body.apellido,
      phone: req.body.telefono,
      email: req.body.email
    };
    if (req.file && req.file.filename) {
      updateData.avatar = req.file.filename;
    }
    db.User.update(updateData,{
      where: {
        id: req.params.id
      }
    })
    .then(() => res.redirect("/userDetail/"+ req.params.id))

  },
  renderEditPass: (req, res) => {
    db.User.findByPk(req.params.id)
        .then(function(user) {
          res.render("edit-user-pass", { title: 'Cambiar contraseña', user: user });
        })
  },
  renderUpdatePass: (req,res) => {
    db.User.update({
      password_user: hashSync( req.body.passwordNew, 10 )
    },{
      where: {
        id: req.params.id
      }
    })
    .then(() => res.redirect("/userDetail/"+ req.params.id))
  }
}
module.exports = controller;