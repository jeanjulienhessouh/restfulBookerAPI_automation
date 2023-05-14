/// <reference types="cypress"

describe('Create, retrieve and partially update a booking', () => {

  let id; // let's store the id of the booking we'll create in this variable

  it('create a booking', () => {

    cy.api({
      method: 'POST',
      url: 'https://restful-booker.herokuapp.com/booking',
      body: {
        "firstname": "Jim",
        "lastname": "Brown",
        "totalprice": 111,
        "depositpaid": true,
        "bookingdates": {
          "checkin": "2018-01-01",
          "checkout": "2019-01-01"
        },
        "additionalneeds": "Breakfast"
      }

    }).as('createdBooking')
    /* Above, on line 22, I assigned an alias to the request 
    to use it late for my assertions
    */


    cy.get('@createdBooking').should((response) => {
      expect(response.status).to.eq(200) // I asserted the api response status to equal 200
      expect(response.body).to.be.an('object'); // asserted the response body is an object
      expect(response.body).to.have.a.property('bookingid'); // it has bookingid as property
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

});