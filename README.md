# Event-Seating-App
Backend Event Seating Arrangement Rest API created using node, express, and mongodb database for the purpose of providing 
convenience to those looking to manage Seating Plans for events.

## Get List of Seating Arrangements by User Id
**Request**...

` GET http://localhost:4000/api/v1/seatArrangementRoute/userid`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/seatArrangementRoute/6213c66a599d8a5aa3a922df',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here'
  }
};
```

**Returns**...

* A list of Seating Arrangements made by the user whose userId is provided as a url parameter.


## Get a specific Seating Arrangement 
**Request**...

` GET http://localhost:4000/api/v1/seatArrangementRoute/seatArrangementid`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/seatArrangementRoute/6214446d35cc5a2b380d08e2',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

**Returns**...

* A specific Seating Arrangement specified by the seating arrangment id, provided as a url parameter.

--------------------------------------------------------------------------------------------------------------------------------------
## CREATE a Seating Arrangement 
** EXAMPLE Request**...

`POST http://localhost:4000/api/v1/seatArrangementRoute`

```
var axios = require('axios');
var data = JSON.stringify({
  "user": "6213c66a599d8a5aa3a922df",
  "tables": [
    {
      "name": "table 1 for tiana's wedding ",
      "guests": [
        "evangeline",
        "mama Odie",
        "ray"
      ]
    },
    {
      "name": "table 2 for tiana's wedding ",
      "guests": [
        "naveen",
        "tiana",
        "charlotte",
        "carlotta"
      ]
    }
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/seatArrangementRoute',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```


--------------------------------------------------------------------------------------------------------------------------------------
## UPDATING a Seating Arrangement 
** EXAMPLE Request**...

`PUT http://localhost:4000/api/v1/seatArrangementRoute/seatingarrangementid`

```
var axios = require('axios');
var data = JSON.stringify({
  "name": "Wedding #1",
  "user": "6213c66a599d8a5aa3a922df"
});

var config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/seatArrangementRoute/6214446d35cc5a2b380d08e2',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


```
**Returns**...

* An updated Seating Arrangement.

--------------------------------------------------------------------------------------------------------------------------------------
## DELETING a Seating Arrangement 
** EXAMPLE Request**...

`DELETE http://localhost:4000/api/v1/seatArrangementRoute/seatingarrangementid`

```

```
**Returns**...

* An updated Seating Arrangement.




--------------------------------------------------------------------------------------------------------------------------------------
## CREATING a Table 
** EXAMPLE Request**...

`POST http://localhost:4000/api/v1/tableRoute`

```
var axios = require('axios');
var data = JSON.stringify({
  "name": "Table 1",
  "guests": [
    "friend 1",
    "friend 2",
    "friend 3",
    "frien 4"
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/tableRoute',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
**Returns**...

* A Table containgin a table name and an array of table guests
```
{
    "name": "Table 1",
    "guests": [
        "friend 1",
        "friend 2",
        "friend 3",
        "cousin 1"
    ],
    "_id": "6213dba035df7ab8a0eaf45d",
    "__v": 0,
    "id": "6213dba035df7ab8a0eaf45d"
}
```

--------------------------------------------------------------------------------------------------------------------------------------
## GET a Table specified by table ID
** EXAMPLE Request**...

`GET http://localhost:4000/api/v1/tableRoute/tableid`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/tableRoute/6214446d35cc5a2b380d08de',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


```
**Returns**...

* A Table specified by table id provided as url parameter

--------------------------------------------------------------------------------------------------------------------------------------
## UPDATE a Table specified by table ID
** EXAMPLE Request**...

`PUT http://localhost:4000/api/v1/tableRoute/tableid`

```
var axios = require('axios');
var data = JSON.stringify({
  "name": "table 2 for Princess Tiana's wedding",
  "guests": [
    "naveen",
    "Tiana",
    "Eudora",
    "Charlotte"
  ]
});

var config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/tableRoute/6214446d35cc5a2b380d08df',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
**Returns**...

* An updated version of the Table specified by the table id provided as url parameter


--------------------------------------------------------------------------------------------------------------------------------------
## DELETE a Table specified by table ID
** EXAMPLE Request**...

`DELETE http://localhost:4000/api/v1/tableRoute/tableid`

```
var axios = require('axios');

var config = {
  method: 'delete',
  url: 'http://localhost:4000/api/v1/tableRoute/6213dba035df7ab8a0eaf45d',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here'
  }
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
```

--------------------------------------------------------------------------------------------------------------------------------------
##  User Registration
** EXAMPLE Request**...

`POST http://localhost:4000/api/v1/userRoute/register`

```
var axios = require('axios');
var data = JSON.stringify({
  "name": "USER",
  "email": "USERS-EMAIL-GOES-HERE",
  "password": "USERS-PASSWORD-GOES-HERE"
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/userRoute/register',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});

```
**Returns**...

* A User Object containg user: name, email, and hashSync'ed password

--------------------------------------------------------------------------------------------------------------------------------------
##  User LOG-IN

-At this step the user will be provided with a bearer token which will be used to access all other functionality of API i.e creating and storing information

** EXAMPLE Request**...

`POST http://localhost:4000/api/v1/userRoute/login`

```
var axios = require('axios');
var data = JSON.stringify({
  "email": "USER-EMAIL-GOES-HERE",
  "password": "USER-PASSWORD-GOES-HERE"
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/userRoute/login',
  headers: { 
    'Authorization': 'Bearer-Token-Goes-Here', 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});


```
**Returns**...

* A User Object containg user: email,hashSync'ed password, and Bearer Token to be used for access to all other functionailty of the API

--------------------------------------------------------------------------------------------------------------------------------------
##  GETTING a User specified by userid

** EXAMPLE Request**...

`GET http://localhost:4000/api/v1/userRoute/userid`

```

```
**Returns**...

* A User Object containg user: name, email, and hashSync'ed password










