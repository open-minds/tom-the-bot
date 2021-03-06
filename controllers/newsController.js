var newsModel = require('../models/newsModel.js');
var crypto = require('crypto');
/**
 * newsController.js
 *
 * @description :: Server-side logic for managing newss.
 */
module.exports = {

    /**
     * newsController.list()
     */
    list: function (req, res) {
        newsModel.find(function (err, newss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting news.',
                    error: err
                });
            }
            return res.json(newss);
        });
    },

    /**
     * newsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        newsModel.findOne({_id: id}, function (err, news) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting news.',
                    error: err
                });
            }
            if (!news) {
                return res.status(404).json({
                    message: 'No such news'
                });
            }
            return res.json(news);
        });
    },

    /**
     * newsController.create()
     */
    create: function (req, res) {
        var news = new newsModel({			text : req.body.text,			date : req.body.date,			active : req.body.active
        });

        news.save(function (err, news) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating news',
                    error: err
                });
            }
            return res.status(201).json(news);
        });
    },

    /**
     * newsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        var code = crypto.createHash('md5').update(req.params.theCode).digest("hex");
        if ("c1ef2e12eedeec1e6610fffb9634b723" === code) {
          newsModel.findOne({_id: id}, function (err, news) {
            if (err) {
              return res.status(500).json({
                message: 'Error when getting news',
                error: err
              });
            }
            if (!news) {
              return res.status(404).json({
                message: 'No such news'
              });
            }

            news.text = req.body.text ? req.body.text : news.text;
            news.date = req.body.date ? req.body.date : news.date;
            news.active = req.body.active ? req.body.active : news.active;
            news.save(function (err, news) {
              if (err) {
                return res.status(500).json({
                  message: 'Error when updating news.',
                  error: err
                });
              }

              return res.json(news);
            });
          });
      }else {
        return res.status(404).json({
            message: 'Mamno3 sadiqi'
        });
    }
  },
    /**
     * newsController.remove()
     */
    remove: function (req, res) {
      console.log(req.params.crypto);
        var id = req.params.id;
        var code = crypto.createHash('md5').update(req.params.theCode).digest("hex");
        if ("c1ef2e12eedeec1e6610fffb9634b723" === code) {
          newsModel.findByIdAndRemove(id, function (err, news) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the news.',
                    error: err
                });
            }
            return res.status(204).json();
        });
      }else {
        return res.status(404).json({
            message: 'Mamno3 sadiqi'
        });
      }
    }
};
