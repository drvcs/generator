# generator-colco-microservice

Generador de proyecto microservicio para ColComercio

Este generador -basado en el desarrollo de Carmine DiMascio (https://www.npmjs.com/package/generator-express-no-stress)- permite crear una base de desarrollo para los proyectos microservicio en ColComercio.

El proyecto generado adopta las siguientes funcionalidades:

- [Express.js](www.expressjs.com) - framework de publicación HTTP para Node.js
- [Swagger](http://swagger.io/) - Permite que la validación de la mensajería JSON automaticamente se compruebe contra la definición de contrato **OpenAPI (Swagger)** obligatorio para los API que se construyan en ColComercio
- [SwaggerUI](http://swagger.io/) - Publica la documentación swagger  hacia usuario del microservicios
- [Babel.js](https://babeljs.io/) - Permite utilizar una sintaxis moderna de JS
- [Pino](https://github.com/pinojs/pino) - Plataforma de logs que se acoplará a las capacidades de LOG de OpenShift
- [dotenv](https://github.com/motdotla/dotenv) - Carga los valores de parametrización por ambiente del archivo **.env:**
- [ESLint](http://eslint.org/) - Ayuda a mejora el estilo de escritura de JS utilizando las definiciones basadas por AirBnB [Airbnb](https://github.com/airbnb/javascript)
	- [Prettier](https://github.com/prettier/prettier) - Prettier is an opinionated code formatter

El proyecto generado facilita las siguientes capacidades en tiempo de desarrollo:  
- [nodemon](http://nodemon.org/) - Permite que el desarrollador 
- [mocha]





generator-colco-microservice gets you up and running in seconds. It's ridiculously easy to configure. Heck, just take the defaults. Start it. Write code.

This generator scaffolds a fully functioning REST API server, complete with interactive documentation, API validation, structured logging, environment driven config, and more. Simply run the generator and smile :-D

[Here's what you get!](#what-you-get)

## Install

_Requires Node 8 or greater_

```shell
npm install -g yo generator-colco-microservice
```

- See [here](#usage-cli) for use with Yarn and/or Docker
- See [here](#faqs) for Node 6 support

## Scaffold

```shell
yo colco-microservice myapp
cd myapp
```

## Run

Run in _development mode_:

```shell
npm run dev
```

Package and run in _production mode_

```shell
npm run compile
npm start
```

## Test

```shell
npm test
```

## Debug

Run one of the following, then attach your favorite inspector e.g. [VSCode](#debug-in-vscode):

```shell
# debug the server
npm run dev:debug

# debug the tests
npm run test:debug
```

## Try it!

- Interactive API doc at [http://localhost:3000/api-explorer](http://localhost:3000/api-explorer)
- Landing page at [http://localhost:3000](http://localhost:3000)

---

## Usage: CLI

```shell
yo colco-microservice [appname] [--yarn] [--docker]
```

| Option     | default | Description                                                                |
| ---------- | ------- | -------------------------------------------------------------------------- |
| `appname`  | myapp   | The application folder                                                     |
| `--yarn`   | -       | Use the [`yarn`](https://yarnpkg.com) package manager, instead of `npm`    |
| `--docker` |         | Install [Docker](https://www.docker.com/) artifacts including a Dockerfile |

## Usage: Project

The sections below describe all usage options available once the project is generated/scaffolded.

### npm targets

| Target               | Description                                                              |
| -------------------- | ------------------------------------------------------------------------ |
| `npm run dev`        | Run in _development_ mode                                                |
| `npm run dev:debug`  | Debug in _development_ mode                                              |
| `npm run test`       | Run tests                                                                |
| `npm run test:debug` | Deubg tests                                                              |
| `npm run lint`       | View a listing of all errors discovered by the linter                    |
| `npm run lint:fix`   | Fix all errors discovered by the linter                                  |
| `npm run compile`    | Transpile source code for production use                                 |
| `npm start`          | Run the in _production_ mode. \*Requires running `npm run compile` first |

### Debug in VSCode

Add these [contents](https://github.com/cdimascio/generator-colco-microservice/blob/next/assets/.vscode/launch.json) to your `.vscode/launch.json` file

### Despliegue hacia OpenShift

Despliegue a entorno Desarrollo

```
oc ???? push myapp
```


---


### API Validation

La validación se realiza de forma automática contra las definiciones del Swagger 2.0:

- Interactive documentation
- API validation

????



### Structured Logging

Structured logging out of the box!

#### raw

![](https://raw.githubusercontent.com/cdimascio/generator-colco-microservice/master/assets/logging-raw.png)

#### pretty

Structured logging pretty printed by default - great for dev!

![](https://raw.githubusercontent.com/cdimascio/generator-colco-microservice/master/assets/logging-pretty.png)

### API Validation Example

Simply describe your APIs with Swagger and automatically get:

- API request validation
- Interactive documentation

### example

#### Swagger API spec

```yaml
swagger: '2.0'
info:
  version: 1.0.0
  title: myapp
  description: My cool app
basePath: /api/v1
tags:
  - name: Examples
    description: Simple example endpoints
  - name: Specification
    description: The swagger API specification

consumes:
  - application/json
produces:
  - application/json


definitions:
  ExampleBody:
    type: object
    title: example
    required:
      - name
    properties:
      name:
        type: string
        example: no_stress

paths:
  /examples:
    get:
      tags:
        - Examples
      description: Fetch all examples
      responses:
        200:
          description: Returns all examples
    post:
      tags:
        - Examples
      description: Create a new example
      parameters:
        - name: example
          in: body
          description: an example
          required: true
          schema: 
            $ref: "#/definitions/ExampleBody"
      responses:
        200:
          description: Returns all examples

  /examples/{id}:
    get:
      tags:
        - Examples
      parameters:
        - name: id
          in: path
          required: true
          description: The id of the example to retrieve
          type: integer
      responses:
        200:
          description: Return the example with the specified id
        404:
          description: Example not found

  /spec:
    get:
      tags:
        - Specification
      responses:
        200:
          description: Return the API specification
```

#### Invoke a POST request via the Interactive doc

![](https://raw.githubusercontent.com/cdimascio/generator-colco-microservice/master/assets/interactive-doc.png)

### Linting

colco-microservice uses [ESLint](http://eslint.org/) and provides two choices, Airbnb or Prettier.

To add your own ESLint customizations, edit`.eslintrc.json`.

Note that the Airbnb variant provides a slightly modified Airbnb [base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) configuration.

## FAQs

**Q**: What about Node.js 6.x?

**A**:`generator-colco-microservice` now uses Babel 7. Babel 7 tooling requires Node.js 8 or greater. To use `generator-colco-microservice` with Node.js 6, install version 3.5.4.

```shell
npm install -g yo generator-colco-microservice@3.5.4
```

## License

[MIT](LICENSE)
