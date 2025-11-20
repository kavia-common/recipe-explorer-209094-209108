export interface Ingredient {
  name: string;
  amount?: string;
}

export interface Nutrition {
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  image: string;
  cuisine?: string;
  category?: string;
  prepTime?: number; // minutes
  cookTime?: number; // minutes
  servings?: number;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition?: Nutrition;
  tags?: string[];
  rating?: number;
}
