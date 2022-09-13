const { Thought, User } = require('../models');

module.exports = {

  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Video created, but found no user with that ID',
            })
          : res.json('Created the video 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
