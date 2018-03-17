const WURL = `https://www.metaweather.com/api//api/location/search/?query=`;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const MURL = `https://developers.themoviedb.org/3/configuration/get-api-configuration`;
const XKCD_PREFIX = `https://xkcd.com/`;
const XKCD_SUFFIX = `/info.0.json`;//?callback=?`;
const DOG_URL_PREFIX = `https://dog.ceo/api/breed/`;
const DOG_URL_SUFFIX = `/images/random`;
const CAT_URL_PREFIX = `https://http.cat/`;
const ANIMAL_URL_PREFIX = `https://www.movebank.org/movebank/service/public/json?study_id=`;
const ANIMAL_INDIVIDUALS = `&individual_local_identifiers[]=`;
const ANIMAL_URL_SUFFIX = `&sensor_type=gps`;
const MONEY_URL = `https://data.fixer.io/api/latest`;
const STOCKS_URL_PREFIX = `https://api.iextrading.com/1.0/stock/market/batch?symbols=`;
const STOCKS_URL_SUFFIX = `&types=quote&range=1m&last=5`;

function displayResults1(res) {
    console.log(res.num);
	   let newObj;
	   let text1 = "";
	   let text2 = "";
	   	for (let key in res) {
            newObj = res[key];
            text1 += "<p>res[ " + key + "] = " + newObj + "</p>";
	   	}
	   	for (let key in newObj) {
            text2 += "<p>res[ " + key + "] = " + newObj[key] + "</p>";
	   	}
   $(".xkcd-api").html(`
   	<div>
   	    <p>XKCD Cartoon ${res.num}: ${res.title}</p>
   	    <img src=${res.img} alt=${res.alt}></img>
    </div>
   	`);
   $(".xkcd-api").append(text1 + text2);
}

function getApi1(cartoonNumber, callback) {
	console.log( cartoonNumber );
	let url = "";
	if (cartoonNumber == 0) {
		url = XKCD_PREFIX + XKCD_SUFFIX;
	} else {
		url = XKCD_PREFIX + cartoonNumber + XKCD_SUFFIX;
	}
	console.log("the url is: " + url);
//	$.getJSON(url, callback);
  $.ajax ({
    type          : "GET",
    url           : url,
    dataType      : 'jsonp',
  })
  // Code to run if the request succeeds (is done);
  // The response is passed to the function
  .done(function( res ) {
    console.log(res.num);
	   let newObj;
	   let text1 = "";
	   let text2 = "";
	   	for (let key in res) {
            newObj = res[key];
            text1 += "<p>res[ " + key + "] = " + newObj + "</p>";
	   	}
	   	for (let key in newObj) {
            text2 += "<p>res[ " + key + "] = " + newObj[key] + "</p>";
	   	}
   $(".xkcd-api").html(`
   	<div>
   	    <p>XKCD Cartoon ${res.num}: ${res.title}</p>
   	    <img src=${res.img} alt=${res.alt}></img>
    </div>
   	`);
   $(".xkcd-api").append(text1 + text2);
  })
  // Code to run if the request fails; the raw request and
  // status codes are passed to the function
  .fail(function( xhr, status, errorThrown ) {
    alert( "Sorry, there was a problem!" );
    console.log( "Error: " + errorThrown );
    console.log( "Status: " + status );
    console.dir( xhr );
  })

}

function displayResults2(res) {
   $(".dog-api").html(`
   	<img src=${res.message} alt="a dog photo" height=100 width=100 ></img>
   	`);
}

function getApi2(dogBreed) {
	console.log( dogBreed );

	$.ajax({
		   type : "GET",		   
		   url : DOG_URL_PREFIX + dogBreed + DOG_URL_SUFFIX,
		   success : displayResults2,
	});
}

function displayResults3(res) {
	console.log("I got here" + res);
   $(".cat-api").html(`
   	<p>${res}</p>
   	`);
//   $(".cat-api").html(`
 //  	<img src=${res} alt="a cat photo"></img>
 //  	`);
}

