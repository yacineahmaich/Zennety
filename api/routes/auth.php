<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register'])
    ->middleware('guest');

Route::post('/login', [AuthController::class, 'login'])
    ->middleware('guest');

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum');

Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])
                ->middleware('guest');

Route::post('/reset-password', [AuthController::class, 'resetPassword'])
                ->middleware('guest');
