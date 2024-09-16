const request = require('supertest');
const app = require('../src/app');  
const { messages } = require('../src/config');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoic3VwZXJBZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjYwNDQzNDMsImV4cCI6MTcyNjY0OTE0M30.TWm0kkQHvToHnJbRFV5Geqt_hqUBYHowNuZrgujd4E8";

describe('POST /changeStatus', () => {
    it('should change the status for a valid orderId', async () => {
        const payload = {
            "orderId": 1,
            "status": 1
        };


        const response = await request(app)
            .post('/orderV2/changeStatus') 
            .set('Authorization', `Bearer ${token}`)  
            .send(payload)
            .expect(200); 

        expect(response.body).toHaveProperty('status', 200);
        expect(response.body).toHaveProperty('message', 'Order approved');
        expect(response.body.data).toHaveProperty('orderId', 1);
    });  
    it('should should give the status 400 when the order id is not valid', async () => {
        const payload = {
            "orderId": 121,
            "status": 1
        }

        const response = await request(app)
        .post('/orderV2/changeStatus')
        .set('Authorization', `Bearer ${token}`)
        .send(payload)
        .expect(400);

        console.log("thsi is response", response.body)

        expect(response.body).toHaveProperty('status', 400);
        expect(response.body).toHaveProperty('message', 'Invalid request'); 
    })
});


describe('GET /orderV2/orderHistory/:id', () => {
    it('should return paginated order history with correct status and data', async () => {
        const orderId = 1;
        const response = await request(app)
            .get(`/orderV2/orderHistory/${orderId}`)
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, size: 10, sortColumn: 'createdAt', sortBy: 'DESC' })
            .expect(200);

            expect(response.body).toHaveProperty('status', 200);
            expect(response.body).toHaveProperty('message', 'Listed successfully');
            expect(response.body).toHaveProperty('data');
           
            expect(response.body.data).toHaveProperty('list');
            expect(response.body.data.list).toBeInstanceOf(Array);
            
    });

    
});


describe('GET /orderV2/orderHistory/:id', () => {
    it('should return paginated order history with correct status and data', async () => {
        const orderId = 1;
        const response = await request(app)
            .get(`/orderV2/orderHistory/${orderId}`)
            .set('Authorization', `Bearer ${token}`)
            .query({ page: 1, size: 10, sortColumn: 'createdAt', sortBy: 'DESC' })
            .expect(200);

            expect(response.body).toHaveProperty('status', 200);
            expect(response.body).toHaveProperty('message', 'Listed successfully');
            expect(response.body).toHaveProperty('data');
           
            expect(response.body.data).toHaveProperty('list');
            expect(response.body.data.list).toBeInstanceOf(Array);
            
    });

    
});




