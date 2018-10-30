'use strict';
const fs = require('fs');
const Generator = require('yeoman-generator');
const path = require('path');
const yaml = require('js-yaml');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.argument('appname', { type: String, required: false });

    this.name = this.options.appname || 'ck-microservicio';
    this.description = 'microservicio col-comercio';
    this.version = '1.0.0';
    this.apiRoot = '/colco/api';
    this.swaggerPath = __dirname;
  }

  initializing() {}

  prompting() {
    const prompts = [
      {
        type: 'input',
        name: 'description',
        message: `              Descripción del servicio                \nQuién solicita, para lograr que objetivo de negocio y que ejecuta el servicio [${this.description}]:`,
      },
     /* {
        type: 'input',
        name: 'apiRoot',
        message: `Path Base del API= Debe adoptar el contexto de negocio (área o línea de negocio) [Ejemplo ${this.apiRoot}]:`,
      },
     */
      {
        type: 'input',
        name: 'apiVersion',
        message: `Version [${this.version}]:`,
      },
      {
        type: 'input',
        name: 'swaggerPath',
        message: `Path del swagger a cargar [c:/users/username/...]:`,
      },
    ];

    if (!this.options.appname) {
      prompts.unshift({
        type: 'input',
        name: 'name',
        message: `Nombre del microservicio [${this.name}]:`,
      });
    }  

    return this.prompt(prompts).then(r => {
      this.swaggerPath = r.swaggerPath ? r.swaggerPath : this.swaggerPath;

      const source_swgp_path = this.swaggerPath;
      console.log('#######################################: ',source_swgp_path);    
      if (source_swgp_path.includes('.yaml')) {  
        if (fs.existsSync(source_swgp_path)) {
          const rootBasePath = yaml.safeLoad(fs.readFileSync(source_swgp_path, 'utf8'));
          this.apiRoot = rootBasePath.basePath;
          console.log('PATH BASE : ', this.apiRoot);    
        }
      }  

      this.name = r.name ? r.name : this.name;
      this.description = r.description ? r.description : this.description;
      this.version = r.version ? r.version : this.version;
      this.apiRoot = r.apiRoot ? r.apiRoot.replace(/^\/?/, '/') : this.apiRoot;
      this.linter = 'airbnb';
    });
  }

  configuring() {}

  default() {}

  get writing() {
    return {
      appStaticFiles() {
        const src = this.sourceRoot();
        const dest = this.destinationPath(this.name);

        const files = [
          'package.json',
          'README.md',
          '.env',
          '.eslintrc.json',
          'server/routes.js',
          'test/examples.controller.js',
          'server/common/swagger/Api.yaml',
          'public/api-explorer/index.html',
          'public/api-explorer/swagger-ui-standalone-preset.js',
          'public/index.html',
          '.vscode/launch.json',
          'server/api/controllers/ck/controller.js',
          'deploy/prd/Deployment.yml',
          'deploy/prd/Service.yml',
          'deploy/qa/Deployment.yml',
          'deploy/qa/Service.yml',
          'gitignore',
          '.dockerignore',
          'Dockerfile',
          'docker-compose.yml',
        ];

        const copyOpts = this.docker
          ? null
          : {
              globOptions: {
                ignore: ['**/+(Dockerfile|.dockerignore)'],
              },
            };

        this.fs.copy(src, dest, copyOpts);
        this.fs.copy(this.templatePath('.*'), dest, copyOpts);
    
        const opts = {
          name: this.name,
          title: this.name,
          description: this.description,
          version: this.version,
          apiRoot: this.apiRoot,
          linter: this.linter,
          swaggerPath: this.swaggerPath,
          ocNamespacePRD: 'prd',
          ocNamespaceQA: 'qa',
          
        };

        files.forEach(f => {
          this.fs.copyTpl(
            this.templatePath(f),
            this.destinationPath(`${this.name}/${f}`),
            opts
          );
        });
        
        this.fs.move(
          this.destinationPath(`${this.name}`, 'gitignore'),
          this.destinationPath(`${this.name}`, '.gitignore')
        );

      },
    };
  }

  conflicts() {}

  install() {
    const appDir = path.join(process.cwd(), this.name);
    process.chdir(appDir);
    if (this.useYarn) {
      this.yarnInstall();
    } else {
      this.npmInstall();
    }
  }

  end() {
    const source_swgp_path = this.swaggerPath;    
    const dest_swg_path = this.destinationPath(`${this.name}/server/common/swagger/Api.yaml`);             
    
//    console.log('PATH ORIGEN ',source_swgp_path, fs.existsSync(source_swgp_path));
//    console.log('PATH DESTINO ',dest_swg_path, fs.existsSync(dest_swg_path));

    if (source_swgp_path.includes('.yaml')) {  
      if (fs.existsSync(source_swgp_path)) {
        fs.copyFileSync(source_swgp_path, dest_swg_path);
      }
    }


    if (this.useYarn) {
      this.spawnCommandSync('yarn', ['dev']);
    } else {
      this.spawnCommandSync('npm', ['run', 'dev']);
    }
  }
};
