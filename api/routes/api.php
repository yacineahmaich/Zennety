<?php

use App\Http\Controllers\InvitationController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
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

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/users/{search}', [UserController::class, 'search']);

    Route::post('/worksapces/{worksapce}/invitations', [InvitationController::class, 'store']);

    require __DIR__ . '/workspace.php';
    require __DIR__ . '/board.php';
    require __DIR__ . '/status.php';
});
