var yelp = require("yelp").createClient({
  consumer_key: '2v3np37ykp4pDJ0jmbmzXg',
  consumer_secret: 'OI7ZPjE4SYi5zV6Q9kjiphnAJJU',
  token: '_IrZIMgurZ7G6RNAEQ6dwOYyH_5DAIzA',
  token_secret: '4-KhrV6XdZpv7OJJqPzBTPO8hUs'
});
var async = require("async");

module.exports = function(app) {
  app.post('/data', function(req,res) {
    var location = req.body.locations;
    var radius = req.body.radius;
    var relevantinfo = {};
    relevantinfo.name = [], relevantinfo.ratings = [], relevantinfo.crossstreets = [], relevantinfo.address = [], relevantinfo.type = [], relevantinfo.phonenumber = [];
    yelp.search({term: 'food', location: location, radius_filter:radius}, function(error, data) {
      var range = Array.apply(null, Array(Math.ceil(data.total/20))).map(function (_, i) {return i*20;});
      async.forEachOf(range, function(item, key, callback) {
        yelp.search({term: 'food', location: location, radius_filter:radius, offset:item}, function(error, data) {
          for (var business in data.businesses) {
            relevantinfo.name.push(data.businesses[business].name);
            relevantinfo.type.push(data.businesses[business].categories);
            relevantinfo.ratings.push(data.businesses[business].rating + " stars from " + data.businesses[business].review_count + " reviews");
            relevantinfo.crossstreets.push(data.businesses[business].location.cross_streets);
            relevantinfo.address.push(data.businesses[business].location.display_address);
            relevantinfo.phonenumber.push(data.businesses[business].phone);
          }
          callback()
        })
      }, function(err) {
        if (err) {
          return err
        }
        res.render('data', {info:relevantinfo});
      })
    })
  });



  app.get('/', function(req,res) {
    res.render('index');
  })
};