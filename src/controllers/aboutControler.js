const controller = {
    renderAbout: (req, res) => {
        res.render('about', {
            title: 'Acerca de'
        })
    }
}


module.exports = controller;