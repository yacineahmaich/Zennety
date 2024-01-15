<?php

use App\Http\Controllers\MembershipController;
use Illuminate\Support\Facades\Route;

Route::get('/memberships/{membership_id}/members', [MembershipController::class, 'index']);
