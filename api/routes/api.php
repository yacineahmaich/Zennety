<?php

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

// Auth Routes
require __DIR__ . '/auth.php';

Route::middleware(['auth:sanctum'])->group(function () {
    
    require __DIR__ . '/user.php';
    require __DIR__ . '/workspace.php';
    require __DIR__ . '/board.php';
    require __DIR__ . '/status.php';
    require __DIR__ . '/invitation.php';
    require __DIR__ . '/notification.php';
    require __DIR__ . '/membership.php';
});
