const WURL = `https://www.metaweather.com/api//api/location/search/?query=`;
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const MURL = `https://developers.themoviedb.org/3/configuration/get-api-configuration`;
const XKCD_PREFIX = `https://xkcd.com/`;
const XKCD_SUFFIX = `info.0.json`;
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
   $(".xkcd-api").html(`
   	<div>
   	    <p>XKCD Cartoon ${res.num}: ${res.title}</p>
   	    <img src=${res.img} alt=${res.alt}></img>
    </div>
   	`);
}

function getApi1(cartoonNumber) {
	console.log( cartoonNumber );
	let url = "";
	if (cartoonNumber == 0) {
		url = XKCD_PREFIX + XKCD_SUFFIX;
	} else {
		url = XKCD_PREFIX + cartoonNumber + '/' + XKCD_SUFFIX;
	}

	$.ajax({
		   type : "GET",		   
		   url : url,
		   success : displayResults1,
	});
}

function displayResults2(res) {
   $(".dog-api").html(`
   	<img src=${res.message} alt="a dog photo"></img>
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
   $(".cat-api").html(`
   	<img src=${res} alt="a cat photo"></img>
   	`);
}

function getApi3(statusCode) {
	console.log( statusCode );

	$.ajax({
		   type : "GET",		   
		   url : CAT_URL_PREFIX + statusCode,
		   success : displayResults3,
	});
}

function displayResults5(res) {
	console.log("I was here");
   $(".money-api").html(`
   	<p>base : ${res.base}</p>
   	<p>date : ${res.date}</p>
   	<p>CAD : ${res.rates.CAD}</p>
   	<p>CHF : ${res.rates.CHF}</p>
   	<p>EUR : ${res.rates.EUR}</p>
   	<p>GBP : ${res.rates.GBP}</p>
   	`);
}

function getApi5() {

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
	console.log("The symbol is: " + symbol);

	$.ajax({
		   type : "GET",		   
		   url : STOCKS_URL_PREFIX + symbol + STOCKS_URL_SUFFIX,
		   success : displayResults6,
	});
}

function main() {
	$(".js-form1").submit(event => {
		event.preventDefault();
		let $cartoon = $(".js-num").val();
		console.log("cartoon number is: " + $cartoon);
		getApi1($cartoon);
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