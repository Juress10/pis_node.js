module.exports = function(app, db){
    require('./routes2')(app, db);


    app.get('/:id',(req, res) => {
        (async () => {
            try{
                await db.collection('products').doc('/'+ req.params.id + '/')
                .create({
                    name: 'janko',
                    description: 'slnieckar'
                })
                return res.status(200).send('ok');
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }
        })();
    });

}