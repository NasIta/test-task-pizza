<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Products;
use Faker\Generator as Faker;

$factory->define(Products::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'price' => rand(200, 550) * 100,
        'image' => '/images/pizza/pizza-1.png',
    ];
});
