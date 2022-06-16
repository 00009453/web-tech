const path = require('path');
const express = require('express');
const reservation = require('./controllers/reservation');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const errorPage = require('./controllers/error');
let port = process.env.PORT || 3000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',  reservation.getReservations);
app.get('/reservation/:reservationId',  reservation.getSingleReservation);
app.post('/delete_reservation',  reservation.deleteSingleReservation);

app.get('/new_reservation',  reservation.getAddReservation);
app.post('/new_reservation',  reservation.postNewReservation);

app.get('/edit_reservation/:reservationId', reservation.getEditReservation);
app.post('/edit_reservation/:reservationId', reservation.postEditReservation);

app.use(errorPage.getErrorPage);


async function connectToDataBase(){
  try {
    await mongoose.connect('mongodb+srv://00009453:wiut_00009453@cluster0.cdpgz.mongodb.net/hotel_reservation')
    app.listen(port);
  } catch (error) {
    console.log(error);
  }

}

connectToDataBase()