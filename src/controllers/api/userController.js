const db = require("../../database/models");

const controller = {

    renderList: (req, res) => {
            db.User.findAll()
              .then(function (users) {
                const formattedUsers = users.map(user => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    email: user.email,
                    detail: `/users/${user.id}`
                }));

                const result = {
                    "count": users.length,
                    "users": formattedUsers
                };
                res.json(result);
              }).catch(function (error) {
                console.error('Error al obtener el usuarios:', error);
                res.status(500).json({ error: 'Error al obtener el usuarios' });
            });
      },

      renderDetail: (req, res) => {
        db.User.findByPk(req.params.id)
          .then(function (user) {
            const result = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                avatarUrl: `/img/user/${user.avatar}`
            };
            res.json(result);
          }).catch(function (error) {
            console.error('Error al obtener el usuario:', error);
            res.status(500).json({ error: 'Error al obtener el usuario' });
        });
      }
}


module.exports = controller;

