# ECG-NN-Browser

Components to apply a neural net for classification in a web browser.

## Installation

1. Run `npm install` to install dependencies.
2. Start up the `gulp` task in a terminal to boot a local server.
3. Head over to `localhost:8080` to run classification in the browser.

*Note:* When updating the code the `gulp` task need to be re-run as no live reload is currently in use.

## Changing the classification library

The file `index.js` defines a constant named `model`. 
Comment / uncomment either the module using KerasJS or WebDNN.