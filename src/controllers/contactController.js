const controller = {
    renderContact: (req, res) => {
        res.render('contact', {
            title: 'contact'
        })
    }
}


module.exports = controller;