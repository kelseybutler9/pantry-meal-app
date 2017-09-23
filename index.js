const recipe_search_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients'
const ingredient_search_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete';
const recipe_search_KEY = '8P5jfI6bzJmshGoHP4ULJXria9Lmp17aDJYjsnaBmFSetYNBoE'; 
const recipe_search_APIID = '340adb33'; 

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
	const settings = {
    	url: ingredient_search_URL,
    	headers: {
        	'X-Mashape-Key': recipe_search_KEY,
        	'Content-Type':'application/x-www-form-urlencode',
        	'Accept':'application/json'
    	},
    	method: 'GET',
    	dataType: 'json',
    	data: {
			intolerances: null,
			metaInformation: false,
			number: 2,
			query: `${ingredient}`
		},
    	success: callback
    };

	$.ajax(settings).fail(showError());
}	

function displayIngredientList(data) {
	let ingredientSuggestionString = '';
	let ingredientSuggestionArray = [];
	data.map(function(item, index) {
    	ingredientSuggestionString += "<label class=js-suggested-ingredient><input id='"+index+"'type='radio' name='ingredient-suggestion' required value="+ item.name + "><span>"+ item.name + "</span></label>";
    	ingredientSuggestionArray.push(item.name);
  	});
  	$('.js-suggested-ingredients').html(ingredientSuggestionString);
  	userSubmitsIngredientSuggestion(ingredientSuggestionArray);
	return;
}

userSubmitsIngredientSuggestion(ingredientSuggestionArray); {
	$('.js-suggestion-list input').on('change', function() {
		event.preventDefault();
    	let answerIndex = $(".js-suggestion-list input:radio[name='ingredient-suggestion']").index($(".js-suggestion-list input:radio[name='ingredient-suggestion']").filter(':checked'));
    	processIngredientList(ingredientSuggestions[answerIndex]);
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

function showError(err) {
  	if(err === 'ingredient'){
    	$('no-ingredient').prop('hidden', true);
  	}
  	if (err==='recipe') {
    	$('no-recipe').prop('hidden', true);
  	}
	return;
}

$(userSubmitsIngredients);