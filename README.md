# io-content-js (BETA)

### I/O Content ([https://www.iocontent.com](http://www.iocontent.com)) client helper library

## Introduction

*Please note - I/O Content as a whole is currently in beta. There are still some bugs to be fixed. Official release is expected before the end of November 2015.*

**io-content-js** is a JavaScript client helper library for the I/O Content web API based CMS. This library assists with the fetching of content from [https://www.iocontent.com](http://www.iocontent.com).

**io-content-js** facilitates cross browser Ajax requests compatible down to IE8 along with API endpoint configuration, making it simple to render managed content managed on web pages.

I/O content is platform agnostic and not limited to use with the web. The REST API can also be called directly from mobile and desktop applications. 

## Installation

### Bower

    bower install io-content-js --save

### Manual

A single script file **io-content-min.js** is all that's required for the example below, and can be downloaded from the `/dist` folder at [GitHub](https://github.com/appsoftware/io-content-js "https://github.com/appsoftware/io-content-js").

## Hello World

Here we are going to request a live content entry (the content that is displayed on [I/O Content's 'Introduction'](https://www.iocontent.com/documentation/) documentation page).

Essentially the first step is to create ContentClient and configure the **sub account key** and **content type** for which you are querying. With the query string built, we call `contentClient.get(query, apiCallBack)`, where `apiCallBack` is a function for rendering the content response objects.

```
<script src="/Content/Bower/io-content-js/dist/io-content-min.js" type="text/javascript"></script>

<!-- Placeholder for 'content' field on content array element -->

<div id="content-place-holder"></div>

<script type="text/javascript">

	var apiCallBack = function (responseJson) {

		var responseObj = JSON.parse(responseJson);

		// In JS api, an array of content objects is always returned, even
		// where the query would always limit the result set to a single content entity

		document.getElementById('content-place-holder').innerHTML = responseObj.data[0].content;

		// Set the page title, could also be used to set the contents of an H1 element
		// and update a breadcrumb...

		document.title = responseObj.data[0].title;
	}

	// Create ContentClient and run query against the REST API

	var contentClient = new ContentClient();

	contentClient.contentClientBaseParameters.subAccountKey = 'nfm6dwvsmrd6uukgj3rzdugerc';
	contentClient.contentClientBaseParameters.contentType = 'documentation';

	var query = 'key.equals=gdsahqn2smitegopbrqreb2weg&markdownToHtml=true';

	contentClient.get(query, apiCallBack);

</script>
```
