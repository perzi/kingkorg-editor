# KingKORG Editor
An editor for KingKORG using WebMIDI

## Basic setup by richard-lopes' webpack-example
Example Javascript ES6 project with React, React Router and Flux (Alt)
Read the article related to this project on our UnderTheHood blog: https://underthehood.myob.com/changing-of-the-guard-in-web-technologies/

## Requirements
Make sure you have installed NodeJS and NPM first and that you can run them from the command line.
* Run `npm install` first to install dependencies

## Commands
* `npm run build` - Build the project
* `npm run watch` - Start the Webpack dev server



# Notes about KingKORG MIDI implementation

The documentation has some errors

* OSC Type refers to *4-1 but that is the unison sw option

* *T10-4 has values in brackets [x] where all other tables are without
  And missing : after 8

* Global reference tables are noted *T09-x and should be *T10-x. As virtual patch is table 9
