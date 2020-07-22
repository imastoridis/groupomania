'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    //messageId: DataTypes.INTEGER,
    //likesId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

        models.Comment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
        models.Comment.belongsTo(models.Message, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  });
  return Comment;
};



/*
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    likesId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
        models.Comment.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        })
        models.Comment.belongsTo(models.Message, {
          foreignKey: {
            allowNull: false
          }
        })

        

      }
    }
  });
  return Comment;
};
  */



/*
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    messageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    likesId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
  }, {});
   
  Comment.associate = function(models) {
        // associations can be defined here
        models.Comment.belongsTo(models.User, {
          foreignKey: 'userId',
        });
    
        models.Comment.belongsTo(models.Message, {
          through: models.User,
          foreignKey: 'messageId',
        });
  };
  return Comment;
};*/


  /*
  Comments.associate = function(models) {
    // associations can be defined here
    
  };
  return Comments;
};*/