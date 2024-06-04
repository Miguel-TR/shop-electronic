const controller = {
    renderContact: (req, res) => {
        const user = req.session.userLogin;

        res.render('contact', {
            title: 'contact',
            user: user
        })
    }
}


module.exports = controller;