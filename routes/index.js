var express = require('express');
var router = express.Router();

let phoneContact= [

  {firstname: 'Femi', lastname: 'Sorinolu', email: 'femi@gmail.com', phone:'2010101111'},
  {firstname: 'John', lastname: 'Doe', email: 'john@gmail.com', phone:'5550101111'},
  

];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Manager App', currentDate: Date() });
});

router.get('/mycontacts', function(req, res, next) {
  res.render('viewContacts', { title:'My Contacts', data: phoneContact, currentDate: Date() });
});

router.get('/add', function(req, res, next) {
  res.render('addcontact', { title: 'Add New Contact', currentDate: Date() });
});

router.post('/add', function(req, res, next) {
  var fname= req.body.fname;
  var lname= req.body.lname;
  var email= req.body.email;
  var phone= req.body.phone;
  var newContact=  {firstname: fname, lastname: lname, email: email, phone:phone};
  phoneContact.push(newContact);
  res.render('viewContacts', { title:'My Contacts', data: phoneContact, currentDate: Date(), info:'new contact added' });
});

router.get('/delete/:id', function(req, res, next) {
  var id= req.params.id;
  // Removes the object with firstname: id
 phoneContact = phoneContact.filter(contact => contact.firstname !== id); 
  res.render('viewContacts', { title:'My Contacts', data: phoneContact, currentDate: Date() });
});

router.get('/update/:id', function(req, res, next) {
  var id= req.params.id;
  const contact = phoneContact.find(user => user.firstname === id);
  if(contact==null){
    res.redirect('/');
  }else{
    res.render('updateContact', { title:'Update Contact', data: contact, currentDate: Date() });

  }
});

router.post('/update', function(req, res, next) {
  var fname= req.body.fname;
  var lname= req.body.lname;
  var email= req.body.email;
  var phone= req.body.phone;
  var newContact=  {firstname: fname, lastname: lname, email: email, phone:phone};
  //replace the object whose firstname matches
  phoneContact = phoneContact.map(contact => 
    contact.firstname === newContact.firstname ? newContact : contact
  );
  
  res.render('viewContacts', { title:'My Contacts', data: phoneContact, currentDate: Date(), info:'new contact added' });
});
module.exports = router;
