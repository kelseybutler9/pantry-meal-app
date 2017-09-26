const recipe_search_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients'
const ingredient_search_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete';
const recipe_search_KEY = '8P5jfI6bzJmshGoHP4ULJXria9Lmp17aDJYjsnaBmFSetYNBoE'; 
const recipe_search_APIID = '340adb33'; 
let ingredientOptions = '';
let ingredientArray = [];
let recipeListString = '';

function userSubmitsIngredients() {
	$('.js-search-form').on('submit', function(event) {
		event.preventDefault();
		let ingredient = $('input[name=ingredient-search]').val();
		getIngredientData(ingredient, displayIngredientList);
		$('input[name=ingredient-search]').val('');
		$('.js-suggestion-list').prop('hidden', false);
	});
}

function getIngredientData (ingredient, callback) {
	// const settings = {
 //    	url: ingredient_search_URL,
 //    	headers: {
 //        	'X-Mashape-Key': recipe_search_KEY,
 //        	'Content-Type':'application/x-www-form-urlencode',
 //        	'Accept':'application/json'
 //    	},
 //    	method: 'GET',
 //    	dataType: 'json',
 //    	data: {
	// 		intolerances: null,
	// 		metaInformation: false,
	// 		number: 2,
	// 		query: `${ingredient}`
	// 	},
 //    	success: callback
 //    };

	// $.ajax(settings).fail(showError()); //commented out to be added in later
	displayIngredientList([{name: 'flour'}, {name:'flour rice'}]);
}	

function displayIngredientList(data) {
	let ingredientSuggestionString = '';
	let ingredientSuggestionArray = [];
	data.map(function(item, index) {
    	ingredientSuggestionString += "<label class='js-suggested-ingredient'><input id='"+index+"'type='radio' name='ingredient-suggestion' required value="+ item.name + "><span>  "+ item.name + "</span></label>";
    	ingredientSuggestionArray.push(item.name);
  	});
  	$('.js-suggested-ingredients').html(ingredientSuggestionString);
  	userSubmitsIngredientSuggestion(ingredientSuggestionArray);
	return;
}

function userSubmitsIngredientSuggestion(ingredientSuggestionArray) {
	$('.js-suggestion-list input').on('change', function() {
		event.preventDefault();
    	let answerIndex = $(".js-suggestion-list input:radio[name='ingredient-suggestion']").index($(".js-suggestion-list input:radio[name='ingredient-suggestion']").filter(':checked'));
    	processIngredientList(ingredientSuggestionArray[answerIndex]);
    	$('.js-suggested-ingredient').remove();
    	$('.js-suggestion-list').prop('hidden', true);
  	});
}


function processIngredientList(ingredient) {
	if (ingredientOptions === '') {
		ingredientOptions += `${ingredient}`;
	  	$('.js-pantry-list').prop('hidden', false);
	}
	else {
		ingredientOptions += ',' + `${ingredient}`;
	}
	ingredientArray.push(ingredient);
	let ingredientListString = '';
	ingredientArray.map(function(item){
    	ingredientListString += '<p>' + item + '</p>';
  	});
	$('.js-pantry-items').html(ingredientListString);
}

function userSubmitsRecipe() {
	$('.js-pantry-list').on('submit', function(event) {
		event.preventDefault();
		getRecipeData(displayRecipeList);
	});
}

function getRecipeData(callback) {
// 	const settings = {
//     	url: recipe_search_URL,
//     	headers: {
//         	'X-Mashape-Key': recipe_search_KEY,
//         	'Accept':'application/json'
//       	},
//     	method: 'GET',
//     	dataType: 'json',
//     	data: {
// 			fillIngredients: false,
// 			ingredients: ingredientOptions,
// 			limitLicense: false,
// 			number: 2,
// 			ranking: 2
// 		},
//     success: callback
// };

// 	$.ajax(settings).fail(showError()); //add back in later
	displayRecipeList([{id: 1, title: 'Recipe One', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeUt6OuuuzP6rX82a66X8RrWoVbcfLOTSCmygJ9RgiwT-G0d20iw'},{id: 2, title: 'Recipe Two', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeUt6OuuuzP6rX82a66X8RrWoVbcfLOTSCmygJ9RgiwT-G0d20iw'}]);
}	

function displayRecipeList(data) {
	data.map(function(item, index){ 
	  	getRecipeSourceURL(item.id, item.title, item.image, renderRecipeURL);
  	});
  	$('.js-recipe-list').prop('hidden', false);
  	$('.js-pantry-list').prop('hidden', true);
  	$('.js-search-form').prop('hidden', true);
}

function getRecipeSourceURL(recipeId, recipeTitle, recipeImage, callback) {
 //  	const settings = {
 //    	url: ' https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipeId + '/information',
 //    	headers: {
 //        	'X-Mashape-Key': recipe_search_KEY,
 //        	'Accept':'application/json'
 //      	},
 //    	method: 'GET',
 //    	dataType: 'json',
 //    	data: {
	// 		id: recipeId,
	// 		includeNutrition: false
	// 	},
 //    	success: function(response) {
 //      		callback(recipeId, recipeTitle, recipeImage, response);
 //    	}
 //  	};
	// $.ajax(settings).fail(showError());
	renderRecipeURL(recipeId, recipeTitle, recipeImage, 'hi');
}

function renderRecipeURL(recipeId, recipeTitle, recipeImage, resp) {
	// console.log(recipeTitle);
 //  	let recipeURL = resp[Object.keys(resp)[14]];
 //  	console.log(recipeURL); add back in later

 	let recipeURL = 'https://www.pillsbury.com/recipes/classic-chicken-pot-pie/1401d418-ac0b-4b50-ad09-c6f1243fb992';
  	let recipeString =`<div class="js-recipe"><h2>${recipeTitle}</h2><a href="${recipeURL}"><img src="${recipeImage}" alt=${recipeTitle}></a></div>`;
   	$('.js-recipes').append(recipeString);
   	
}

function newIngredientList() {
	$('js-recipe-list').on('submit', function(event) {
		event.preventDefault();
		ingredientOptions = '';
    	ingredientArray = [];
    	recipeListString = '';
		$('.js-recipe-list').prop('hidden', true);
		$('.js-pantry-list').prop('hidden', true);
		console.log(recipeListString);
	});
}

function showError(err) {
  	if(err === 'ingredient'){
    	$('no-ingredient').prop('hidden', true);
  	}
  	if (err==='recipe') {
    	$('no-recipe').prop('hidden', true);
  	}
	return;
}

function closeErrorMessage() {
	$('js-error').on('submit', function(event) {
		console.log('error');
		event.preventDefault();
		$('.js-error').prop('hidden', true);
	});
}

$(userSubmitsIngredients);
$(userSubmitsRecipe);
$(closeErrorMessage);
$(newIngredientList);