function getApi3(statusCode) {
	let url = CAT_URL_PREFIX + statusCode;
	console.log( statusCode );
	console.log("the url is: " + url);
	displayResults3("Refused to execute script from url because its MIME type ('text/html') is not executable, and strict MIME type checking is enabled.")

//	$.ajax({
//		   type : "GET",		   
//		   url : url,
//         contentType   : "text/html; charset=utf-8",
//		   dataType : "jsonp",
//		   jsonpCallback : 'displayResults3',
//	});
}

function displayResults4(res) {
	   let newObj;
	   let text1 = "";
	   let text2 = "";
	   	for (let key in res) {
            newObj = res[key];
            text1 += "<p>res[ " + key + "] = " + newObj + "</p>";
	   	}
	   	for (let key in newObj) {
            text2 += "<p>res[ " + key + "] = " + newObj[key] + "</p>";
	   	}
   $(".anim-api").html(`
   	    <p>This individual is a ${newObj[0].individual_taxon_canonical_name}</p>
   	`);
 //  	<img src=${res} alt="a tracked animal photo"></img>
 //  	`);
}

function getApi4(study, individual) {
	let url = ANIMAL_URL_PREFIX + study + 
		         ANIMAL_INDIVIDUALS + individual + 
		         ANIMAL_URL_SUFFIX;
	console.log( "Study is: " + study );
	console.log( "Individual is: " + individual );
	console.log("the url is: " + url);

	$.ajax({
		   type : "GET",		   
		   url : url,
		   dataType : "jsonp",
		   jsonpCallback : 'displayResults4',
	});
}

function displayResults5(res) {
    console.log("I was here: " + res);
    let newObj;
    let noAccess = false;
    let text1 = "";
    let text2 = "";
   	for (let key in res) {
        newObj = res[key];
        text1 += "<p>res[ " + key + "] = " + newObj + "</p>";
   	}
   	for (let key in newObj) {
        text2 += "<p>res[ " + key + "] = " + newObj[key] + "</p>";
        if (key == 'type' && newObj[key] == "missing_access_key") {
        	noAccess = true;
        }
   	}
	if (noAccess) {
        text1 = `<p>Missing Access Key</p>`;
        text2 = "";
	}
    $(".money-api").html(text1 + text2);
}

function getApi5() {
    console.log("needs an API access key.");
	$.ajax({
		   type : "GET",		   
		   url : MONEY_URL,
           success : displayResults5,
	});
}

function displayResults6(res) {
	let text = "";
	let stock;

	for (key in res) {
		stock = res[key];
		break;
	}
   text = `<p>The stock symbol is ${stock.quote.symbol}</p>`;
   $(".stock-api").html(text);
}

function getApi6(symbol) {
	let url = STOCKS_URL_PREFIX + symbol + STOCKS_URL_SUFFIX;
	console.log("The symbol is: " + symbol);
	console.log("The url is: " + url);

	$.ajax({
		   type : "GET",		   
		   url : url,
		   success : displayResults6,
	});
}

function main() {

	$(".js-form1").submit(event => {
		event.preventDefault();
		let $cartoon = $(".js-num").val();
		getApi1($cartoon, displayResults1);
	});
	$(".js-form2").submit(event => {
		event.preventDefault();
		let $breed = $(".js-dog").val();
		console.log("dog breed is: " + $breed);
		getApi2($breed);
	});
	$(".js-form3").submit(event => {
		event.preventDefault();
		let $code = $(".js-cat").val();
		console.log("status code is: " + $code);
		getApi3($code);
	});
	$(".js-form4").submit(event => {
		event.preventDefault();
		let $study = $(".js-study").val();
		let $individ = $(".js-individ").val();
		console.log("study and individ are: " + $study + " and " + $individ);
		if ($study == "") {
			$study = '2911040';
		}
		if ($individ == "") {
			$individ = '4262-84830876';
		}
		getApi4($study,$individ);
	});
	$(".js-form5").submit(event => {
		event.preventDefault();
		getApi5();
	});
	$(".js-form6").submit(event => {
		event.preventDefault();
		let $symbol = $(".js-money").val();
		getApi6($symbol);
	});
}

$(main);