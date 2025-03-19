import { Router } from 'express';
import recipeController from '../controllers/recipe.controller';

const recipeRouter = Router();

recipeRouter.get('/', recipeController.getAllRecipes);         // Obtener todas las recetas
recipeRouter.get('/search', recipeController.searchRecipes);   // 🔍 Buscar recetas (justo después del GET ALL)
recipeRouter.get('/:id', recipeController.getRecipeById);      // Obtener receta por ID
recipeRouter.post('/', recipeController.addRecipe);            // Agregar receta
recipeRouter.put('/:id', recipeController.updateRecipeById);   // Actualizar receta por ID
recipeRouter.delete('/:id', recipeController.deleteRecipeById); // Eliminar receta por ID

export default recipeRouter;
