const recipe_search_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients'
const ingredient_search_URL = 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete';
const recipe_search_KEY = '8P5jfI6bzJmshGoHP4ULJXria9Lmp17aDJYjsnaBmFSetYNBoE';
const recipe_search_APIID = '340adb33';
let ingredientOptions = '';
let ingredientArray = [];
let recipeListString = '';


$('.js-search-form').on('submit', function(event) {
	event.preventDefault();
	let ingredient = $('input[name=ingredient-search]').val();
	getIngredientData(ingredient, displayIngredientList);
	$('input[name=ingredient-search]').val('');
	$('.js-suggestion-list').prop('hidden', false);
});


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
			number: 10,
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
    ingredientSuggestionString += "<label class='js-suggested-ingredient'><input id='"+index+"'type='radio' name='ingredient-suggestion' required value="+ item.name + "><span>  "+ item.name + "</span></label>";
    ingredientSuggestionArray.push(item.name);
  });
  $('.js-suggested-ingredients').html(ingredientSuggestionString);
  userSubmitsIngredientSuggestion(ingredientSuggestionArray);
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

$('.js-pantry-list').on('submit', function(event) {
	event.preventDefault();
	getRecipeData(displayRecipeList);
});

function getRecipeData(callback) {
	const settings = {
    url: recipe_search_URL,
    headers: {
      'X-Mashape-Key': recipe_search_KEY,
      'Accept':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    data: {
			fillIngredients: false,
			ingredients: ingredientOptions,
			limitLicense: false,
			number: 15,
			ranking: 2
		},
    success: callback
};

	$.ajax(settings).fail(showError());
}

function displayRecipeList(data) {
	console.log(data);
  data.map(function(item, index){
	  	getRecipeSourceURL(item.id, item.title, item.image, renderRecipeURL);
  });
  $('.js-recipe-list').prop('hidden', false);
  $('.js-pantry-list').prop('hidden', true);
  $('.js-search-form').prop('hidden', true);
}

function getRecipeSourceURL(recipeId, recipeTitle, recipeImage, callback) {
  const settings = {
    url: ' https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + recipeId + '/information',
    headers: {
      'X-Mashape-Key': recipe_search_KEY,
      'Accept':'application/json'
    },
    method: 'GET',
    dataType: 'json',
    data: {
			id: recipeId,
			includeNutrition: false
		},
    success: function(response) {
      callback(recipeId, recipeTitle, recipeImage, response);
    }
  };
  $.ajax(settings).fail(showError());
}

function renderRecipeURL(recipeId, recipeTitle, recipeImage, resp) {
	console.log(recipeTitle);
  let recipeURL = resp[Object.keys(resp)[14]];
  if(typeof recipeURL !== 'number') {
    let recipeString =`<div class="js-recipe"><h3>${recipeTitle}<a href="${recipeURL}"></h3><a href="${recipeURL}"><img src="${recipeImage}" alt=${recipeTitle}></a></div>`;
    $('.js-recipes').append(recipeString);
  }
}

$('js-recipe-list').on('submit', function(event) {
	event.preventDefault();
	ingredientOptions = '';
  ingredientArray = [];
  recipeListString = '';
	$('.js-recipe-list').prop('hidden', true);
	$('.js-pantry-list').prop('hidden', true);

});

function showError(err) {
  if(err === 'ingredient'){
    $('no-ingredient').prop('hidden', true);
  }
  if (err==='recipe') {
    $('no-recipe').prop('hidden', true);
  }
	return;
}

$('js-error').on('submit', function(event) {
	console.log('error');
	event.preventDefault();
	$('.js-error').prop('hidden', true);
	$('no-recipe').prop('hidden', true);
	$('no-ingredient').prop('hidden', true);
});
