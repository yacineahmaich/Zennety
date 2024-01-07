<?php

use App\Http\Controllers\NotificationController;
use Illuminate\Support\Facades\Route;

Route::get('/notifications', [NotificationController::class, 'index']);
Route::post('/notifications/{notification}/mark-as-read', [NotificationController::class, 'markAsRead']);
Route::delete('/notifications/{notification}', [NotificationController::class, 'delete']);
