<?php
use App\Http\Controllers\InvitationController;
use Illuminate\Support\Facades\Route;

Route::get('/invitations/{invitation:token}', [InvitationController::class, 'show']);
Route::post('/invitations/{invitation:token}/accept', [InvitationController::class, 'accept']);