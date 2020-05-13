module.exports = function(app, db){
    require('./routes2')(app, db);

    //skusobne
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
//-------------------------------------------------------------------------------

    //POISTNE UDALOSTI

    //Create poistnu udalost
    //POST
    app.post('/api/udalost/create', (req, res) => {
       
        (async () => {

            try {
                await db.collection('poistne_udalosti').doc('/' + req.body.id + '/')
                .create({
                    stav: req.body.stav,
                    datum_pridelenia: req.body.datum_pridelenia,
                    max_suma: req.body.max_suma,
                    datum_skody: req.body.datum_skody,
                    opis_skody: req.body.opis_skody,
                    miesto_skody: req.body.miesto_skody,
                    hodnotitel_id: req.body.hodnotitel_id,
                    poistenec_id: req.body.poistenec_id
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //Read udalost
    //GET
    app.get('/api/udalost/read/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('poistne_udalosti').doc(req.params.id);
                let udalost = await document.get();
                let response = udalost.data();
                response.id = req.params.id;

                return res.status(200).send(response);
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });

    // vratenie viacerych udalosti na zaklade id hodnotitela

    app.get('/api/udalost/all/:id', (req, res) => {
       
        (async () => {
            try {
                const query = db.collection('poistne_udalosti');
                let response = [];
                await query.get().then(querySnapshot => {
                    let docs = querySnapshot.docs;
                    for (let doc of docs) {
                        if(doc.data().hodnotitel_id == req.params.id) {
                            const item = {
                                id: doc.id,
                                stav: doc.data().stav,
                                datum_pridelenia: doc.data().datum_pridelenia,
                                max_suma: doc.data().max_suma,
                                datum_skody: doc.data().datum_skody,
                                opis_skody: doc.data().opis_skody,
                                miesto_skody: doc.data().miesto_skody,
                                hodnotitel_id: doc.data().hodnotitel_id,
                                poistenec_id: doc.data().poistenec_id
                            }
                            response.push(item);
                        }
                    }
                    return res.status(200).send(response);
                });
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });

    //Update poistna udalost
    //PUT
    app.put('/api/udalost/update/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('poistne_udalosti').doc(req.params.id);
           
                await document.update({
                   stav: req.body.stav, //TODO kto a kedy bude menit stav
                   datum_skody: req.body.datum_skody,
                   opis_skody: req.body.opis_skody,
                   miesto_skody: req.body.miesto_skody,
                   poistenec_id: req.body.poistenec_id
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //TODO Delete?????? udalost

//-------------------------------------------------------------------------------

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    //Create sprava
    //POST
    app.post('/api/sprava/create', (req, res) => {
       
        (async () => {

            try {
                await db.collection('spravy').doc('/' + getRandomInt(1,100000) + '/')
                .create({
                    odhadnuta_suma: req.body.odhadnuta_suma,
                    text_spravy: req.body.text_spravy,
                    poistna_udalost_id: req.body.poistna_udalost_id,
                    meno_priezvisko: req.body.meno_priezvisko
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //Read sprava
    //GET
    app.get('/api/sprava/read/:id', (req, res) => {
       
        (async () => {

            try {                
                const query = db.collection('spravy');
                let response = [];
                await query.get().then(querySnapshot => {
                    let docs = querySnapshot.docs;
                    for (let doc of docs) {
                        if(doc.data().poistna_udalost_id == req.params.id) {
                            const item = {
                                id: doc.id,
                                poistna_udalost_id: doc.data().poistna_udalost_id,
                                odhadnuta_suma: doc.data().odhadnuta_suma,
                                text_spravy: doc.data().text_spravy,
                                meno_priezvisko: doc.data().meno_priezvisko
                            }
                            return res.status(200).send(item);
                        }
                    }
                    return res.status(404).send();
                });
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //Update sprava
    //PUT
    app.put('/api/sprava/update/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('spravy').doc(req.params.id);
           
                await document.update({
                   odhadnuta_suma: req.body.odhadnuta_suma, //TODO tu sa bude riesit, ci nie je prekrocena, special case manazer
                   text_spravy: req.body.text_spravy, //ak je udalost v stave podozriva, hodnotitel nevie updatovat
                   meno_priezvisko: req.body.meno_priezvisko
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //TODO Delete?????? sprava

//-------------------------------------------------------------------------------

//ZAMESTNANCI

    //Create zamestnanec
    //Post
    app.post('/api/zamestnanec/create', (req, res) => {
       
        (async () => {

            try {
                await db.collection('zamestnanci').doc('/' + req.body.id + '/')
                .create({
                    email: req.body.email,
                    heslo: req.body.heslo,
                    meno: req.body.meno,
                    priezvisko: req.body.priezvisko,
                    pozicia: req.body.pozicia
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //Read zamestnanec - tuto bude potrebne mozno pouzit SOAP WS readCustomerByEmail
    //GET
    app.get('/api/zamestnanec/read/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('zamestnanci').doc(req.params.id);
                let zamestnanec = await document.get();
                let response = zamestnanec.data();

                return res.status(200).send(response);
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //Update zamestnanec
    //PUT
    app.put('/api/zamestnanec/update/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('zamestnanci').doc(req.params.id);
           
                await document.update({
                    //updatovanie iba hesla
                    heslo: req.body.heslo
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });

//-------------------------------------------------------------------------------

//FOTOGRAFIE

    //Create fotografia
    //POST
    app.post('/api/foto/create', (req, res) => {
       
        (async () => {

            try {
                await db.collection('fotografie').doc('/' + req.body.id + '/')
                .create({
                    url: req.body.url,
                    poistna_udalost_id: req.body.poistna_udalost_id
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });

    //Read fotografia
    //GET
    app.get('/api/foto/read/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('fotografie').doc(req.params.id);
                let foto = await document.get();
                let response = foto.data();

                return res.status(200).send(response);
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });
    

    //Update foto
    //PUT
    app.put('/api/foto/update/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('fotografie').doc(req.params.id);
           
                await document.update({
                    url: req.body.url
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //Delete foto
    //DELETE
    app.delete('/api/foto/delete/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('fotografie').doc(req.params.id);
           
                await document.delete();

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


//-------------------------------------------------------------------------------

//POISTENCI

    //Create poistenec
    //POST
    app.post('/api/poistenec/create', (req, res) => {
       
        (async () => {

            try {
                await db.collection('poistenci').doc('/' + req.body.id + '/')
                .create({
                    meno: req.body.meno,
                    priezvisko: req.body.priezvisko,
                    datum_narodenia: req.body.datum_narodenia,
                    rodne_cislo: req.body.rodne_cislo,
                    ulica: req.body.adresa.ulica,
                    cislo: req.body.adresa.cislo,
                    mesto: req.body.adresa.mesto,
                    psc: req.body.adresa.psc,
                    telefonne_cislo: req.body.telefonne_cislo,
                    email: req.body.email,
                    notifikovanie: req.body.notifikovanie
                })

                return res.status(200).send();
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


    //Read poistenec
    //GET
    app.get('/api/poistenec/read/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('poistenci').doc(req.params.id);
                let poistenec = await document.get();
                let response = poistenec.data();

                return res.status(200).send(response);
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });


//---------------------------------------------------------------------------------------------------------//
//                                              LOGIN
//---------------------------------------------------------------------------------------------------------//

app.post('/api/login', (req, res) => {
       
    (async () => {
        try {                
            const query = db.collection('zamestnanci');
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    if(doc.data().email == req.body.email && doc.data().heslo == req.body.heslo) {
                        const item = {
                            id: doc.id,
                            pozicia: doc.data().pozicia,
                            meno: doc.data().meno
                        }
                        return res.status(200).send(item);
                    }
                }
                return res.status(404).send();
            });
        }catch (error){
            console.log(error);
            return res.status(500).send(error);
        }

    })();
});

function checkPrice (suma) {
    if(suma > 10000)
        return 'podozriva'
    else 
        return 'ohodnotena'
}

app.post('/api/potvrdit', (req, res) => {
       
    (async () => {
        try {                
            const query = db.collection('poistne_udalosti');
            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;
                for (let doc of docs) {
                    if(doc.id == req.body.id ) {
                        const item = {
                            id: doc.id,
                            stav: checkPrice(req.body.suma)
                        }
                        
                        const document = db.collection('poistne_udalosti').doc(item.id);
                        document.update({
                            stav: item.stav
                        })
                        return res.status(200).send();
                    }
                }
                return res.status(404).send();
            });
        }catch (error){
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

}