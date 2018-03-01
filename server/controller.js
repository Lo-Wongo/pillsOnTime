module.exports = {
    addHousehold: (req, res) => {
        let {name, id} = req.body
        req.app.get('db').household.create_household(name, id). then((results) =>{
            console.log(results);
            res.status(200).send(results)

        })
    },

//=======patients controller=============
    addPatient: (req, res) => {
        let hh_id = req.user.id
        let {patient_name, dob, street, city, state, zipcode, allegies} = req.body;
        console.log(req.user);
        req.app.get('db').patients.create_patient(patient_name, dob, street, city, state, zipcode, allegies, hh_id). then((response) =>{
            console.log(response);
            res.status(200).send(response)

        }).catch(console.log);
    },

    getPatients: (req, res) => {
        req.app.get('db').patients.find_patient(req.params.hh_id).then((response) =>{
            console.log(response);
            res.status(200).send(response)
        }).catch(console.log);
    },
    addPhone: (req, res) => {
        let hh_id = req.user.id
        let {phone} = req.body;
        console.log(req.body);
        req.app.get('db').patients.add_phone(phone, hh_id). then((response) =>{
            console.log(response);
            res.status(200).send(response)

        }).catch(console.log);
    },

    //This method makes two get request trips to the db to get patient information and the list of medications they take 
    getPatientMedications: (req,res) => {
        const db = req.app.get('db')
        console.log(req.params.id);
        db.patients.find_patient_info(req.params.id).then((patient) => {
            console.log(patient)
            db.medications.getUser_medications(req.params.id).then((medicaitons) => {
                let resObj = {patient: patient[0], medications: medicaitons}
                console.log(resObj)
                res.status(200).send(resObj)
            })
        })
    },

    //========medications controller=========
    addMedication: (req, res) => {
        let { med_name, med_strength, patient_id } = req.body;
        console.log(req.body);
        req.app.get('db').medications.create_medication(med_name, med_strength, patient_id).then((response) => {
            console.log(response);
            res.status(200).send(response)
        }).catch(console.log);
    },

    getMedication: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;

        dbInstance.get_medication([params.id])
          .then(medication => res.status(200).send(medication) )
          .catch( () => res.status(500).send() );

    },
    editMedication: (req, res, next) => {
           const dbInstance = req.app.get('db');
           const { params } = req;

           dbInstance.update_medication([
               params.id, 
               params.med_name,
               params.med_strength,
               params.frequency,
               params.start_time,
               params.amount
                ])
           .then( () => res.status(200).send() )
           .catch( () => res.status(500).send() );
    },
    deleteMedication: (req, res, next) => {
        const dbInstance = req.app.get('db');
        const { params } = req;
        
    dbInstance.delete_medication([params.id])
    .then( () => res.status(200).send() )   
    .catch( () => res.status(500).send() );   
    },

    //========schedule a dosage controller=========
    scheduleDosage: (req, res) => {
        let {frequency1, frequency_type, start_time, amount} = req.body;
        console.log(req.body);
        req.app.get('db').medications.schedule_dosage(frequency1, frequency_type, start_time, amount). then((response) =>{
            console.log(response);
            res.status(200).send(response)

        }).catch(console.log);
    },
}



