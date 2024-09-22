# Nest + typescript + mongodb 

## Getting Started

```
git clone https://github.com/afaqrajpoot/auth-boilerplate.git
cd server
npm install
npm run start:dev
```


## Features

- Nest  
- TypeScript
- Mongodb
- Auth Setup
- Custom Password validation
- Morgan ( Logger )

## Project Structure
```
└── 📁src
│   ├── 📁interceptors
│   │   └── transform.interceptor.ts
│   ├── 📁modules
│   │   ├── 📁app
│   │   │   ├── app.module.ts
│   │   │   ├── app.roles.ts
│   │   │   └── app.service.ts
│   │   ├── 📁auth
│   │   │   ├── 📁payload
│   │   │   │   ├── login.payload.ts
│   │   │   │   └── register.payload.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   └── jwt.strategy.ts
│   │   ├── 📁config
│   │   │   ├── config.module.ts
│   │   │   └── config.service.ts
│   │   └── 📁profile
│   │       ├── 📁payload
│   │       │   └── patch.profile.payload.ts
│   │       ├── profile.controller.ts
│   │       ├── profile.model.ts
│   │       ├── profile.module.ts
│   │       └── profile.service.ts
│   └── main.ts
├── .dockerignore
├── .env
├── .env.example
├── .eslintrc.js
├── .prettierrc
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── nodemon-debug.json
├── nodemon.json
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.build.json
├── tsconfig.json
├── tsconfig.spec.json
├── tslint.json
└── yarn.lock
```