
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    imgUrl: DataTypes.STRING 
  }, {});
  Event.associate = function(models) {
    // associations can be defined here
  };
  return Event;
};

// events.js
module.exports = function (app, models) {

  // INDEX
  app.get('/', (req, res) => {
      models.Event.findAll({ order: [['createdAt', 'DESC']] }).then(events => {
          res.render('events-index', { events: events });
      });
  })
}

  // SHOW
  app.get('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] }).then(event => {
        res.render('events-show', { event: event });
    }).catch((err) => {
        console.log(err.message);
    })
  });