var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SuperHeroeSchema = Schema({
    _id: mongoose.Types.ObjectId,
    nombre: {
        type: String,
        required: true,
        uppercase: true
    },
    alineacion: {
        type: String,
        enum: ['HEROE', 'VILLANO', 'ANTIHEROE'],
        default: 'HEROE'
    },
    equipo: {
        type: String,
        uppercase: true
    },
    superpoderes: {
        type: [String],
        uppercase: true
    },
    imagen: String,
    franquicia: {
        type: String,
        uppercase: true
    }
})

module.exports = mongoose.model('Superheroe', SuperHeroeSchema);