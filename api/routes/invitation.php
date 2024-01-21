<?php

use App\Http\Controllers\InvitationController;
use Illuminate\Support\Facades\Route;

Route::get('/invitations/{invitation:token}', [InvitationController::class, 'show']);
Route::post('/invitations', [InvitationController::class, 'invite']);
Route::post('/invitations/{invitation:token}/accept', [InvitationController::class, 'accept']);
Route::post('/invitations/{invitation:token}/reject', [InvitationController::class, 'reject']);
