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
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class RecipeModel {
    constructor() {
        this.recipes = [];
    }
    findById(id) {
        return this.recipes.find(recipe => recipe.id === id) || null;
    }
    create(newRecipe) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingRecipe = this.recipes.find(recipe => recipe.title === newRecipe.title);
            if (existingRecipe)
                return false;
            const recipe = Object.assign({ id: (0, uuid_1.v4)() }, newRecipe);
            this.recipes.push(recipe);
            return recipe;
        });
    }
    findAll() {
        return this.recipes;
    }
    searchByKeyword(keyword) {
        const lowerCaseKeyword = keyword.toLowerCase();
        return this.recipes.filter(recipe => recipe.title.toLowerCase().includes(lowerCaseKeyword) ||
            recipe.description.toLowerCase().includes(lowerCaseKeyword) ||
            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(lowerCaseKeyword)));
    }
    updateById(id, updates) {
        var _a, _b, _c, _d, _e, _f;
        const foundIndex = this.recipes.findIndex(recipe => recipe.id === id);
        if (foundIndex === -1)
            return false;
        const updatedRecipe = Object.assign(Object.assign({}, this.recipes[foundIndex]), { title: (_a = updates.title) !== null && _a !== void 0 ? _a : this.recipes[foundIndex].title, description: (_b = updates.description) !== null && _b !== void 0 ? _b : this.recipes[foundIndex].description, ingredients: (_c = updates.ingredients) !== null && _c !== void 0 ? _c : this.recipes[foundIndex].ingredients, instructions: (_d = updates.instructions) !== null && _d !== void 0 ? _d : this.recipes[foundIndex].instructions, category: (_e = updates.category) !== null && _e !== void 0 ? _e : this.recipes[foundIndex].category, image: (_f = updates.image) !== null && _f !== void 0 ? _f : this.recipes[foundIndex].image });
        this.recipes[foundIndex] = updatedRecipe;
        return updatedRecipe;
    }
    removeById(id) {
        const foundIndex = this.recipes.findIndex(recipe => recipe.id === id);
        if (foundIndex === -1)
            return false;
        this.recipes.splice(foundIndex, 1);
        return true;
    }
}
exports.default = new RecipeModel();
