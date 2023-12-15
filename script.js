const progressbarcontent = document.querySelector('.progress-bar-content');
const buttonReturn = document.querySelector('.btn_return');
const buttonMenu = document.querySelector('.menu_button');
const hiddenMenu = document.querySelector('.menu_container');
const crossMenu = document.querySelector('#menuOpened');
const barsMenu = document.querySelector('#menuClosed');
const popUp = document.querySelector('.popUp')
const popUpContainer = document.getElementById('popUp_container')
const popUpMessage = document.getElementById('popUp_confirmMessage')
const name = document.getElementById('name')
const email = document.getElementById('email')
const emailPopup = document.getElementById('emailPop')
const checkbox = document.getElementById('checkbox')
const menu = document.querySelector('.menu')
const buttonSubscribe = document.querySelector('.subscribe_btn')
let price1 = document.getElementById('priceVal1')
let price2 = document.getElementById('priceVal2')
let price3 = document.getElementById('priceVal3')
		

let dropdown = false;

window.addEventListener('scroll', function(){

	let body = document.documentElement;

	let scrollT = body.scrollTop || document.body.scrollTop;
	let scrollH = body.scrollHeight || document.body.scrollHeight;

	let percent = scrollT / (scrollH - body.clientHeight) * 100;
	let roundPercent = Math.round(percent);

	progressbarcontent.style.width = percent + '%';

	if(roundPercent === 25){
		showPopup();
	}

	//console.log(roundPercent);
})	


function topReturn() {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 

}

buttonMenu.addEventListener('click', function(){
	console.log('dropdown menu');
});

function menuDrop(){

	if(!dropdown){

		hiddenMenu.classList.remove('hidden');
		crossMenu.classList.remove('hidden');
		barsMenu.classList.add('hidden');
		menu.classList.add('height12')
		dropdown = true;
	}else{
		hiddenMenu.classList.add('hidden');
		crossMenu.classList.add('hidden');
		barsMenu.classList.remove('hidden');
		menu.classList.remove('height12')
		dropdown = false;
	}
	
}

function showPopup(){
		if(localStorage.getItem('popup') == 'false'){
			
			console.log('no publi!')
		}else{
			popUp.classList.remove('hidden');
		}
	
}

//setTimeout("showPopup()", 5000);

setTimeout(()=>{showPopup()},5000)


function closePopup(){
	popUp.classList.add('hidden');
	localStorage.setItem('popup', false);
}

document.addEventListener('keydown', function(event) {
    const key = event.key; 
    if (key === "Escape") {
        closePopup();
    }
});


/*document.getElementsByTagName("body")[0].addEventListener('click', function() {
	//console.log('clicked') 
	closePopup(); 
});
*/  /* Si clickeo en el modal, tambien se cierra, hay que revisarlo*/

