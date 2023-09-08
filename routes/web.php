<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Support\Facades\Route;

Route::get('/', 'CatalogController@index');
Route::get('/order', 'CatalogController@index');
Route::get('/catalog/products', 'CatalogController@products');
Route::post('/cart/order', 'CartController@order');
