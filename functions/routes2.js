module.exports = function(app){

    
    app.get('/hii', function(req, res){
        return res.status(200).send('hii');
    });

}