<?php

use App\Http\Controllers\WorkspaceController;
use Illuminate\Support\Facades\Route;

Route::get("/workspaces", [WorkspaceController::class, 'index']);
Route::post("/workspaces", [WorkspaceController::class, 'store']);
Route::get("/workspaces/{workspace}", [WorkspaceController::class, 'show']);
Route::put("/workspaces/{workspace}", [WorkspaceController::class, 'update']);
Route::delete("/workspaces/{workspace}", [WorkspaceController::class, 'destroy']);
