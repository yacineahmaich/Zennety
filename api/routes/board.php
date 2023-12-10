<?php

use App\Http\Controllers\BoardController;
use Illuminate\Support\Facades\Route;

Route::post("/workspaces/{workspace}/boards", [BoardController::class, 'store']);