function validateInput(event){
			let input = event.target;
			let div = input.parentElement;
			let patron = "";
			switch(input.id){

				/*case "name":
				patron = /^[\p{Z}\s]*(?:[^\p{Z}\s][\p{Z}\s]*){2,100}$/   */

				case "email":
				patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				
				case "emailPop":
				patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				break;

			}

			let correct = input.value.match(patron);
			if(correct){
				console.log('correcto');
				input.style.borderColor ='#08A6E4';
			}else{
				console.log('incorrecto');
				input.style.borderColor ='red';
			}	

			if(name.value.length < 2 || name.value.length > 100){
				console.log('incorrecto');
				name.style.borderColor ='red';
			}else{
				console.log('correcto');
				name.style.borderColor ='#08A6E4';
			}
		}

		

		function validateForm(event){
			
			if(checkbox.checked){
				console.log('checkbox checked');
				postData();
				alert('Thank you for your time!')
				name.value = '';
				name.style.borderColor = '#95989A'
				email.value = '';
				email.style.borderColor = '#95989A'
				checkbox.checked = false;
			}else{
				console.log('checkbox is not checked');
				alert("To continue you have to check the checkbox!");
			}
			


			event.preventDefault();
		}

		function subscribePop(event){
			popUpContainer.classList.add('hidden');
			popUpMessage.classList.remove('hidden');
			event.preventDefault();
			postDataPop();
			//alert('Thank you, your data its safe now')
			emailPopup.value = '';
			emailPopup.style.borderColor = '#95989A'
		}

		/*buttonSubscribe.addEventListener('click', function(){

			event.preventDefault();
		});*/


		name.onchange = validateInput;
		email.onchange = validateInput;
		emailPopup.onchange = validateInput;


		/*slider*/

		let slidePosition = 1;
		SlideShow(slidePosition);

		// forward/Back controls
		function plusSlides(n) {
		  SlideShow(slidePosition += n);
		}

		//  images controls
		function currentSlide(n) {
		  SlideShow(slidePosition = n);
		}

		function SlideShow(n) {
		  let i;
		  let slides = document.getElementsByClassName("Containers");
		  let circles = document.getElementsByClassName("dots");

		  if (n > slides.length) {
		  	slidePosition = 1
		  }

		  if (n < 1) {
		  	slidePosition = slides.length
		  }

		  for (i = 0; i < slides.length; i++) {

		      slides[i].style.display = "none";
		  }
		  for (i = 0; i < circles.length; i++) {

		      circles[i].className = circles[i].className.replace(" enable", "");
		  }

		  slides[slidePosition-1].style.display = "block";
		  circles[slidePosition-1].className += " enable";
		} 




		/*function postData(data) {
		  fetch('https://jsonplaceholder.typicode.com/posts/1', {
		    method: 'POST', 
		    body: JSON.stringify(data), 
		    headers:{
		      'Content-type': 'application/json; charset=UTF-8',
		    },
		  })
		  .then(response => response.json())
		  .then(data => console.log(data));
		}

		const data = {username: name.value, email: email.value};*/

		function postData(){
			fetch('https://jsonplaceholder.typicode.com/posts', {
			  method: 'POST',
			  body: JSON.stringify({
			    username: name.value,
			    useremail: email.value,
			  }),
			  headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		  },
		})
		  .then((response) => response.json())
		  .then((json) => console.log(json));

		}																					/*Parece que la id se sobreescribe */

		function postDataPop(){
			fetch('https://jsonplaceholder.typicode.com/posts', {
			  method: 'POST',
			  body: JSON.stringify({
			    useremail: emailPopup.value,
			  }),
			  headers: {
		    'Content-type': 'application/json; charset=UTF-8',
		  },
		})
		  .then((response) => response.json())
		  .then((json) => console.log(json));

		}
		


		 function getCoinValue(selectObject){
		 	//let result1 
		 	//let result2


			if(selectObject.value == 'usd'){
				console.log('USD$')
				calcCoin(25,"usd")
				calcCoin(60,"usd")
				price1.innerHTML = "$" + "0"
				//price2.innerHTML = "$" +  calcCoin(25, "usd")//25 * 1.08917103 = 27.22927575 = 27
				//price3.innerHTML = "$" + "60"  //60 * 1.08917103 = 65.3502618 = 65
				

			}else if(selectObject.value == 'eur'){
				console.log('EUR€')
				calcCoin(25,"eur")
				calcCoin(60,"eur")
				price1.innerHTML = "€" + "0"
				//price2.innerHTML = "€" + calcCoin(25, "eur") // 25 * 1
				//price3.innerHTML = "€" + "60"  //60 * 1 
			}else if(selectObject.value == 'gbp'){
				console.log('GBP£')
				calcCoin(25,"gbp")
				calcCoin(60,"gbp")
				price1.innerHTML = "£" + "0"
				//price2.innerHTML = "£" + calcCoin(25, "gbp") //25 * 0.86212713 = 21.55317825 = 22
				//price3.innerHTML = "£" + "60" // 60 * 0.86212713 = 51.7276278 = 52
			}

		}


		function calcCoin(initialValue,currency){
			fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
			  .then((response) => response.json())
			  .then((json) => {
			  	let dataArray = json.eur
			  	let gbp = dataArray.gbp
			  	let usd = dataArray.usd
			  	let eur = dataArray.eur
			  	let finalValue

			  	if(initialValue === 25){
			  		if(currency == "usd"){
				  		finalValue = initialValue * usd
				  		price2.innerHTML = "$" +  Math.round(finalValue)
				  	}else if(currency == "eur"){
				  		finalValue = initialValue * eur
				  		price2.innerHTML = "$" +  Math.round(finalValue)

				  	}else if ( currency == "gbp"){
				  		finalValue = initialValue * gbp
				  		price2.innerHTML = "$" +  Math.round(finalValue)
				  		
				  	}

			  	}else if(initialValue === 60){
			  		if(currency == "usd"){
				  		finalValue = initialValue * usd
				  		price3.innerHTML = "$" +  Math.round(finalValue)
				  	}else if(currency == "eur"){
				  		finalValue = initialValue * eur
				  		price3.innerHTML = "$" +  Math.round(finalValue)

				  	}else if ( currency == "gbp"){
				  		finalValue = initialValue * gbp
				  		price3.innerHTML = "$" +  Math.round(finalValue)
			  		
			  		}
			  	}


			  	/*console.log(gbp)
			  	console.log(usd)
			  	console.log(eur)*/
			  	/*if(currency == "usd"){
			  		finalValue = initialValue * usd
			  	}else if(currency == "eur"){
			  		finalValue = initialValue * eur
			  	}else if(currency == "gbp"){
			  		finalValue = initialValue * gbp
			  	}
			  	let finalValueRound = Math.round(finalValue)
			  	//console.log(finalValueRound)
			  	return finalValueRound*/

			 	});

		}

		const calcCoinApi = async (initialValue,currency) => {
			const request = await fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
			const json = await request.json()
			let dataArray = json.eur
			let gbp = dataArray.gbp
	  	let usd = dataArray.usd
	  	let eur = dataArray.eur
	  	let finalValue
	  	/*console.log(gbp)
	  	console.log(usd)
	  	console.log(eur)*/
	  	if(currency == "usd"){
	  		finalValue = initialValue * usd
	  	}else if(currency == "eur"){
	  		finalValue = initialValue * eur
	  	}else if(currency == "gbp"){
	  		finalValue = initialValue * gbp
	  	}
	  	let finalValueRound = Math.round(finalValue)
	  	//console.log(finalValueRound)
	  	return finalValueRound
		}


		
