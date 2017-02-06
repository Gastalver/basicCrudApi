/**
 * Created by Miguel on 06/02/2017.
 */

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var json = require('./movies.json');
var app = express();

app.set('port', process.env.PORT || 3500);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = new express.Router();

router.get('/', function(req, res) {
    res.json(json);
});

router.get('/test', function(req, res) {
    var data = {
        name: 'Jason Krol',
        website: 'http://kroltech.com'
    };
    res.json(data);
});

router.post('/', function(req, res) {
// insert the new item into the collection (validate first)
    if(req.body.Id && req.body.Title && req.body.Director &&
        req.body.Year && req.body.Rating) {
        json.push(req.body);
        res.json(json);
    } else {
        res.json(500, { error: 'There was an error!' });
    }
});

router.put('/:id', function(req, res) {
// update the item in the collection
    if(req.params.id && req.body.Title && req.body.Director &&
        req.body.Year && req.body.Rating) {
        _.each(json, function(elem, index) {
         // find and update:
            if (elem.Id === req.params.id) {
                elem.Title = req.body.Title;
                elem.Director = req.body.Director;
                elem.Year = req.body.Year;
                elem.Rating = req.body.Rating;
            }
        });
        res.json(json);
    } else {
        res.json(500, { error: 'There was an error!' });
    }
});

router.delete('/:id', function(req, res) {
    var indexToDel = -1;
    _.each(json, function(elem, index) {
        if (elem.Id === req.params.id) {
            indexToDel = index;
        }
    });
    if (~indexToDel) {
        json.splice(indexToDel, 1);
    }
    res.json(json);
});

app.use('/', router);

var server = app.listen(app.get('port'), function() {
    console.log('API Server funcionando en http://localhost:' + app.get('port'));
});
