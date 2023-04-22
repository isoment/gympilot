<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

/**************************************************
 *  Routes protected by 'auth:sanctum' middleware *
 **************************************************/
Route::middleware('auth:sanctum')->group(function() {
    // Get the authenticated users information
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

/**************** *
 *  Public routes *
 *****************/
Route::get('/test', function() {
    Cache::store('redis')->put('test', 'Test route was hit.', 600);
    return [
        'title' => 'Fake Title',
        'junk' => 'value'
    ];
});