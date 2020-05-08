module.exports = function(app){
    require('./routes2')(app);


    
    app.get('/:id',(req, res) => {
        (async () =>{
            try{
                await db.collection('products').doc('/'+ req.params.id + '/')
                .create({
                    name: 'janko',
                    description: 'netrpezlivy'
                })
    
                return res.status(200);
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }
        })();
    });

}