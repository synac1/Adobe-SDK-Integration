(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'CLIENT_ID', 'auto');
ga('send', 'pageview');

	function openNav() {
	  document.getElementById("mySidenav").style.width = "250px";
	}

	function closeNav() {
	  document.getElementById("mySidenav").style.width = "0";
	}



adobeDCView=""
filePromise="";
fileName= "";
emb_mode="IN_LINE";
id_div  ="adobe-dc-view-full";
function setFullWin(){
	emb_mode = "FULL_WINDOW";
	id_div= "adobe-dc-view-full";
	console.log("full window")
	document.getElementById("dummy-paragraph").style.display="none";
	document.getElementById("adobe-dc-view-full").style.display="block";
	document.getElementById("adobe-dc-view-inline").style.display="none";
	document.getElementById("adobe-dc-view-sizedCon").style.display="none";
	previewFile(fPromise, fName);
}
function setInline(){
	emb_mode = "IN_LINE";
	console.log("inline")
	id_div= "adobe-dc-view-inline";
	document.getElementById("adobe-dc-view-full").style.display="none";
	document.getElementById("adobe-dc-view-inline").style.display="block";
	document.getElementById("adobe-dc-view-sizedCon").style.display="none";
	document.getElementById("dummy-paragraph").style.display="block";

	 previewFile(fPromise, fName);
}
function setSizedCon()
{
	emb_mode = "SIZED_CONTAINER";
	console.log("setSizedCon")
	id_div= "adobe-dc-view-sizedCon";
	document.getElementById("dummy-paragraph").style.display="none";
	document.getElementById("adobe-dc-view-full").style.display="none";
	document.getElementById("adobe-dc-view-inline").style.display="none";
	document.getElementById("adobe-dc-view-sizedCon").style.display="block";
	previewFile(fPromise, fName);
}



 viewerConfig = {
 	defaultViewMode: "FIT_PAGE",
    embedMode: emb_mode,
    showAnnotationTools: true,
    showDownloadPDF: true,
    showPrintPDF: true,
    dockPageControls: true,
  };


	/* Helper function to render the file using SDK. */
	function previewFile(filePromise, fileName) {
	    /* Initialize the AdobeDC View object */
	   adobeDCView = new AdobeDC.View({
	        /* Pass your registered client id */
	        clientId: "[clientId]",
	        /* Pass the div id in which PDF should be rendered */
	        divId: id_div,
	    });
	    console.log(emb_mode);

	    /* Invoke the file preview API on Adobe DC View object */
	    adobeDCView.previewFile({
	        /* Pass information on how to access the file */
	        content: {
	            /* pass file promise which resolve to arrayBuffer */
	            promise: filePromise,
	        },
	        /* Pass meta data of file */
	        metaData: {
	            /* file name */
	            fileName: fileName
	        }
	    },viewerConfig);


	adobeDCView.registerCallback(
        /* Type of call back */
        AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
        /* call back function */
        function(event) {
            switch(event.type) {
               
       
                case "DOCUMENT_OPEN":
	                ga('send', 'event', 'DOCUMENT_OPEN', event.data.fileName, 'open document');
	                console.log("Opened document.");
	                console.log(event);
	                break;

                case "PAGE_VIEW":
	  				ga('send', 'event', 'PAGE_VIEW', event.data.fileName, 'page view');
	                console.log("Viewing page "+event.data.pageNumber+" of "+event.data.fileName);
	                console.log(event);
	                break;
              
                case "DOCUMENT_DOWNLOAD":
	              	ga('send', 'event', 'DOCUMENT_DOWNLOAD', event.data.fileName, 'Downloading document');
	                console.log("Downloading document "+event.data.fileName);
	                console.log(event);
	                break;
	     
                case "TEXT_COPY":
	                ga('send', 'event', 'TEXT_COPY', event.data.fileName, 'copied text');
	                console.log("Copied text: '"+event.data.copiedText+"'");
	                console.log(event);    
	                break;
 
            }
        },
        {
            enablePDFAnalytics: true,
        }
        );
	}

    



	/* Helper function to check if selected file is PDF or not. */
	function isValidPDF(file) {
	    if (file.type === "application/pdf") {
	        return true;
	    }
	    if (file.type === "" && file.name) {
	        var fileName = file.name;
	        var lastDotIndex = fileName.lastIndexOf(".");
	        return !(lastDotIndex === -1 || fileName.substr(lastDotIndex).toUpperCase() !== "PDF");
	    }
	    return false;
	}

	/* Helper function to listen for file upload and
	 * creating Promise which resolve to ArrayBuffer of file data.
	 **/
	function listenForFileUpload() {
		console.log("listenForFileUpload");
	    var fileToRead = document.getElementById("file-picker");
	    fileToRead.addEventListener("change", function (event) {
	        var files = fileToRead.files;
	        if (files.length > 0 && isValidPDF(files[0])) {
	            fName = files[0].name;
	            var reader = new FileReader();
	            reader.onloadend = function (e) {
	            fPromise = Promise.resolve(e.target.result);
	                previewFile(fPromise, fName);
	            };
	            reader.readAsArrayBuffer(files[0]);
	        }
	    }, false);
	}
