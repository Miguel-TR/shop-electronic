const controller = {
    renderHome: (req, res) => {
        res.render('home', {
            title: 'E-Shop'
        })
    }
}


module.exports = controller;