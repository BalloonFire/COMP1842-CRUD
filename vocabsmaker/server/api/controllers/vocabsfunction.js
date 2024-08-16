const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

exports.list_all_words = (req, res) => {
  Vocab.find({}).sort({ createdAt: -1 }).then((words) => {
    res.json(words);
  }).catch((err) => {
    res.send(err);
  });
};

exports.create_a_word = (req, res) => {
  const newWord = new Vocab(req.body);
  newWord.save().then((word) => {
    res.json(word);
  }).catch((err) => {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Word already exists.' });
    } else {
      res.send(err);
    }
  });
};

exports.read_a_word = (req, res) => {
  Vocab.findById(req.params.wordId).then((word) => {
    res.json(word);
  }).catch((err) => {
    res.send(err);
  });
};

exports.update_a_word = (req, res) => {
  Vocab.findOneAndUpdate({ _id: req.params.wordId }, req.body, { new: true }).then((word) => {
    res.json(word);
  }).catch((err) => {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Word already exists.' });
    } else {
      res.send(err);
    }
  });
};

exports.delete_a_word = (req, res) => {
  Vocab.deleteOne({ _id: req.params.wordId }).then(() => {
    res.json({
      message: 'Word successfully deleted.',
      _id: req.params.wordId
    });
  }).catch((err) => {
    res.send(err);
  });
};
