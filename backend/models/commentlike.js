'use strict';
module.exports = (sequelize, DataTypes) => {
  const CommentLike = sequelize.define('CommentLike', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    commentId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Comment',
        key: 'id'
      }
    },
  }, {});
  CommentLike.associate = function (models) {
    // associations can be defined here
    models.User.belongsToMany(models.Comment, {
      through: models.CommentLike,
      foreignKey: 'userId',
      otherKey: 'commentId',
    });

    models.Comment.belongsToMany(models.User, {
      through: models.CommentLike,
      foreignKey: 'commentId',
      otherKey: 'userId',
    });

    models.CommentLike.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.CommentLike.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      as: 'comment',
    });

  };
  return CommentLike;
};