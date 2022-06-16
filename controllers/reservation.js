const Reservation = require('../models/reservation');

exports.getReservations = (req, res) => {
  Reservation.find()
  .then(data=>{
    res.render('index/reservations', {
      title_name: 'All Reservations',
      data: data
    });
  }).catch(err => {
    console.log(err)
    return  res.redirect("/")
  })
};

exports.getAddReservation = (req, res) => {
    res.render('index/new_reservation', {
      title_name: 'Add Reservation'
    });
};


exports.getSingleReservation = (req, res) => {
  Reservation.findById(req.params.reservationId)
    .then(data=>{
      if(!data){
          return res.redirect('/404')
      }  
      res.render('index/reservation_detail', {
        title_name:"Single Data",
        data: data
      });
    }).catch(err => {
      console.log(err)
      return  res.redirect("/")
    })
  };


  exports.deleteSingleReservation = (req, res) => {
    Reservation.findByIdAndRemove(req.body.reservationId)
    .then(()=>{
        return res.redirect("/");
      }).catch(err=>{
        console.log(err)
        return res.redirect("/404")
      })
  };


  exports.postNewReservation = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const roomType = req.body.roomType;
    const comment = req.body.comment;
    const dinner = req.body.dinner === "yes"? true : false;
    const paymentMethod = req.body.paymentMethod
    
    const data = new Reservation({firstName,lastName,roomType,comment,dinner,paymentMethod})

    data.save().then(()=>{
       return res.redirect("/");
    }).catch(err=>{
        console.log(err)
        return res.redirect("/404")
    })
  }  


  exports.getEditReservation = (req, res) => {
    const reservationId = req.params.reservationId;
    Reservation.findById(reservationId)
      .then(data => {
        if (!data) {
          return res.redirect('/404');
        }
        res.render('index/edit_reservation', {
          title_name: 'Edit reserved room',
          reservation: data
        });
      })
      .catch(err => {
         console.log(err)
         return res.redirect('/404');
      });
  };
  


  exports.postEditReservation = (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const roomType = req.body.roomType;
    const comment = req.body.comment;
    const dinner = req.body.dinner === "yes"? true : false;
    const paymentMethod = req.body.paymentMethod
  
    Reservation.findById(req.params.reservationId)
      .then(data => {
        if (!data) {
          return res.redirect('/404');
        }
        data.firstName = firstName;
        data.lastName = lastName;
        data.roomType = roomType;
        data.comment = comment;
        data.dinner = dinner;
        data.paymentMethod = paymentMethod;
  
        return data.save().then(result => {
          res.redirect('/');
        });
      })
      .catch(err =>{
          console.log(err);
        return res.redirect('/404');
      });
  };

