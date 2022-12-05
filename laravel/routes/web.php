<?php

use Illuminate\Support\Facades\Route;

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

// We want to modify this fortify route to return a token for resetting a users password.
// Laravel expects this route name to exist during the password reset process.
Route::get('/api/reset-password/{token}', function($token) {
    return $token;
})->middleware(['guest:'.config('fortify.guard')])
  ->name('password.reset');