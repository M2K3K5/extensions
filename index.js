router.get('/test/jsonp', function(req, res, next) {

res.jsonp({ user: 'seb' });
});