describe('GET /view/:orderId ', () => {
    it('should return order for the order id ', async () => {
        const orderId = 1;
        const response = await request(app)
            .get(`/orderV2/view/${orderId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

            expect(response.body).toHaveProperty('status', 200);
            expect(response.body).toHaveProperty('message', 'Listed successfully');
            expect(response.body).toHaveProperty('data');
           
            expect(response.body.data).toHaveProperty('list');
            expect(response.body.data.list).toBeInstanceOf(Array);
            
    });

    
});



const { sum, findMax, isEven, filterOdd } = require('../functions');

describe('Testing sum function', () => {
  test('should return the correct sum of numbers', () => {
    const numbers = [1, 2, 3, 4];
    const result = sum(numbers);
    expect(result).toBe(10);
  });

  test('should return 0 for an empty array', () => {
    const result = sum([]);
    expect(result).toBe(0);
  });

  test('should handle negative numbers', () => {
    const numbers = [-1, -2, -3, -4];
    const result = sum(numbers);
    expect(result).toBe(-10);
  });

  test('sum should be equal to 15' , () => {
    const numbers = [1, 2, 3, 3, 6]
    const result = sum(numbers);
    expect(result).toBe(15);
  })

  test('it should return zero when the array is zero', () =>{
    const numbers = [0, 0, 0];
    const result = sum(numbers);
    expect(result).toBe(0)
  })
});

describe('testing max function', () => {
  test('it should return the max value present in array', () =>{
    const numbers = [12, 14, 15, 16, 22];
    const max  = findMax(numbers)
    expect(max).toBe(22);
  })

  test('another test case like zero', () => {
    const number = [-1, -4, -7, -11, 0]
    const max = findMax(number)
    expect(max).toBe(0)
  })
})


describe('testing the odd function', () =>{
    
})




const request = require('supertest');
const app = require('../src/app');


describe('GET /bomview/:orderId', () => {
    
    it('should return BOM data for a valid orderId', async () => {
        const orderId = 1; 

        const response = await request(app)
            .get(`/bomroutes/bomview/${orderId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('status', 200);
        expect(response.body).toHaveProperty('message', 'BOM retrieved successfully');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('bomId');
        expect(response.body.data).toHaveProperty('orderId');
        expect(response.body.data).toHaveProperty('fabricBomDetails');
        expect(response.body.data).toHaveProperty('trimBomDetails');
        expect(response.body.data).toHaveProperty('manufacturingCosts');
        expect(response.body.data).toHaveProperty('currencyconvertion');
        expect(response.body.data).toHaveProperty('miscellaneousactivety');
    });

    it('should return a 200 status with empty BOM details when BOM is not found but order is found', async () => {
        const orderId = 8; 

        const response = await request(app)
            .get(`/bomroutes/bomview/${orderId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('status', 200);
        expect(response.body).toHaveProperty('message', 'BOM retrieved successfully');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('bomId', null);
        expect(response.body.data).toHaveProperty('orderId', orderId.toString());
        expect(response.body.data).toHaveProperty('fabricBomDetails');
        expect(response.body.data).toHaveProperty('trimBomDetails');
        expect(response.body.data).toHaveProperty('manufacturingCosts', []);
        expect(response.body.data).toHaveProperty('currencyconvertion', []);
        expect(response.body.data).toHaveProperty('miscellaneousactivety', []);
        expect(response.body.data.fabricBomDetails).toBeInstanceOf(Array);
        expect(response.body.data.trimBomDetails).toBeInstanceOf(Array);
    });

    it('should return a 500 status with error message when neither BOM nor order is found', async () => {
        const orderId = 9999; // Assuming this order does not exist

        const response = await request(app)
            .get(`/bomroutes/bomview/${orderId}`)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('status', 200);
        expect(response.body).toHaveProperty('message', 'BOM retrieved successfully');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toHaveProperty('code', 500);
        expect(response.body.data).toHaveProperty('status', 'Error');
        expect(response.body.data).toHaveProperty('originalErr', 'Not found');
    });

    
    
});



describe('POST /bomroutes/bomupdate', () => {


    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoic3VwZXJBZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjU5NzI4MDUsImV4cCI6MTcyNjU3NzYwNX0.5X9j1enuIVt_E5TABxYaCLt7afTgPcLQDKqvl_8IkoE";


    it('should update BOM data successfully and return a success message', async () => {
        const payload = {
            "bomId": 1,
            "orderId": 1,
            "fabricBomDetails": [
                {
                    "fabricStockId": 101,
                    "orderId": 1,
                    "code": "FAB001",
                    "fabricPosition": "Front",
                    "fabricCode": "FC001",
                    "count": 100,
                    "composition": "Cotton/Polyester",
                    "source": "Supplier A",
                    "units": 1,
                    "consumption": 200,
                    "approvalstatus": "pending",
                    "action": "update",
                    "createdBy": "User123",
                    "approvedOrRejectedBy": null,
                    "construction": "Woven",
                    "weave": "Plain",
                    "width": 150,
                    "gsm": 200,
                    "dying": "Solid",
                    "splitByColour": true,
                    "pricePerUnit": 10.5,
                    "certification": "ISO",
                    "peaching": true,
                    "printed": true,
                    "otherFinishes": "None",
                    "fabricColors": [
                        {
                            "color": "Red",
                            "garmentQuantity": 100
                        },
                        {
                            "color": "Blue",
                            "garmentQuantity": 50
                        }
                    ],
                    "fabricComposition": [
                        {
                            "content": 50,
                            "fibre": "Cotton"
                        },
                        {
                            "content": 50,
                            "fibre": "Polyester"
                        }
                    ]
                },
            ],
            "trimBomDetails": [
                {
                    "trimStockId": 1,
                    "orderId": 1,
                    "trimType": "Zipper",
                    "source": "SupplierX",
                    "averageUnitCost": true,
                    "averageConsumption": false,
                    "approvalStatus": "pending",
                    "createdBy": "admin",
                    "apprOrRejBy": null,
                    "action": "create",
                    "subgroup": false,
                    "splitBySize": true,
                    "splitByColor": true,
                    "consumptionPerPiece": 0.75,
                    "unitsOfConsumption": "meters",
                    "colorDetails": [
                        {
                            "color": "Red",
                            "quantity": 50,
                            "price": 1.25,
                            "currency": "USD"
                        }
                    ],
                    "sizeDetails": [
                        {
                            "size": "M",
                            "quantity": 30,
                            "price": 2.5,
                            "currency": "USD"
                        }
                    ],
                    "sizeColorDetails": [
                        {
                            "size": "M",
                            "color": "Red",
                            "quantity": 20,
                            "price": 3.75,
                            "currency": "USD"
                        }
                    ]
                },
            ],
            "manufacturingCosts": [
                {
                    "process": "Dyeing",
                    "currency": "USD",
                    "pricePerUnit": 10,
                    "consumption": 100,
                    "remarks": "High quality dye",
                    "approvalStatus": "approved",
                    "createdBy": "admin",
                    "approvedOrRejectedBy": "manager",
                    "action": "create",
                    "typeOfProcess": "fabric",
                    "descriptionOfProcess": "Process description here",
                    "remark": "Additional remarks"
                }
            ],
            "currencyConversions": [
                {
                    "currency": "USD",
                    "code": "USD",
                    "trimType": "Zipper",
                    "action": "create"
                }
            ],
            "miscellaneousActivities": [
                {
                    "item": "Packaging",
                    "totalCost": 50,
                    "currency": "USD",
                    "quantity": 100,
                    "approvalStatus": "approved",
                    "action": "create"
                }
            ]
        };

        const response = await request(app)
            .post('/bomroutes/bomupdate')
            .set('Authorization', `Bearer ${token}`)
            .send(payload)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toHaveProperty('status', 200);
        expect(response.body).toHaveProperty('message', 'BOM updated successfully');
    });

    it('should create the bom for the particular orderId when  the bom is not available', async () =>{
        const payload = {
            "orderId": 6,
            "fabricBomDetails": [
              {
                "fabricStockId": 101,
                "orderId": 1,
                "code": "FAB001",
                "fabricPosition": "Front",
                "fabricCode": "FC001",
                "count": 100,
                "composition": "Cotton/Polyester",
                "source": "Supplier A",
                "units": 1,
                "consumption": 200,
                "approvalstatus": "pending",
                "action": "update",
                "createdBy": "User123",
                "approvedOrRejectedBy": null,
                "construction": "Woven",
                "weave": "Plain",
                "width": 150,
                "gsm": 200,
                "dying": "Solid",
                "splitByColour": true,
                "pricePerUnit": 10.5,
                "certification": "ISO",
                "peaching": true,
                "printed": true,
                "otherFinishes": "None",
                "fabricColors": [
                  {
                    "color": "Red",
                    "garmentQuantity": 100
                  },
                  {
                    "color": "Blue",
                    "garmentQuantity": 50
                  }
                ],
                "fabricComposition": [
                  {
                    "content": 50,
                    "fibre": "Cotton"
                  },
                  {
                    "content": 50,
                    "fibre": "Polyester"
                  }
                ]
              },
              {
                "fabricStockId": 101,
                "orderId": 1,
                "code": "FAB001",
                "fabricPosition": "Front",
                "fabricCode": "FC001",
                "count": 100,
                "composition": "Cotton/Polyester",
                "source": "Supplier A",
                "units": 1,
                "consumption": 200,
                "approvalstatus": "pending",
                "action": "update",
                "createdBy": "User123",
                "approvedOrRejectedBy": null,
                "construction": "Woven",
                "weave": "Plain",
                "width": 150,
                "gsm": 200,
                "dying": "Solid",
                "splitByColour": true,
                "pricePerUnit": 10.5,
                "certification": "ISO",
                "peaching": true,
                "printed": true,
                "otherFinishes": "None",
                "fabricColors": [
                  {
                    "color": "Red",
                    "garmentQuantity": 90
                  },
                  {
                    "color": "Blue",
                    "garmentQuantity": 90
                  }
                ],
                "fabricComposition": [
                  {
                    "content": 60,
                    "fibre": "Cotton"
                  },
                  {
                    "content": 60,
                    "fibre": "Polyester"
                  }
                ]
              }
            ],
            "trimBomDetails": [
              {
                "trimStockId": 1,
                "orderId": 1,
                "trimType": "Zipper",
                "source": "SupplierX",
                "averageUnitCost": true,
                "averageConsumption": false,
                "approvalStatus": "pending",
                "createdBy": "admin",
                "apprOrRejBy": null,
                "action": "create",
                "subgroup": false,
                "splitBySize": true,
                "splitByColor": true,
                "consumptionPerPiece": 0.75,
                "unitsOfConsumption": "meters",
                "colorDetails": [
                  {
                    "color": "Red",
                    "quantity": 50,
                    "price": 1.25,
                    "currency": "USD"
                  }
                ],
                "sizeDetails": [
                  {
                    "size": "M",
                    "quantity": 30,
                    "price": 2.5,
                    "currency": "USD"
                  }
                ],
                "sizeColorDetails": [
                  {
                    "size": "M",
                    "color": "Red",
                    "quantity": 20,
                    "price": 3.75,
                    "currency": "USD"
                  }
                ]
              },
              {
                "trimStockId": 1,
                "orderId": 1,
                "trimType": "Zipper",
                "source": "SupplierX",
                "averageUnitCost": true,
                "averageConsumption": false,
                "approvalStatus": "pending",
                "createdBy": "admin",
                "apprOrRejBy": null,
                "action": "create",
                "subgroup": false,
                "splitBySize": true,
                "splitByColor": true,
                "consumptionPerPiece": 0.75,
                "unitsOfConsumption": "meters",
                "colorDetails": [
                  {
                    "color": "Red",
                    "quantity": 40,
                    "price": 1.25,
                    "currency": "USD"
                  }
                ],
                "sizeDetails": [
                  {
                    "size": "M",
                    "quantity": 30,
                    "price": 2.5,
                    "currency": "USD"
                  }
                ],
                "sizeColorDetails": [
                  {
                    "size": "M",
                    "color": "Red",
                    "quantity": 30,
                    "price": 3.75,
                    "currency": "USD"
                  }
                ]
              }
            ],
            "manufacturingCosts": [
              {
                "process": "Dyeing",
                "currency": "USD",
                "pricePerUnit": 10,
                "consumption": 100,
                "remarks": "High quality dye",
                "approvalStatus": "approved",
                "createdBy": "admin",
                "approvedOrRejectedBy": "manager",
                "action": "create",
                "typeOfProcess": "fabric",
                "descriptionOfProcess": "Process description here",
                "remark": "Additional remarks"
              }
            ],
            "currencyConversions": [
              {
                "currency": "USD",
                "code": "USD",
                "trimType": "Zipper",
                "action": "create"
              }
            ],
            "miscellaneousActivities": [
              {
                "item": "Packaging",
                "totalCost": 50,
                "currency": "USD",
                "quantity": 100,
                "approvalStatus": "approved",
                "action": "create"
              }
            ]
          }

          const response = await request(app)
          .post('/bomroutes/bomupdate')
          .set('Authorization', `Bearer ${token}`)
          .send(payload)
          .expect('Content-Type', /json/)
          .expect(200);

          expect(response.body).toHaveProperty('status', 200);
          expect(response.body).toHaveProperty('message', 'BOM updated successfully')
    })

});



///this test cases i wrote for my live project api testing