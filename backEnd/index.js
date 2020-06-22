if (process.env.NODE_ENV === 'development') { // solo si estamos en desarrollo va a cachar nuestras variables de entorno
    require('dotenv').config(); // si no está en desarrollo no va a requerir las variables de entorno
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const { json } = require('express');
const cors = require('cors');

//  initializations
const app = express();
require('./db');

// settings
app.set('port', 3000); // la variable de entorno es para cachar el puerto que nos dará heroku

//middlewares
app.use(morgan('dev'));
app.use(cors());
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename(req, file, cb) {
        cb(null, new Date().getTime() + path.extname(file.originalname)); // se le dará el nombre basado en la fecha que se creó
    }

});
app.use(multer({ storage }).single('image')); // configurando que sólo se va a subir una imagen por registro
app.use(express.urlencoded({ extended: false })); // para que se entiendan los datos de un formulario en el back
app.use(json()); // indicando al server que usaremos json para que lo soporte


// especify routes files for our API REST
app.use('/api/books', require('./routes/books.routes'));

// especify files statics
app.use(express.static(path.join(__dirname, 'public')));

//start server
app.listen(app.get('port'), () => console.log('server ok'));