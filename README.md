Create an app where users enter a list of ingredients and receive a list of recipe's that include those ingredients.

API Choice: https://market.mashape.com/spoonacular/recipe-food-nutrition

I chose this API because I was able to pull in all necessary information for this application. This includes suggesting ingredients for a recipe search and pulling recipes that include a list of ingredients. 
 
User Flows are included below: 

Home Screen

What the user sees | What a user does | What the system does 
-----------------  | ---------------- | -------------------- 
Search bar to enter ingredient | enter ingredient in the search bar | creates a list of suggested ingredients for the user to choose from (taken to the suggested ingredient popup)
button to “submit ingredient" |select button to submit ingredient |ingredient gets added to a list below the search bar, search bar is emptied and the button becomes selected then unselected(changes color)
button to “submit recipe” |select button to submit recipe | button becomes selected then unselected, the recipes screen appears next to the ingredients webpart

Recipes Screen

What the user sees | What a user does | What the system does 
-----------------  | ---------------- | -------------------- 
list of recipes based off of the ingredients added | | 
button to “add another ingredient”| select button to submit a new ingredient | adds an ingredient to the list and reloads the recipe list
button to “submit a new ingredient list” | select button to submit new ingredient list | recipe list is removed and refresh to the home screen  

Error Screen

What the user sees | What a user does | What the system does 
-----------------  | ---------------- | -------------------- 
Pop up message that the ingredient was not found | selects the x to close out the message | removes the error message back to previous screen
                                                     
Suggested Ingredient Pop-up

What the user sees | What a user does | What the system does 
-----------------  | ---------------- | -------------------- 
Pop up message with suggested ingredients in list | selects one of the ingredients in the list | adds the ingredient to the list and take back to homepage with ingredients list

 Link to related wireframes:
`https://drive.google.com/file/d/0BwXWqeyRyle7al9lSXJ0NjFfVlE/view?usp=sharing`

