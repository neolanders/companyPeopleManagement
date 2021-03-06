# CompanyManagmentSystem (RPT) #

After being interviewed for a company, I got an interesting assignment to do using Angular 2 Framework.
I found this assignment interesting since the main goal was to build a simple application and to connect it to a REST apis (that was design following SWAGGER).
Also this assignment involve many aspects and technologies to build a proper web application today respecting the best practice of the Framework.
([Angular](https://angular.io/) Angular Framework latest version (4.x.x), [Angular CLI](https://cli.angular.io/) Cli used to generate components... build and run the application and tests, Server running on [NodeJs](http://nodejs.org/) and the API was design using [SWAGGER](http://swagger.io/) Swagger is the world’s largest framework of API developer tools for the OpenAPI Specification(OAS), enabling development across the entire API lifecycle, from design and documentation, to test and deployment, [Twitter Botstrap](http://getbootstrap.com/) (Css3), [Karma](http://karma-runner.github.io/0.12/index.html) and [Jasmine](http://jasmine.github.io/) for testing)
For this reason I've decided to share my work below.

**Assignment Description:**

Using Angular2 as the Javascript framework and Twitter Bootstrap as the CSS framework,
Code a Company Management System with the following functionalities:
- Show a list of companies
- Show the details/full record of an existing company
- Create a new company
- Edit an existing company's record
- Show a list of people who work at a given company
- Show the details for a specific person
- Edit a person's record
- Delete a person record
- Create a new person, associating them to an existing company
- Bonus: make the site responsive


## PRE REQUIREMENT:
Install MongoDB for rest API,
Install brew, node, npm & mongo. On OSX the commands below should work.

```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew doctor #fix all issues
brew update
brew install node
brew install mongodb
```

## Usage

Run and Install node dependency for the server : (At root folder)
```
npm install
npm run start

GO TO SERVER:3001/swagger/index.html#/Companies
```

![Alt text](/screenshots/screenSwagger.png?raw=true "Swagger")

*******************************
TO RUN THIS PROJECT FOLLOW
INSTRUCTIONS BELOW:
*******************************

1) FIRST RUN "npm install" to retrieve all packages for server API in root folder (I've added a cors package, see below for more explaination)
2) RUN "npm install" inside testCode/project to install necessary librairy for runing client
3) Inside testCode/project RUN "ng serve" to start the application
4) In root folder run server API "npm run start"
5) GO to http://localhost:4200/#/ to enter the application

************************************
SOME EXPLAINATION ABOUT ANGULAR CLI:
************************************

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.0-beta.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).



>>>> SERVER MODIFIES:

*******************************
TO DEAL WITH CORS IN LOCALHOST:
*******************************

I had to import the cors package in server.js:

var cors = require('cors');

(ref: https://stackoverflow.com/questions/39071430/enabling-cross-origin-resource-sharing-cors-in-expressjs-framework-on-nodejs-d)


*******************************
ADD A CHECK FOR COMPANY ALREADY
EXIST: (When create new company)
*******************************

I've added an error test when Company already exist in controllers/company.js

```
exports.add = function(req, res) {
    Company.findOne({'name': req.body.name}, function(err, result) {
        // I've added an error test when Company already exist, in real life we should add here a specific code error (ex: CompanyAlreadyExist)
        return res.send(500);
    });
    ....
```

*******************************
ADD DELETE COMPANY MISSING
FUNCTION
*******************************

I've added company delete function in controllers/company.js

```
exports.delete = function(req, res) { return res.send(500);
    var id = req.params.id;
	Company.delete({'_id': id}, req.body, function(err, numberAffected) {
```

I've added company route for delete in routes.js

```
app.delete('/company/:id', company.delete);
```


## Project Structure

Overview (testCode/project/src)

    |── app                     - I part the application in one module (companies.module.ts)
    │   └──  companies          - Contain all necessary components, forms and services for our app
    │   |    └── companies-list
    │   |    └── company-details
    │   |    └── person-details
    |   │    └── person-list
    |   │    └── shared          - Contain forms shared for the entire module
    |   |         └── forms
    |   |               └── company-form
    |   |               └── person-form
    │   └──--shared              - Contain ui (phone) directive shared for the application
    |           └── ui
    ├── assets
    |      └── sass
    |
    |__ node_modules           - Contain all node modules list under package.json
    |
    └── karma.conf.js          - Configuration file for our tests
    └── package.json
    |-- ...                    - Other config files (protractor.conf.js / tsconfig.json ... )

## Some explanation about my work:

I used Angular cli to bundle my application
(preprocessor for sass, build and run the server, webpack is already well setup,
it's also can be used for testing later "unitest / e2e")
it's make it easier to get a ready to go application.

To organize my code, I've created a companies folder that contain all my components and module.
The CompaniesModule is the main module that import all necessary components and the routing for the purpose of the application.
The major's component that I've created is CompaniesComponent, it's contain the form to create a new person and company.

There is also other components that I've build:
CompaniesListComponent: Used to display the companies list with details.
CompanyDetailsComponent: Used to display specific company details (For modify)
PersonDetailsComponent: Used to display specific person details (For modify)
PersonsListComponent: Used to display persons belong to a specific company.

And two forms (Reactive Forms angular 2 Form Builder)
CompanyFormComponent: Used to create and modify company
PersonFormComponent: Used to create and modify person
...

Since the company and person list can easily grow fast I've also added an input search to filter the lists.

Like we discuss, in order to make it work, I had to make some modification as well on the backend:
- Added an error test when Company already exist in controllers/company.js
- Added company delete function in controllers/company.js
- Added company route to access delete function in routes.js
- Import the cors package in server.js to deal with CORS issues

## RUN ON NODE SERVER ON CLOUD9:

Install MongoDB on cloud9:  https://community.c9.io/t/setting-up-mongodb/1717
Run MongoDB: ./mongod
Run server: npm-start
Open: https://company-people-management-neolanders.c9users.io:8080/#/

## DEMO:
https://company-people-management-neolanders.c9users.io:8080/#/

## Screens Shot:

![Alt text](/screenshots/screenCompaniesList.png?raw=true "Companies List View")



