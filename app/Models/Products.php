<?php

namespace App\Models;

use Illuminate\Database\Eloquent\softDeletes;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'price', 'image',
    ];

    public static function allNormalized($columns = ['*'])
    {
        $products = parent::all($columns);

        foreach ($products as &$product) {
            $product['price'] /= 100;
        }

        return $products;
    }
}
