<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;


class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'category_id' => category::pluck('id')->random(),
            'price' => fake()->randomNumber(),
            'stock' => fake()->randomNumber(),
        ];
    }
}
