# PDF CREATOR GUIDELINE
## CLI PDF CREATOR USING ADOBE DC SERVICE SDK
### pdf_creator.js 
### Files are in the cli-app-dc-service-sdk folder

In this project, Nodejs is used to implement the adobe DC service SDK and I used process.argv to get the cli arguments. I compiled the nodejs app and made executable files to work on different Operating Systems.

- pdf_creator-win   : For Windows Users
- pdf_creator-linux : For Linux Users
- pdf_creator-macos : For MacOs Users

## Tools Needed 
- Nodejs 
- npm

## Install nodejs pdf_creator app modules (optional)
- type the command line `npm install` in the project directory, after this you can deploy app using node

## Converting From Static HTML Page to PDF

### For Windows

1. Open Command Prompt software from the start menu or press down windows key and R key and type cmd and then press OK.
2. Navigate to the project directory if not already in there, or if pdf_creator-win is not on the evironmental variable path.
3. Type in the command pdf_creator-win <Path Of Static HTML site> <Path of the PDF to be created>

### For Linux

1. Open Terminal by pressing Ctrl + Alt + T on the keyboard or search for the Terminal in the programs menu
2. Navigate to the project directory if not already there
3. Type in the command pdf_creator-linux <Path Of Static HTML site> <Path of the PDF to be created>

### For MacOs

1. Open Applications folder, then open utilities, then double click on Terminal, alternatively press command key + space bar to launch spotlight and type Terminal
2. Navigate to the project directory if not already there
3. Type in the command pdf_creator-linux <Path Of Static HTML site> <Path of the PDF to be created>

