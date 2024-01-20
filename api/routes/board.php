<?php

use App\Http\Controllers\BoardController;
use Illuminate\Support\Facades\Route;

Route::get("/boards/{board}", [BoardController::class, 'show']);
Route::post("/workspaces/{workspace}/boards", [BoardController::class, 'store']);
Route::post("/boards/{board}/invitations", [BoardController::class, 'invite']);
