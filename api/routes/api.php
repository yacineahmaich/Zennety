<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\InvitationController;
use App\Http\Controllers\MembershipController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkspaceController;
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
    // User
    Route::get('/user', [UserController::class, 'me']);
    Route::get('/users/{search}', [UserController::class, 'search']);

    // Workspace
    Route::get("/workspaces", [WorkspaceController::class, 'index']);
    Route::post("/workspaces", [WorkspaceController::class, 'store']);
    Route::get("/workspaces/{workspace}", [WorkspaceController::class, 'show']);
    Route::put("/workspaces/{workspace}", [WorkspaceController::class, 'update']);
    Route::delete("/workspaces/{workspace}", [WorkspaceController::class, 'destroy']);

    // Board
    Route::post("/workspaces/{workspace}/boards", [BoardController::class, 'store']);
    Route::get("/workspaces/{workspace}/boards/{board}", [BoardController::class, 'show']);

    // Status
    Route::post('/workspaces/{workspace}/boards/{board}/statuses', [StatusController::class, 'store']);

    // Invitation
    Route::get('/invitations/{invitation:token}', [InvitationController::class, 'show']);
    Route::post('/invitations', [InvitationController::class, 'invite']);
    Route::post('/invitations/{invitation:token}/accept', [InvitationController::class, 'accept']);
    Route::post('/invitations/{invitation:token}/reject', [InvitationController::class, 'reject']);

    // Notification
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{notification}/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::delete('/notifications/{notification}', [NotificationController::class, 'delete']);

    // Membership
    Route::get('/memberships/{membership_id}/members', [MembershipController::class, 'index']);
});
