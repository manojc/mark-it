var express = require('express'),
    router = express.Router(),
    dbSchema = require('../model/database-schema'),
    studentModel = dbSchema.Student;

//get all students
router.get('/all', function(req, res) {
    studentModel
        .find({})
        .populate('ClassRoomId', 'Name ClassTeacher')
        .exec(function(err, response) {
            if (err)
                res.json({
                    status: 'Failure',
                    message: 'an error has occured',
                    Data: null
                });
            else
                res.json({
                    status: 'success',
                    Message: 'Students are fetched successfully!',
                    Data: response
                });
        });
});

//get student with id
router.get('/', function(req, res) {
    if (!req.query.id)
        res.json({
            status: 'Failure',
            Message: "Id doesn't exist",
            Data: null
        });
    else
        studentModel.findOne({
            _id: req.query.id
        }, function(err, response) {
            if (err) res.json({
                status: 'Failure',
                Message: 'An error has occured',
                Data: null
            });
            else
                res.json({
                    status: 'success',
                    Message: 'Student details are fetched successfully!',
                    Data: response
                });
        });

});

//add students 
router.post('/add-student', function(req, res) {

    if (!req.body || !req.body.length)
        res.json({
            status: 'Failure',
            message: 'student information is not present',
            Data: null
        });

    else
        studentModel.collection.insert(req.body, function(err, response) {
            if (err)
                res.json({
                    status: 'Failure',
                    message: 'An error has occured',
                    Data: null
                });
            else
                res.json({
                    status: 'success',
                    message: 'student information is inserted successfully',
                    Data: response
                });
        });
});

