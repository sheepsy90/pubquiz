const { Sequelize, Model } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

class Pub extends Model {}
Pub.init(
  {
    name: Sequelize.STRING,
    donationUrl: Sequelize.STRING
  },
  { sequelize, modelName: 'pub' }
);

class Group extends Model {}
Group.init(
  {
    name: Sequelize.STRING,
    public: Sequelize.BOOLEAN
  },
  {
    sequelize,
    modelName: 'group'
  }
);

class Person extends Model {}
Person.init(
  {
    nickname: Sequelize.STRING
  },
  {
    sequelize,
    modelName: 'person'
  }
);

class Question extends Model {}
Question.init(
  {
    type: Sequelize.STRING,
    date: Sequelize.DATE,
    round: Sequelize.INTEGER,
    positionInround: Sequelize.INTEGER,
    question: Sequelize.STRING,
    questionExternalLink: Sequelize.STRING
  },
  {
    sequelize,
    modelName: 'question'
  }
);

Pub.hasMany(Group);
// Group.belongsTo(Pub);
// Group.hasMany(Person);
Person.belongsTo(Group);

class Session extends Model {}
Session.init({}, { sequelize, modelName: 'session' });
Session.belongsTo(Person);

sequelize.sync().then(() => {
  console.log('Database initialized');

  Pub.findAll().then(result => {
    if (result.length === 0) seedDatabase();
  });
});

function seedDatabase() {
  Pub.create(
    {
      name: 'The Snug',
      groups: [
        { name: 'Quizzer', public: true },
        { name: 'Krasse Hacker', public: false }
      ]
    },
    { include: [Group] }
  ).then(() => {
    ['User1', 'User2', 'User3'].forEach(user => {
      Person.create({
        nickname: user,
        groupId: 1
      });
    });
  });
}

module.exports = {
  Pub,
  Group,
  Question,
  Person,
  Session
};
