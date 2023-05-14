/// <reference types="cypress"

describe('Create, retrieve and partially update a booking', () => {

  let id; // let's store the id of the booking we'll create in this variable

  it('Create a booking', () => {

    cy.api({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: {
        "firstname": "Jean Julien",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2023-24-05",
          "checkout": "2023-27-05"
        },
        "additionalneeds": "Breakfast"
      }

    }).as('createdBooking')
    /* Above, I assigned an alias to the request 
    to use it later for my assertions
    */


    cy.get('@createdBooking').should((response) => {
      expect(response.status).to.eq(200) // I asserted the api response status is equal to 200
      expect(response.body).to.be.an('object'); // asserted the response body is an object
      expect(response.body).to.have.a.property('bookingid'); // and it has bookingid as property
    })

      /* 
      Below I'll retrieve the created booking id and assign it to 
      the id value I created on line 5
      */

      .then((response) => {

        cy.wrap(response.body['bookingid']).as('id');
        id = response.body['bookingid'];

      })

  });


  it('Get the booking created above', () => {
    cy.api({
      method: 'GET',
      url: 'https://restful-booker.herokuapp.com/booking/' + id
      // Above, I forwarded the id variable as a parameter to this url  with a get method
    }).its('body').then((body) => {
      expect(body.firstname).to.equal('Jean Julien');
      /*
      This assertion / check should be enough to make sure the request went well and that 
      we are retrieving the booking we created in our first request
        
      I can also use code on lines 63 and 64 to assert what I asserted on lines 55 and 56
        .then((response) => {
      expect(response.body.firstname).to.equal('Jean Julien');
      */
    })


  })



});