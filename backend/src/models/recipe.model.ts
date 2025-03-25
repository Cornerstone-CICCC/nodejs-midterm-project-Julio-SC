import { v4 as uuidv4 } from 'uuid';
import { Recipe } from '../types/recipe';

class RecipeModel {
    private recipes: Recipe[] = [];

    findById(id: string): Recipe | null {
        return this.recipes.find(recipe => recipe.id === id) || null;
    }

    async create(newRecipe: Omit<Recipe, 'id'>): Promise<Recipe | false> {
        const existingRecipe = this.recipes.find(recipe => recipe.title === newRecipe.title);
        if (existingRecipe) return false;

        const recipe: Recipe = {
            id: uuidv4(),
            ...newRecipe
        };

        this.recipes.push(recipe);
        return recipe;
    }

    findAll(): Recipe[] {
        return this.recipes;
    }

    searchByKeyword(keyword: string): Recipe[] {
        const lowerCaseKeyword = keyword.toLowerCase();

        return this.recipes.filter(recipe =>
            recipe.title.toLowerCase().includes(lowerCaseKeyword) ||
            recipe.description.toLowerCase().includes(lowerCaseKeyword) ||
            recipe.ingredients.some(ingredient =>
                ingredient.toLowerCase().includes(lowerCaseKeyword)
            )
        );
    }

    updateById(id: string, updates: Partial<Recipe>) {
        const foundIndex = this.recipes.findIndex(recipe => recipe.id === id);
        if (foundIndex === -1) return false;

        const updatedRecipe = {
            ...this.recipes[foundIndex],
            title:updates.title ?? this.recipes[foundIndex].title, 
            description:updates.description ?? this.recipes[foundIndex].description, 
            ingredients:updates.ingredients ?? this.recipes[foundIndex].ingredients,
             instructions:updates.instructions ?? this.recipes[foundIndex].instructions,
              category:updates.category ?? this.recipes[foundIndex].category,
               image:updates.image ?? this.recipes[foundIndex].image
        };

        this.recipes[foundIndex] = updatedRecipe;
        return updatedRecipe;
    }

    removeById(id: string): boolean {
        const foundIndex = this.recipes.findIndex(recipe => recipe.id === id);
        if (foundIndex === -1) return false;

        this.recipes.splice(foundIndex, 1);
        return true;
    }
}

export default new RecipeModel();
