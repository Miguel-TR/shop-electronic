const controller = {
    renderAbout: (req, res) => {
        const user = req.session.userLogin;

        res.render('about', {
            title: 'Acerca de',
            user: user
        })
    }
}


module.exports = controller;