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
const btnClosePop = document.getElementById('btnPopup')
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

		})	


		buttonReturn.addEventListener('click', function(){
			document.body.scrollTop = 0; 
		  	document.documentElement.scrollTop = 0;

		})

		buttonMenu.addEventListener('click', function(){
			
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
		});


		function showPopup(){
			if(localStorage.getItem('popup') != 'false'){
				popUp.classList.remove('hidden');
			}
			
		}

		setTimeout(()=>{showPopup()},5000)

		function closePopup(){
			popUp.classList.add('hidden');
			localStorage.setItem('popup', false);
		}


		btnClosePop.addEventListener('click', function(){
			closePopup();
		});

		document.addEventListener('keydown', function(event) {
		    const key = event.key; 
		    if (key === "Escape") {
		        closePopup();
		    }
		});


		window.addEventListener('click', function(event) {
	      if (!popUp.contains(event.target)) {
	        closePopup();
	      }
	    });

	
		function validateEmail(input) {
		    let patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    let isValid = input.value.match(patron);

		    if (isValid) {
		        input.style.borderColor = '#08A6E4';
		    } else {
		        input.style.borderColor = 'red';
		    }

		    return isValid;
		}

		function validateName(input) {
		    let isValid = input.value.length >= 2 && input.value.length <= 100;

		    if (isValid) {
		        input.style.borderColor = '#08A6E4';
		    } else {
		        input.style.borderColor = 'red';
		    }

		    return isValid;
		}

		document.getElementById('formPop').addEventListener('submit',function(event) {
			event.preventDefault();  
    		let emailIsValid = validateEmail(emailPopup);

		    if (emailIsValid) {
		        popUpContainer.classList.add('hidden');
				popUpMessage.classList.remove('hidden');
				event.preventDefault();
				postDataPop();
		    } else {
		        alert("Please complete all fields and check the box.");
		    }
		  
		}); 

		document.getElementById('formMain').addEventListener('submit',function(event){

		    let emailIsValid = validateEmail(email);
		    let nameIsValid = validateName(name);

		    if (nameIsValid && emailIsValid && checkbox.checked) {
		        	postData();
					alert('Thank you for your time!')
					name.value = '';
					name.style.borderColor = '#95989A'
					email.value = '';
					email.style.borderColor = '#95989A'
					checkbox.checked = false;
		    } else {
		        alert("Please complete all fields and check the box.");
		    }

		    event.preventDefault();
		});


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

		}																				

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
		

		document.getElementById('coin-select').addEventListener('change', function() {
			let selectedCurrency = this.options[this.selectedIndex]

			if(selectedCurrency.value == 'usd'){
				calcCoin(25,"usd")
				calcCoin(60,"usd")
				price1.innerHTML = "$" + "0"
				

			}else if(selectedCurrency.value == 'eur'){
				calcCoin(25,"eur")
				calcCoin(60,"eur")
				price1.innerHTML = "€" + "0"

			}else if(selectedCurrency.value == 'gbp'){
				calcCoin(25,"gbp")
				calcCoin(60,"gbp")
				price1.innerHTML = "£" + "0"
			}

		});


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
				  		price2.innerHTML = "€" +  Math.round(finalValue)

				  	}else if ( currency == "gbp"){
				  		finalValue = initialValue * gbp
				  		price2.innerHTML = "£" +  Math.round(finalValue)
				  		
				  	}

			  	}else if(initialValue === 60){
			  		if(currency == "usd"){
				  		finalValue = initialValue * usd
				  		price3.innerHTML = "$" +  Math.round(finalValue)
				  	}else if(currency == "eur"){
				  		finalValue = initialValue * eur
				  		price3.innerHTML = "€" +  Math.round(finalValue)

				  	}else if ( currency == "gbp"){
				  		finalValue = initialValue * gbp
				  		price3.innerHTML = "£" +  Math.round(finalValue)
			  		
			  		}
			  	}


			});

		}

		
		/*slider*/

		let slidePosition = 1;
		SlideShow(slidePosition);

		document.getElementById('backArrow').addEventListener('click', function(){
			SlideShow(slidePosition += -1);
		});

		document.getElementById('forwardArrow').addEventListener('click', function(){
			SlideShow(slidePosition += 1);
		});

		document.getElementById('dot1').addEventListener('click', function(){
			SlideShow(slidePosition = 1);
		});

		document.getElementById('dot2').addEventListener('click', function(){
			SlideShow(slidePosition = 2);
		});

		document.getElementById('dot3').addEventListener('click', function(){
			SlideShow(slidePosition = 3);
		});

		document.getElementById('dot4').addEventListener('click', function(){
			SlideShow(slidePosition = 4);
		});

		document.getElementById('dot5').addEventListener('click', function(){
			SlideShow(slidePosition = 5);
		});

		function SlideShow(n) {
		  let i;
		  let slides = document.getElementsByClassName("containers");
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

		/* slider fin*/

