## Printocracy Web
This is the ReactJS web app for Printocracy.

### Loose coventions
Eslint should handle the majority of conventions but please also [read this](https://gist.github.com/chiedojohn/50f5cf4e900523e24586)

### Setup
Environment variables can be overriden with a standard .env file

### Development
A lot can be learned just by looking at the package.json but in a nutshell, be sure to have Printocracy Rails API running on port 8000 then do the following:

Install packages

  npm install

Run The local server

  npm start

Run the sass watch script

  npm run sass-watch

### Notes
Note that in development, a hot loader is setup so as you make changes, the javascript will automatically update without you refreshing the page. Pay attention tothe console though as you may need to do a manual refresh on ocassions.

### Requirements
- Node 4.2 (install with nvm if needed)

### Deployment to staging

  npm run build

  git push staging master