router.post('/add-student1', function(req, res) {

    var names = [{
        "Name": "Matthew Briggs"
    }, {
        "Name": "Lacey Baxter"
    }, {
        "Name": "Davis Olsen"
    }, {
        "Name": "Neil Sargent"
    }, {
        "Name": "Tallulah Shelton"
    }, {
        "Name": "Quin Hill"
    }, {
        "Name": "Rebecca Salinas"
    }, {
        "Name": "Skyler Atkins"
    }, {
        "Name": "Ray May"
    }, {
        "Name": "Drew Pitts"
    }, {
        "Name": "Hunter Puckett"
    }, {
        "Name": "Thomas Wallace"
    }, {
        "Name": "Katell Peck"
    }, {
        "Name": "Hasad Phillips"
    }, {
        "Name": "Mechelle Sweeney"
    }, {
        "Name": "Jaquelyn Rocha"
    }, {
        "Name": "Amos Haynes"
    }, {
        "Name": "Heidi Wiley"
    }, {
        "Name": "Pandora Barry"
    }, {
        "Name": "Brennan Hendricks"
    }, {
        "Name": "Kirestin Knowles"
    }, {
        "Name": "Sopoline Avila"
    }, {
        "Name": "Isadora Figueroa"
    }, {
        "Name": "Yardley Everett"
    }, {
        "Name": "Abdul Haley"
    }, {
        "Name": "Meredith Pace"
    }, {
        "Name": "Susan Mayer"
    }, {
        "Name": "Regina Sexton"
    }, {
        "Name": "Dylan Woodward"
    }, {
        "Name": "Kennedy Whitaker"
    }, {
        "Name": "Lucian Snider"
    }, {
        "Name": "Owen Ward"
    }, {
        "Name": "Naida Gaines"
    }, {
        "Name": "Guinevere Rogers"
    }, {
        "Name": "Hoyt Rowe"
    }, {
        "Name": "Camilla Reid"
    }, {
        "Name": "Scott Humphrey"
    }, {
        "Name": "Tallulah Mullins"
    }, {
        "Name": "Marsden Peck"
    }, {
        "Name": "Asher Collins"
    }, {
        "Name": "Xanthus Tanner"
    }, {
        "Name": "India Burks"
    }, {
        "Name": "Edan Summers"
    }, {
        "Name": "Morgan Golden"
    }, {
        "Name": "Beau Douglas"
    }, {
        "Name": "Vernon David"
    }, {
        "Name": "Nero Matthews"
    }, {
        "Name": "Willow Tucker"
    }, {
        "Name": "Rajah Shepherd"
    }, {
        "Name": "Denton Kent"
    }, {
        "Name": "Aristotle West"
    }, {
        "Name": "Pandora Walters"
    }, {
        "Name": "Holmes Baird"
    }, {
        "Name": "Christopher Pate"
    }, {
        "Name": "Xena Flynn"
    }, {
        "Name": "Meghan Trujillo"
    }, {
        "Name": "Nichole Wells"
    }, {
        "Name": "Adele Hendricks"
    }, {
        "Name": "Colton Dawson"
    }, {
        "Name": "Ainsley Decker"
    }, {
        "Name": "Imelda Whitehead"
    }, {
        "Name": "Alexa Cobb"
    }, {
        "Name": "Odette Roy"
    }, {
        "Name": "Herman Andrews"
    }, {
        "Name": "Glenna Cote"
    }, {
        "Name": "Hamish Walters"
    }, {
        "Name": "Winter Boone"
    }, {
        "Name": "Melodie Townsend"
    }, {
        "Name": "Hope Mcdaniel"
    }, {
        "Name": "Ryder Baldwin"
    }, {
        "Name": "Jerome Hughes"
    }, {
        "Name": "Odysseus Decker"
    }, {
        "Name": "Xanthus Odonnell"
    }, {
        "Name": "Nicholas Dennis"
    }, {
        "Name": "Norman Wheeler"
    }, {
        "Name": "Imani Wheeler"
    }, {
        "Name": "Kylan Meyers"
    }, {
        "Name": "Gannon Christian"
    }, {
        "Name": "Yasir Dickson"
    }, {
        "Name": "Jameson Wolfe"
    }, {
        "Name": "Ingrid Tanner"
    }, {
        "Name": "George Walton"
    }, {
        "Name": "Dillon Vance"
    }, {
        "Name": "Kirby Walls"
    }, {
        "Name": "Lyle Nicholson"
    }, {
        "Name": "Charity Chang"
    }, {
        "Name": "Charlotte Richards"
    }, {
        "Name": "Avram Cline"
    }, {
        "Name": "Noelani Knox"
    }, {
        "Name": "Rama Puckett"
    }, {
        "Name": "Camille Frost"
    }, {
        "Name": "Keelie Coleman"
    }, {
        "Name": "Serena Wiley"
    }, {
        "Name": "Bruce Ellison"
    }, {
        "Name": "Yvonne Oneal"
    }, {
        "Name": "Joseph Carlson"
    }, {
        "Name": "Idona Owens"
    }, {
        "Name": "Nathan Burks"
    }, {
        "Name": "Skyler Ratliff"
    }, {
        "Name": "Helen Sandoval"
    }, {
        "Name": "Alea Bradley"
    }, {
        "Name": "Sean May"
    }, {
        "Name": "Salvador Mason"
    }, {
        "Name": "Jin Bolton"
    }, {
        "Name": "Gil Norton"
    }, {
        "Name": "Lev Haley"
    }, {
        "Name": "Stacy Albert"
    }, {
        "Name": "Gray Fuentes"
    }, {
        "Name": "Ayanna Joseph"
    }, {
        "Name": "Guinevere Larson"
    }, {
        "Name": "Sylvester Hendricks"
    }, {
        "Name": "Barry Pollard"
    }, {
        "Name": "Jason Tyler"
    }, {
        "Name": "Denise Dunlap"
    }, {
        "Name": "Kevyn Shelton"
    }, {
        "Name": "Sylvester Pittman"
    }, {
        "Name": "Autumn Vance"
    }, {
        "Name": "Nyssa Zamora"
    }, {
        "Name": "Jolene Medina"
    }, {
        "Name": "Anne Davenport"
    }, {
        "Name": "Indigo Craft"
    }, {
        "Name": "Evan Phillips"
    }, {
        "Name": "Germaine Hurst"
    }, {
        "Name": "Jason Calhoun"
    }, {
        "Name": "Rogan Dixon"
    }, {
        "Name": "Meredith Dale"
    }, {
        "Name": "Karen Cummings"
    }, {
        "Name": "Adria Melendez"
    }, {
        "Name": "Keiko Gilbert"
    }, {
        "Name": "Cadman Mckenzie"
    }, {
        "Name": "Ciaran Gordon"
    }, {
        "Name": "Herman Campos"
    }, {
        "Name": "Lyle Stanton"
    }, {
        "Name": "Boris Mccarthy"
    }, {
        "Name": "Whitney Guthrie"
    }, {
        "Name": "Bethany Bullock"
    }, {
        "Name": "Genevieve Bonner"
    }, {
        "Name": "Clayton Avila"
    }, {
        "Name": "Mary Bonner"
    }, {
        "Name": "Hunter Dillard"
    }, {
        "Name": "Kaden Freeman"
    }, {
        "Name": "Lacota Mcmahon"
    }, {
        "Name": "Leah Pena"
    }, {
        "Name": "Erich Davis"
    }, {
        "Name": "Belle Hardy"
    }, {
        "Name": "Raphael Burns"
    }, {
        "Name": "Mufutau Berry"
    }, {
        "Name": "Channing Whitney"
    }, {
        "Name": "Kennedy Baldwin"
    }, {
        "Name": "Benjamin Roberson"
    }, {
        "Name": "Cairo Chase"
    }, {
        "Name": "Abraham Cook"
    }, {
        "Name": "Ursula Aguilar"
    }, {
        "Name": "Montana Hicks"
    }, {
        "Name": "Jemima Schultz"
    }, {
        "Name": "Renee Lang"
    }, {
        "Name": "Keiko Oneal"
    }, {
        "Name": "Levi Decker"
    }, {
        "Name": "Nichole Grimes"
    }, {
        "Name": "Graiden Cooke"
    }, {
        "Name": "Jane Parks"
    }, {
        "Name": "Tanya Rios"
    }, {
        "Name": "Phillip Rodgers"
    }, {
        "Name": "Levi Rivas"
    }, {
        "Name": "Delilah Carson"
    }, {
        "Name": "Heidi Gregory"
    }, {
        "Name": "Thor Nicholson"
    }, {
        "Name": "Lewis Burks"
    }, {
        "Name": "Lucius Jacobson"
    }, {
        "Name": "Shoshana Mason"
    }, {
        "Name": "Kyle Sheppard"
    }, {
        "Name": "Ivory Hatfield"
    }, {
        "Name": "Raja Porter"
    }, {
        "Name": "Emery Dawson"
    }, {
        "Name": "Leila Lopez"
    }, {
        "Name": "Stephanie Romero"
    }, {
        "Name": "Zeus Hinton"
    }, {
        "Name": "Odette Lowery"
    }, {
        "Name": "Joelle Daniel"
    }, {
        "Name": "Damian Mercer"
    }, {
        "Name": "Jackson Phillips"
    }, {
        "Name": "Lucy Farmer"
    }, {
        "Name": "Maxwell Roth"
    }, {
        "Name": "Price Booker"
    }, {
        "Name": "Blythe Albert"
    }, {
        "Name": "Morgan Mcclain"
    }, {
        "Name": "Hoyt Wright"
    }, {
        "Name": "Petra Williamson"
    }, {
        "Name": "Azalia Barry"
    }, {
        "Name": "Carolyn Sampson"
    }, {
        "Name": "Steven Roth"
    }, {
        "Name": "Amber Barrett"
    }, {
        "Name": "Belle Burns"
    }, {
        "Name": "Halee Tyler"
    }, {
        "Name": "Hadley Nielsen"
    }, {
        "Name": "Kirestin Lee"
    }, {
        "Name": "Kim Atkins"
    }, {
        "Name": "Anne Buck"
    }, {
        "Name": "Kai Warren"
    }, {
        "Name": "Tanek Huber"
    }];

    var attendanceIds = [
        '56b6097c426f6175276e1d1c',
        '56b618a9220920e7316653f6',
        '56b63f60d09ad7ef3cc53332'
    ];

    var classRooms = ['10 B', '10 A', '10 C']

    var students = [];

    var nameIndex = 0

    names.forEach(function(name, index, array) {

        var splitName = name.Name.split(' ');

        students.push({
            FirstName: splitName[0],
            LastName: splitName[1],
            RollNumber: index + 1,
            ClassRoomId: attendanceIds[nameIndex],
            Class: classRooms[nameIndex]
        });

        if (nameIndex == 2)
            nameIndex = 0;
        else
            nameIndex++;

    });

    studentModel.collection.insert(students, function(err, response) {
        if (err)
            res.json({
                status: 'Failure',
                message: 'An error has occured',
                Data: null
            });
        else
            res.json({
                status: 'success',
                message: 'student information is inserted successfully',
                Data: response
            });
    });
});

module.exports = router;
