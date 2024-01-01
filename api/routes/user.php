<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/user', [UserController::class, 'me']);

Route::get('/users/{search}', [UserController::class, 'search']);
