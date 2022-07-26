# Event-Seating-App
Backend Event Seating Arrangement Rest API created using node, express, and mongodb database for the purpose of providing 
convenience to those looking to manage Seating Plans for events.

## Get List of Seating Arrangements by User Id
**Request**...

` GET http://localhost:4000/api/v1/seatArrangementRoute/:userID`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/seatArrangementRoute/:userID',
  headers: { 
    'Cookie': 'AuthToken=<Auth Token>'
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

* A list of Seating Arrangements made by the user whose userId is provided as a url parameter.


## Get a specific Seating Arrangement 
**Request**...

` GET http://localhost:4000/api/v1/seatArrangementRoute/:seatArrangementid`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/seatArrangementRoute/:seatArrangementid',
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
  "eventName": "Event Example 1",
  "eventDescription": "seating arrangement created to serve as an example of how to create a seat arrangement"
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/seatArrangementRoute',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'AuthToken= <Auth Token>'
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
## DELETING a Seating Arrangement 
** EXAMPLE Request**...

`DELETE http://localhost:4000/api/v1/seatArrangementRoute/:seatingarrangementid`

```
var axios = require('axios');

var config = {
  method: 'delete',
  url: 'http://localhost:4000/api/v1/seatArrangementRoute/:seatArrangementID',
  headers: { 
    'Cookie': 'AuthToken= <Auth Token>'
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

* Success Message.




--------------------------------------------------------------------------------------------------------------------------------------
## CREATING a Table 
** EXAMPLE Request**...

`POST http://localhost:4000/api/v1/tableRoute/:eventID`

```
var axios = require('axios');
var data = JSON.stringify({
  "tableName": "Table 2 Michaelson Wedding",
  "tableGuests": [
    {
      "firstName": "family 1",
      "lastName": "family1lastName",
      "relation": "family of event Holder"
    },
    {
      "firstName": "family 2",
      "lastName": "family2lastName",
      "relation": "family of event Holder"
    },
    {
      "firstName": "family 3",
      "lastName": "family3lastName",
      "relation": "family of event Holder"
    }
  ]
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/tableRoute/:eventID',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'AuthToken=<Auth Token>'
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
   "tableName": "Table 2 Michaelson Wedding",
   "tableGuests": [
    {
      "firstName": "family 1",
      "lastName": "family1lastName",
      "relation": "family of event Holder"
    },
    {
      "firstName": "family 2",
      "lastName": "family2lastName",
      "relation": "family of event Holder"
    },
    {
      "firstName": "family 3",
      "lastName": "family3lastName",
      "relation": "family of event Holder"
    }
  ],
    "_id": "6213dba035df7ab8a0eaf45d",
    "__v": 0,
    "id": "6213dba035df7ab8a0eaf45d"
}
```

--------------------------------------------------------------------------------------------------------------------------------------
## GET a Table specified by table ID
** EXAMPLE Request**...

`GET http://localhost:4000/api/v1/tableRoute/:tableid`

```
var axios = require('axios');

var config = {
  method: 'get',
  url: 'http://localhost:4000/api/v1/tableRoute/:tableid',
  headers: { 
    'Cookie': 'AuthToken=<Auth Token>'
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
## Adding guests
** EXAMPLE Request**...

`PUT http://localhost:4000/api/v1/tableRoute/add_guest/:tableid`

```
var axios = require('axios');
var data = JSON.stringify({
  "first_name": "extra family member",
  "last_name": "extrafamilymemberlastName",
  "relation": "family of event Holder"
});

var config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/tableRoute/add_guest/:tableid',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'AuthToken=<Auth Token>'
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
## Removing guests
** EXAMPLE Request**...

`PUT http://localhost:4000/api/v1/tableRoute/remove_guest/:tableid`

```
var axios = require('axios');
var data = JSON.stringify({
  "first_name": "extra family member",
  "last_name": "extrafamilymemberlastName",
  "relation": "family of event Holder"
});

var config = {
  method: 'put',
  url: 'http://localhost:4000/api/v1/tableRoute/remove_guest/:tableid',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'AuthToken=<Auth Token>'
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

`DELETE http://localhost:4000/api/v1/tableRoute/:tableid`

```
var axios = require('axios');

var config = {
  method: 'delete',
  url: 'http://localhost:4000/api/v1/tableRoute/:tableid',
  headers: { 
    'Cookie': 'AuthToken=<Auth Token>'
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

-At this step the user will be provided with an Auth token set in request header which will be used to access all other functionality of API i.e creating and storing information

** EXAMPLE Request**...

`POST http://localhost:4000/api/v1/userRoute/login`

```
var axios = require('axios');
var data = JSON.stringify({
  "email": "<USER EMAIL>",
  "password": "<USER PASSWORD>"
});

var config = {
  method: 'post',
  url: 'http://localhost:4000/api/v1/userRoute/login',
  headers: { 
    'Content-Type': 'application/json', 
    'Cookie': 'AuthToken= AUTH TOKEN GOES HERE'
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

* A User Object containg user: userID, userName, and token to be used for access to all other functionailty of the API

--------------------------------------------------------------------------------------------------------------------------------------
##  GETTING a User specified by userid

** EXAMPLE Request**...

`GET http://localhost:4000/api/v1/userRoute/:userid`

```

```
**Returns**...

* A User Object containg user: name, email










