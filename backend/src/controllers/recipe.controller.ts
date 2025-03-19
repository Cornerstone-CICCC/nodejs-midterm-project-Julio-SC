import { Request, Response } from 'express';
import recipeModel from '../models/recipe.model';
import { Recipe } from '../types/recipe';

const getAllRecipes = (req: Request, res: Response) => {
    const recipes = recipeModel.findAll();
    res.status(200).json(recipes);
};

const searchRecipes = (req: Request<{}, {}, {}, { q: string }>, res: Response) => {
    const { q } = req.query;

    if (!q) {
        res.status(400).json({ error: 'Please provide a search keyword.' });
        return;
    }

    const foundRecipes = recipeModel.searchByKeyword(q);

    if (foundRecipes.length === 0) {
        res.status(404).json({ message: 'No recipes found matching the keyword.' });
        return;
    }

    res.status(200).json(foundRecipes);
};

const getRecipeById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const recipe = recipeModel.findById(id);

    if (!recipe) {
        res.status(404).json({ error: 'Recipe not found!' });
        return;
    }

    res.status(200).json(recipe);
};

const addRecipe = async (req: Request<{}, {}, Omit<Recipe, 'id'>>, res: Response) => {
    const { title, description, ingredients, instructions, category, image } = req.body;

    if (!title || !description || !ingredients || !instructions || !category) {
        res.status(400).json({ error: 'All fields are required!' });
        return;
    }

    const newRecipe = await recipeModel.create({ 
        title, description, ingredients, instructions, category, image: image || ''
    });

    if (!newRecipe) {
        res.status(409).json({ error: 'Recipe title is already taken!' });
        return;
    }

    res.status(201).json(newRecipe);
};

const updateRecipeById = (req: Request<{ id: string }, {}, Partial<Recipe>>, res: Response) => {
    const { id } = req.params;
    const updatedRecipe = recipeModel.updateById(id, req.body);

    if (!updatedRecipe) {
        res.status(404).json({ error: 'Recipe not found!' });
        return;
    }

    res.status(200).json(updatedRecipe);
};

const deleteRecipeById = (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const result = recipeModel.removeById(id);

    if (!result) {
        res.status(404).json({ error: 'Recipe not found!' });
        return;
    }

    res.status(200).json({ message: 'Recipe deleted successfully!' });
};

export default {
    getAllRecipes,
    searchRecipes,     // 👈 Método `search` en la posición correcta
    getRecipeById,
    addRecipe,
    updateRecipeById,
    deleteRecipeById
};
