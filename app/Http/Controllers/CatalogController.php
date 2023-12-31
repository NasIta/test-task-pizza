<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class CatalogController extends Controller
{
    public function index()
    {
        return view('layouts.app');
    }

    public function products()
    {
        return Products::allNormalized();
    }
}
