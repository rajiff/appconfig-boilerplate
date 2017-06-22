## Managing configuration variables/parameters for Node.js applications
Every programing language deals with configuration settings
Languages like JAVA, .NET ... have standard way of dealing with it like `.properties`, `web.config`, `app.config` file

> In Node.js it is left for developer to define this, hence there is no one standard way

Below is a simply way to maintain the configs, without using any external library for the same, as you never know with what objective they were designed and how they internally change/manage these settings.

You can refer some of these if you wish to
- [.ENV](https://www.npmjs.com/package/dotenv)
- [Config](https://www.npmjs.com/package/config)
- [Convict](https://www.npmjs.com/package/convict)

### Environment aware configuration
Maintaining configuration by environment, eases process of release & test automation, it will also make developers testing locally easy and separate it from other developers

This is must, if you are following a [Docker](http://docker.com/) based deployments in a [CI](https://martinfowler.com/articles/continuousIntegration.html) & [CD](https://martinfowler.com/bliki/ContinuousDelivery.html) environment

### How do we do it
Keep a module, which provides the configurations for your app, the modules ensures configuration is picked up automatically based on the environment, your application is running

For this you need to set the current environment in a environment variable `NODE_ENV`, this is almost standard environment variable all Node.js apps follow

you can set this environment in a **Linux/Unix** as
- `export NODE_ENV=development`
- `export NODE_ENV=production`
- `export NODE_ENV=test`

you can set this environment on **WINDOWS** as
- `set NODE_ENV=development`
- `set NODE_ENV=production`
- `set NODE_ENV=test`

I usually set this int he `~/.bash_profile` of the user account in which app is started, so that this is not missed ignorantly, you cannot be at your best every time :-)

You can read about how NODE_ENV changes run time dynamics of Node [here](https://www.dynatrace.com/blog/the-drastic-effects-of-omitting-node_env-in-your-express-js-applications/)


#### App config module
Below is how the files can be organized in node module style

	src/appconfig/
		├── appconfig.js
		├── env
		│   ├── DEV.js
		│   ├── PROD.js
		│   └── TEST.js
		└── index.js

appconfig is the consolidating module file. Inside `env` folder, you maintain environment specific configurations

These config settings are picked up from Environment variable with a default fall back value specified

i.e., in the below example config setting, PORT is taken from environment if not set, a default value 3000 is supplied.

	let config = { PORT: process.env.PORT || 3000 }

If you wish not to override the config settings from enviornment you can simply use it like this

	let config = { PORT: 3000 }

This is same for any config setting

now you can include this module, wherever is needed and use

For detailed code, please check [this](https://github.com/rajiff/appconfig-boilerplate) repository

### Few Do's and Don'ts
- Don't commit sensitive data into same repository as your code, if required, they can be maintained only in environment variables/scipts, only the format can be committed with some sample data
- Keep only a single configuration files for your app, avoid maintaining multiple
- Include test cases to test configuration settings are used by your application code
- Keep the config file name to lowercase and avoid mis-reading the configurations, when app is running across platforms (Win/Unix/Mac/Linux ...)
