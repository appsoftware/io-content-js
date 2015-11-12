function ContentClient() {

	// Detect IE

	var ie = (function () {

		var undef,
			v = 3,
			div = document.createElement('div'),
			all = div.getElementsByTagName('i');

		while (

			div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
			all[0]
		);

		return v > 4 ? v : undef;

	}());

	function endsWithChar(input, c) {

		return input != null ? input.indexOf(c, input.length - 1) !== -1 : false;
	};

	// Cross browser send cross domain request

	var sendRequest = function (url, contentClientBaseParameters, callback, postData) {

		if (ie < 10) {

			// IE 8 / 9 supports cross domain requests, but only
			// via the XDomainRequest object.

			var xdr = new XDomainRequest();
			xdr.open('GET', url);

			xdr.onprogress = function () { };
			xdr.ontimeout = function () { };
			xdr.onerror = function () { };
			xdr.onload = function () {
				callback(xdr.responseText);
			}

			setTimeout(function () {

				xdr.send();

			}, 0);

		}
		else {

			var xhr = createXmlHttpObject();

			if (!xhr) return;

			var method = 'GET';

			xhr.open(method, url, true);

			xhr.onreadystatechange = function () {

				if (xhr.readyState != 4) return;
				if (xhr.status != 200 && xhr.status != 304) {

					return;
				}

				callback(xhr.response);
			}

			if (xhr.readyState == 4) return;

			xhr.send(postData);
		}
	}

	var xmlHttpFactories = [

		function () { return new XMLHttpRequest(); },
		function () { return new ActiveXObject('Msxml2.XMLHTTP'); },
		function () { return new ActiveXObject('Msxml3.XMLHTTP'); },
		function () { return new ActiveXObject('Microsoft.XMLHTTP'); }
	];

	var createXmlHttpObject = function () {

		var xmlhttp = false;

		for (var i = 0; i < xmlHttpFactories.length; i++) {

			try {

				xmlhttp = xmlHttpFactories[i]();
			}
			catch (e) {

				continue;
			}

			break;
		}

		return xmlhttp;
	}

	// Default API version and endpoint do not need specifying
	// when building request. subAccountKey and contentType
	// must always be specified.
	
	this.contentClientBaseParameters = {

		apiVersion: 'v1.0',
		apiEndPoint: 'https://iocontent.com/',
		subAccountKey: null,
		contentType: null
	};

	this.get = function (query, callback) {

		// Check api endpoint format before creating complete url

		if (!endsWithChar(this.contentClientBaseParameters.apiEndPoint, '/')) {
			this.contentClientBaseParameters.apiEndPoint += '/';
		}

		var url = this.contentClientBaseParameters.apiEndPoint + 'api/' + this.contentClientBaseParameters.apiVersion + '/content/' + this.contentClientBaseParameters.subAccountKey + '/' + this.contentClientBaseParameters.contentType;

		if (query)
		{
			url += ('/?' + query);
		}


		sendRequest(url, this.contentClientBaseParameters, callback);
	}
};

