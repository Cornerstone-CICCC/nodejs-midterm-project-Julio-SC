"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recipe_controller_1 = __importDefault(require("../controllers/recipe.controller"));
const recipeRouter = (0, express_1.Router)();
recipeRouter.get('/', recipe_controller_1.default.getAllRecipes); // Obtener todas las recetas
recipeRouter.get('/search', recipe_controller_1.default.searchRecipes); // 🔍 Buscar recetas (justo después del GET ALL)
recipeRouter.get('/:id', recipe_controller_1.default.getRecipeById); // Obtener receta por ID
recipeRouter.post('/', recipe_controller_1.default.addRecipe); // Agregar receta
recipeRouter.put('/:id', recipe_controller_1.default.updateRecipeById); // Actualizar receta por ID
recipeRouter.delete('/:id', recipe_controller_1.default.deleteRecipeById); // Eliminar receta por ID
exports.default = recipeRouter;
