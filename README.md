# Chorally Console Admin

Chorally Console Admin is a front-end application built using Angular 16.1.8., Angular Material for components, and SCSS for styling. 
Authentication is managed through Keycloak.

## Dependencies

- [Node.js](https://nodejs.org/en/) (v14.17.0 or higher)
- [NGINX](https://www.nginx.com/) (v1.25.4)
- [Angular](https://angular.io/) (v16.1.8)
- [Angular Material](https://material.angular.io/) (v16.1.8)
- [Angular CLI](https://angular.io/cli) (v12.1.0 or higher)
- [Keycloak](https://www.keycloak.org/) (v12.0.4 or higher)


## Running the Microservice

```bash
npm install && npm run start
```


## Container Exposed Port

- **Port:** 80

## Environment Variables
```
{
    "production": false,
    "baseUrl": "https://api.dev.chorally.com",
    "outh2": {
        "url": "https://keycloak.dev.chorally.com/",
        "realm": "Console",
        "clientId": "service-api-local"
    }
}
```

## Ingress
This microservice requires an Ingress to be accessible externally. The following is an example of an Ingress configuration:

- **Ingress Required:** Yes

## External or Internal Access

- **Access:** External

## Microservice Communication

- **CHORALLY_URL:** https://api.dev.chorally.com
- **KEYCLOAK_URL:** https://keycloak.dev.chorally.com/



## Project Structure

The project is structured as follows:

```
console-frontend/
├── angular
├── dist
│   ├── console-frontend
├── node_modules
├── src
│   ├── app
│   │   ├── components
│   │   │   ├── routers
│   │   ├── core
│   │   │   ├── configs
│   │   │   ├── constants
│   │   │   ├── enums
│   │   │   ├── interceptors
│   │   │   ├── mocks
│   │   │   ├── models
│   │   │   ├── pipes
│   │   │   ├── services
│   │   │   ├── utils
│   │   ├── layout
│   │   ├── shared
│   │   │   ├── blank-state
│   │   │   ├── dialog
│   │   │   ├── snackbar
│   │   │   ├── switch
│   │   ├── app-routing.module.ts
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   ├── assets
│   ├── scss
│   ├── favicon.ico
│   ├── index.html
│   ├── main.ts
├── .editorconfig
├── .gitignore
├── angular.json
├── Containerfile
├── nginx.conf
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json

```
## Requirements (LOCAL)

- [Node.js](https://nodejs.org/en/) (v14.17.0 or higher)
- [Angular CLI](https://angular.io/cli) (v12.1.0 or higher)
- [Keycloak](https://www.keycloak.org/) (v12.0.4 or higher)

## Installation (LOCAL)

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Run `ng serve` to start the development server


## Development server (LOCAL)

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
