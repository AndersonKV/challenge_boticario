const shoppingCart = [];
var cartIsOpen = false;


(async function template() {
	//renderiza as duas grid
	for(i = 0; i < 1; i++) {
	const error = 'https://miro.medium.com/max/3840/1*uRziGU1OJNWawGusbZLxvQ.png';
		const section = `
					<section class="grid" data-aos="fade-left">
						<div class="item item-hover">
							<figure>
					 			<img class="img-fluid" src="${api.items[0].images[0].imageUrl}"/>	
					 		</figure>
					 		<button id="${api.items[0].id}" type="button" class="btn">Comprar</button>
		  			 		<p>${api.items[0].name}<p>
		  			 		<h4>$${api.items[0].Value}</h4>
 		  			 		<h5>5x de $${Math.floor(api.items[0].Value / 5).toFixed(2)}</h5>
		  				</div>
		  				<div class="item item-hover">
							<figure>
					 			<img class="img-fluid" src="${api.items[1].images[0].imageUrl}">	
					 		</figure>
					 		<button id="${api.items[1].id}" type="button" class="btn">Comprar</button>
		  			 		<p>${api.items[1].name}<p>
		  			 		<h4>$${api.items[1].Value}</h4>
		  			 		<h5>5x de $${Math.floor(api.items[1].Value / 5).toFixed(2)}</h5>
		  				</div>
		  				<div class="item item-hover">
							<figure>
					 			<img class="img-fluid" src="${api.items[2].images[0].imageUrl}">	
					 		</figure>
					 		<button id="${api.items[2].id}" type="button" class="btn">Comprar</button>
		  			 		<p>${api.items[2].name}<p>
		  			 		<h4>$${api.items[2].Value}</h4>
		  			 		<h5>5x de $${Math.floor(api.items[2].Value / 5).toFixed(2)}</h5>
		  				</div>		 		
				 	</section>

				 	<section class="grid" data-aos="fade-left">
						<div class="item item-hover">
							<figure>
					 			<img class="img-fluid" src="${api.items[3].images[0].imageUrl}">	
					 		</figure>
					 		<button id="${api.items[3].id}" type="button" class="btn">Comprar</button>
		  			 		<p>${api.items[3].name}<p>
		  			 		<h4>$${api.items[3].Value}</h4>
		  			 		<h5>5x de $${Math.floor(api.items[3].Value / 5).toFixed(2)}</h5>
		  				</div>
		  				<div class="item item-hover">
							<figure>
					 			<img class="img-fluid" src="${api.items[4].images[0].imageUrl}">	
					 		</figure>
					 		<button id="${api.items[4].id}" type="button" class="btn">Comprar</button>
		  			 		<p>${api.items[4].name}<p>
		  			 		<h4>$${api.items[4].Value}</h4>
		  			 		<h5>5x de $${Math.floor(api.items[4].Value / 5).toFixed(2)}</h5>
		  				</div>
		  				<div class="item item-hover">
							<figure>
					 			<img class="img-fluid" src="${api.items[5].images[0].imageUrl}">	
					 		</figure>
					 		<button id="${api.items[5].id}" type="button" class="btn">Comprar</button>
		  			 		<p>${api.items[5].name}<p>
		  			 		<h4>$${api.items[5].Value}</h4>
		  			 		<h5>5x de $${Math.floor(api.items[5].Value / 5).toFixed(2)}</h5>
		  				</div>		 		
				 	</section>`;
		//cria elemento div
		const div = document.createElement("div");
		//anexa grid a const string section e anexa a ao row
		div.innerHTML = section;
		document.querySelector('.my-container').append(div);
	}
 })();

(function attachEvents() {
	const btn = document.querySelectorAll('.btn');
	const toggle = document.querySelector('.subtotal');

	for(i = 0; i < btn.length; i++) {
		btn[i].addEventListener("click", submit)
	}

	toggle.addEventListener("click", openCart)


})();

function toggleBtn() {
	var x = document.querySelector(".area-menu");
	if (x.className === "area-menu") {
		x.className += " responsive";
	} else {
		x.className = "area-menu";
	}
}

function submit(event) {
	//console.log(event.target.id)
	const qtd = document.querySelector('.qtd');
	const price = document.querySelector('.span-price');
    const miniProductPass = document.querySelector(".mini-product-pass");

	let get = api.items.filter((item) => {
		return item.id == event.target.id;
  	})

	shoppingCart.push(get[0])

	var total = [];

	for(i = 0; i < shoppingCart.length; i++) {
		total.push(shoppingCart[i].Value);
	}

	//pega todos os items price do total e soma
	const totalFinal = total.reduce(function(anterior, atual) {
		return parseFloat(anterior) + parseFloat(atual)
	});
 
	const div = `<div class="mini-product-grid subgrid" id="${get[0].id}">
   					<div class="mini-item">
   						<img class="" src="${get[0].images[0].imageUrl}"/>
   					</div>
   					<div class="mini-item"><span>${get[0].Value}</span></div>
   					<div class="mini-item" onclick="del(this)"><span class="x-exclude"  >X</span></div>
   				</div>
   				`;

	const html = document.createElement("div")
	html.innerHTML = div;
 	miniProductPass.append(html);

 	console.log(shoppingCart)
 	price.innerHTML = totalFinal.toFixed(2).replace('.', ',')
 	qtd.innerHTML = `(${shoppingCart.length})`
}	

function openCart() {
	const toggleMini = document.querySelector('.mini-product-pass');
	const miniCart = document.querySelector('.shopping-mini-cart');
	toggleMini.classList.toggle("mini-product-pass-toggle")
	miniCart.classList.toggle("shopping-mini-cart-toggle")
 
 	if(cartIsOpen == false) {
 		return cartIsOpen = true;
 	}
 
}

function del(event){
	const qtd = document.querySelector('.qtd');
	const price = document.querySelector('.span-price');

	//pega o id do evento e verifica se ele existe, se sim retorna
	let get = api.items.filter((item) => {
		return item.id == event.parentElement.id;
  	})

	//valor total
	var total = [];
	//quantidade de item do carrinho
 	let len = shoppingCart.length;
 	//faz um loop e verifica se o id bate com do id, se sim remove e para
 	for(i = 0; i < shoppingCart.length; i++) {
		if(get[0].id === shoppingCart[i].id){
			shoppingCart.pop();
			break;
		}	
	}
 
	//medida de segurança para caso o loop não remova o item do carrinho
	//se o len for igual ao shoppingCart o remove aqui
	if(len === shoppingCart.length){
		shoppingCart.pop();
	}
 	
	//deleta a div 
	event.parentElement.parentElement.remove();

	//faz um loop no carrinho atualizando o valor
	for(i = 0; i < shoppingCart.length; i++) {
		total.push(shoppingCart[i].Value)
	}	
	 
	//pega todos os items price do total e soma
	var totalFinal = total.length ? total.reduce(function(anterior, atual) {
	  	  return parseFloat(anterior) + parseFloat(atual);
	}) : '';

 
 
	if(total.length > 0) {
		price.innerHTML = totalFinal.toFixed(2).replace('.', ',')
	}
	if(total.length === 0) {
		price.innerHTML = '$0.00';
	}

  	qtd.innerHTML = `(${shoppingCart.length})`
}


