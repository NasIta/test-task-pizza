<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\Products;
use App\repositories\CartRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function order(Request $request)
    {
        $data = $request->all();

        $cartRepository = new CartRepository();
        return $cartRepository->createOrder($data);
    }
}
