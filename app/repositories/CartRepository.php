<?php

namespace App\repositories;

use App\Models\CartItem;
use App\Models\Order;
use App\Models\Products;
use Illuminate\Support\Facades\DB;

class CartRepository
{
    public function createOrder($data)
    {
        try {
            DB::beginTransaction();

            $order = new Order();
            $order->name = $data['formData']['name'];
            $order->address = $data['formData']['address'];
            $order->phone = $data['formData']['phone'];
            $order->comment = $data['formData']['comment'];
            $order->total_price = -1;
            $order->saveOrFail();
            $totalPrice = 0;

            foreach ($data['cart'] as $product) {
                $cartItem = new CartItem();
                $cartItem->product_id = $product['id'];
                $cartItem->quantity = $product['quantity'];
                $cartItem->price = $product['price'];
                $cartItem->order_id = $order->id;
                $cartItem->saveOrFail();

                $totalPrice += Products::findOrFail($cartItem->product_id)->price * $cartItem->quantity;
            }
            $order->total_price = $totalPrice;
            $order->saveOrFail();

            DB::commit();

            // Sending notification to administrator for order handling

            return ['status' => 'success'];
        } catch (\Throwable $e) {
            DB::rollback();

            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }
}
