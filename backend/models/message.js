'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    models.Message.hasMany(models.Comment, { onDelete: 'cascade' })
    models.Message.hasMany(models.Like, { onDelete: 'cascade' })
  };
  return Message;
};


/*{
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //One to one association, a message belongs to a user
        models.Message.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
        models.Message.belongsTo(models.Comment, {
          foreignKey: {
            allowNull: false
          }
        })
        models.Message.hasMany(models.Comment, {
          foreignKey: {
            allowNull: false
          }
        })


      }
    }
  });
  return Message;
};*/