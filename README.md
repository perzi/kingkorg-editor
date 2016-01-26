# KingKORG Editor
An editor for KingKORG using WebMIDI

## Commands
* `npm run build` - Build the project
* `npm run start` - Start the Webpack dev server


# Notes about KingKORG MIDI implementation

The documentation has some errors

* OSC Type refers to *4-1 but that is the unison sw option

* *T10-4 has values in brackets [x] where all other tables are without
  And missing : after 8

* Global reference tables are noted *T09-x and should be *T10-x. As virtual patch is table 9
