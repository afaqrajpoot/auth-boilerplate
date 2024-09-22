# React + Vite + TypeScript + Shadcn 

## Getting Started

```
git clone https://github.com/afaqrajpoot/auth-boilerplate.git
cd client
npm install
npm run dev
```

## Getting Done

- [x] Single page app with navigation, basic auth setup and responsive layout

- [x] Customable configuration `/config`

- [x] Simple starting page/feature `/pages`


## Features

- React + Vite + TypeScript
- Tailwind CSS
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [shadcn-ui](https://github.com/shadcn-ui/ui/)
- [radix-ui/icons](https://www.radix-ui.com/icons)

## Project Structure

```
react-auth-boilerplate/
├───public
└───src
│   ├───components    # React components
│   │   ├───layouts   # layouts components
│   │   └───ui        # shadcn/ui components
│   │       └───common
│   ├───config        # Config data
│   ├───constants     # Constant Data
│   ├───contexts      # contexts components
│   ├───hooks         # Custom hooks
│   ├───pages         # pages/features components
│   │   ├───Auth
│   │   │   ├───login
│   │   │   └───register
│   │   ├───dashboard
│   │   └───no-match
│   ├───schemas        # Form Schemas
│   │   └───auth       # auth Schemas
│   ├───types          # Custom types
│   └───utils          # Utility functions
│   ├── App.tsx        # Application entry point
│   ├── index.tsx      # Main rendering file
│   └── Router.tsx     # Routes component
├── index.html         # HTML entry point
├── postcss.config.js  # PostCSS configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
├── vite.config.ts     # Vite configuration
├── .env.example       # example env format
├── .gitignore         # gitignore file
├── components.json    # shadcn components json
├── eslint.config.js   # eslint configuration
├── package-lock.json  # lock file 
├── package.json       # Package json
├── README.md          # Readme itself
├── tsconfig.json      # ts compiler configuration
└── tsconfig.node.json # ts node config
```