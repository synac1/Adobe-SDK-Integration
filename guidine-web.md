# GUIDELINE TO EMBED PDF VIEWER ON HTML WEB PAGE
### Files are in the web-page-dc-view-sdk folder
#### The web page I created is using Plain HTML, CSS, and JavaScript

To open we can simply double click on the index.html file.

## Opening a pdf file

1. Click on Choose File, pick a pdf file
2. After the file is loaded, user is able to download, print, and copy text and more

## Choosing different Embed Modes

1. Once the pdf file is loaded in the viewer, we can select different modes
2. Click on Choose View Mode or sandwich icon, select your preferred embed mode
3. With Sized Container mode It will be displayed on the size of its container, 
I made the container resizable, so the user can choose the size of the display.

## Tracking data on Google Analytics

To be able to view data on Google analytics, users must provide with Tracking id. 
User must edit the index.js file, and update `ga('create', 'CLIENT_ID', 'auto');` 
by replacing `CLIENT_ID`  with the tracking_id generated on google analytics.

Events recordered are DOCUMENT_OPEN, PAGE_VIEW, DOCUMENT_DOWNLOAD, TEXT_COPY

## VIEW SDK CREDENTIALS

PDF view works properly on the local machine no credentials needed, if user desires
to host the Web page online user must provide their DC View SDK credentials which 
is going to be linked with the domain name of where the files are going to be hosted at.
User can replace `[clientId]` with user's own view credentials API Key[SDK Credentials](https://www.adobe.io/apis/documentcloud/dcsdk/gettingstarted.html)

	adobeDCView = new AdobeDC.View({
	        /* Pass your registered client id */
	        clientId: "[clientId]",
	        /* Pass the div id in which PDF should be rendered */
	        divId: id_div,
	    });

## VIDEO
[Demo Video](https://youtu.be/UbaQnxPQfko)
