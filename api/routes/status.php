<?php

use App\Http\Controllers\StatusController;
use Illuminate\Support\Facades\Route;

Route::post('/boards/{board}/statuses', [StatusController::class, 'store']);
