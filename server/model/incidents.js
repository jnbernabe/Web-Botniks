//Nandini Hariprasad
//22/12/2021
//Report Model
let mongoose = require ('mongoose');

//Create model class
let reportsModel = mongoose.Schema({

incidentID: String,
priority: String,
status: String,
firstName: String,
lastName: String,
email: String,
phoneNumber: String,
description: String,
narrative: String,
dateCreated: Date,
dateModified: Date,
resolutionField: String

},
{

    collection: "reports"

});

module.exports = mongoose.model('Reports', reportsModel);