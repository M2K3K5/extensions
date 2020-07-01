router.get('/jsonp', function(req, res, next) {

res.jsonp({ user: 'seb' });

});
