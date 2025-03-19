"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const recipe_model_1 = __importDefault(require("../models/recipe.model"));
const getAllRecipes = (req, res) => {
    const recipes = recipe_model_1.default.findAll();
    res.status(200).json(recipes);
};
const searchRecipes = (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.status(400).json({ error: 'Please provide a search keyword.' });
        return;
    }
    const foundRecipes = recipe_model_1.default.searchByKeyword(q);
    if (foundRecipes.length === 0) {
        res.status(404).json({ message: 'No recipes found matching the keyword.' });
        return;
    }
    res.status(200).json(foundRecipes);
};
const getRecipeById = (req, res) => {
    const { id } = req.params;
    const recipe = recipe_model_1.default.findById(id);
    if (!recipe) {
        res.status(404).json({ error: 'Recipe not found!' });
        return;
    }
    res.status(200).json(recipe);
};
const addRecipe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, ingredients, instructions, category, image } = req.body;
    if (!title || !description || !ingredients || !instructions || !category) {
        res.status(400).json({ error: 'All fields are required!' });
        return;
    }
    const newRecipe = yield recipe_model_1.default.create({
        title, description, ingredients, instructions, category, image: image || ''
    });
    if (!newRecipe) {
        res.status(409).json({ error: 'Recipe title is already taken!' });
        return;
    }
    res.status(201).json(newRecipe);
});
const updateRecipeById = (req, res) => {
    const { id } = req.params;
    const updatedRecipe = recipe_model_1.default.updateById(id, req.body);
    if (!updatedRecipe) {
        res.status(404).json({ error: 'Recipe not found!' });
        return;
    }
    res.status(200).json(updatedRecipe);
};
const deleteRecipeById = (req, res) => {
    const { id } = req.params;
    const result = recipe_model_1.default.removeById(id);
    if (!result) {
        res.status(404).json({ error: 'Recipe not found!' });
        return;
    }
    res.status(200).json({ message: 'Recipe deleted successfully!' });
};
exports.default = {
    getAllRecipes,
    searchRecipes, // 👈 Método `search` en la posición correcta
    getRecipeById,
    addRecipe,
    updateRecipeById,
    deleteRecipeById
};
