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

                return res.status(200).send(response);
            }catch (error){
                console.log(error);
                return res.status(500).send(error);
            }

        })();
    });

    //TODO vyriesit vratenie viacerych udalosti na zaklade id hodnotitela


    //Update poistna udalost
    //PUT
    app.put('/api/udalost/update/:id', (req, res) => {
       
        (async () => {

            try {
                const document = db.collection('poistne_udalosti').doc(req.params.id);
           
                await document.update({
                   stav: req.body.stav, //TODO kto a kedy bude menit stav
                   datum_skody: req.body.datum_skody,
                   opis_skody: req.body.opis_skody
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

    //SPRAVY

    //Create sprava
    //POST
    app.post('/api/sprava/create', (req, res) => {
       
        (async () => {

            try {
                await db.collection('spravy').doc('/' + req.body.id + '/')
                .create({
                    odhadnuta_suma: req.body.odhadnuta_suma,
                    text_spravy: req.body.text_spravy,
                    poistna_udalost_id: req.body.poistna_udalost_id
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
                const document = db.collection('spravy').doc(req.params.id);
                let sprava = await document.get();
                let response = sprava.data();

                return res.status(200).send(response);
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
                   text_spravy: req.body.text_spravy //ak je udalost v stave podozriva, hodnotitel nevie updatovat
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


     //TODO ???? update poistenec -myslim, ze to vobec netreba
    

}