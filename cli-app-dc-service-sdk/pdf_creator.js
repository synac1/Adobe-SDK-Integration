#!/usr/bin/env node
/*
 * Copyright 2019 Adobe
 * All Rights Reserved.
 *
 * NOTICE: Adobe permits you to use, modify, and distribute this file in
 * accordance with the terms of the Adobe license agreement accompanying
 * it. If you have received this file from a source other than Adobe,
 * then your use, modification, or distribution of it requires the prior
 * written permission of Adobe.
 */

const DCServicesSdk = require('@adobe/dc-services-node-sdk');

var cliArgs = process.argv.slice(2); //command line arguments and remove the first two elements (node, )
const inputFile = cliArgs[0]; //first argument is the html file
const outputFile = cliArgs[1]; // second argument is the pdf file 

/**
 * Sets any custom options for the operation.
 *
 * @param htmlToPDFOperation operation instance for which the options are provided.
 */
const setCustomOptions = (htmlToPDFOperation) => {
    // Define the page layout, in this case an 8 x 11.5 inch page (effectively portrait orientation).
    const pageLayout = new DCServicesSdk.CreatePDF.options.PageLayout();
    pageLayout.setPageSize(8, 11.5);

    // Set the desired HTML-to-PDF conversion options.
    const htmlToPdfOptions = new DCServicesSdk.CreatePDF.options.html.CreatePDFFromHtmlOptions.Builder()
        .includesHeaderFooter(true)
        .withPageLayout(pageLayout)
        .build();
    htmlToPDFOperation.setOptions(htmlToPdfOptions);
};


try {
    // Initial setup, create credentials instance.
    const credentials =  DCServicesSdk.Credentials
        .serviceAccountCredentialsBuilder()
        .fromFile("dc-services-sdk-credentials.json")
        .build();

    // Create an ExecutionContext using credentials and create a new operation instance.
    const executionContext = DCServicesSdk.ExecutionContext.create(credentials),
        htmlToPDFOperation = DCServicesSdk.CreatePDF.Operation.createNew();

    // Set operation input from a source file.
    const input = DCServicesSdk.FileRef.createFromLocalFile(inputFile);
    htmlToPDFOperation.setInput(input);

    // Provide any custom configuration options for the operation.
    setCustomOptions(htmlToPDFOperation);

    // Execute the operation and Save the result to the specified location.
    htmlToPDFOperation.execute(executionContext)
        .then(result => result.saveAsFile(outputFile))
        .catch(err => {
            if(err instanceof DCServicesSdk.Error.ServiceApiError
                || err instanceof DCServicesSdk.Error.ServiceUsageError) {
                console.log('Exception encountered while executing operation', err);
            } else {
                console.log('Exception encountered while executing operation', err);
            }
        });

} catch (err) {
    console.log('Exception encountered while executing operation', err);
}
