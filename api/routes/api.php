<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\CardController;
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
    Route::put('/user', [UserController::class, 'update']);
    Route::get('/users/{search}', [UserController::class, 'search']);
    Route::put('/pins/{type}/{id}', [UserController::class, 'pin']);

    // Workspace
    Route::get("/workspaces", [WorkspaceController::class, 'index']);
    Route::post("/workspaces", [WorkspaceController::class, 'store']);
    Route::get("/workspaces/{workspace}", [WorkspaceController::class, 'show']);
    Route::put("/workspaces/{workspace}", [WorkspaceController::class, 'update']);
    Route::delete("/workspaces/{workspace}", [WorkspaceController::class, 'destroy']);
    Route::put("/workspaces/{workspace}/transfer-ownership", [WorkspaceController::class, 'tranferOwnership']);
    Route::post("/workspaces/{workspace}/avatar", [WorkspaceController::class, 'setAvatar']);
    Route::delete("/workspaces/{workspace}/avatar", [WorkspaceController::class, 'deleteAvatar']);

    // Board
    Route::post("/workspaces/{workspace}/boards", [BoardController::class, 'store']);
    Route::get("/workspaces/{workspace}/boards/{board}", [BoardController::class, 'show']);
    Route::put('/workspaces/{workspace}/boards/{board}', [BoardController::class, 'update']);
    Route::delete('/workspaces/{workspace}/boards/{board}', [BoardController::class, 'destroy']);


    // Status
    Route::get('/workspaces/{workspace}/boards/{board}/statuses', [StatusController::class, 'index']);
    Route::post('/workspaces/{workspace}/boards/{board}/statuses', [StatusController::class, 'store']);
    Route::put('/workspaces/{workspace}/boards/{board}/statuses/reorder', [StatusController::class, 'reorder']);
    Route::put('/workspaces/{workspace}/boards/{board}/statuses/{status}', [StatusController::class, 'update']);
    Route::delete('/workspaces/{workspace}/boards/{board}/statuses/{status}', [StatusController::class, 'destroy']);

    // Card
    Route::post('/workspaces/{workspace}/boards/{board}/statuses/{status}/cards', [CardController::class, 'store']);
    Route::put('/workspaces/{workspace}/boards/{board}/statuses/{status}/cards/{card}', [CardController::class, 'update']);
    Route::put('/workspaces/{workspace}/boards/{board}/statuses/cards/reorder', [CardController::class, 'reorder']);
    Route::delete('/workspaces/{workspace}/boards/{board}/statuses/{status}/cards/{card}', [CardController::class, 'destroy']);
    Route::post('/workspaces/{workspace}/boards/{board}/statuses/{status}/cards/{card}/comments', [CardController::class, 'comment']);
    Route::get('/workspaces/{workspace}/boards/{board}/statuses/{status}/cards/{card}', [CardController::class, 'show']);
    Route::get('/workspaces/{workspace}/boards/{board}/statuses/{status}/cards/{card}/comments', [CardController::class, 'comments']);

    // Invitation
    Route::get('/invitations/{invitation:token}', [InvitationController::class, 'show']);
    Route::post('/invitations/{type}/{id}/invite', [InvitationController::class, 'invite']);
    Route::get('/invitations/{type}/{id}', [InvitationController::class, 'index']);
    Route::post('/invitations/{invitation:token}/accept', [InvitationController::class, 'accept']);
    Route::post('/invitations/{invitation:token}/reject', [InvitationController::class, 'reject']);
    Route::delete('/invitations/{invitation:token}', [InvitationController::class, 'destroy']);

    // Notification
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/{notification}/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::delete('/notifications/{notification}', [NotificationController::class, 'delete']);

    // Membership
    Route::get('/memberships/{type}/{id}/members', [MembershipController::class, 'index']);
    Route::delete('/memberships/{type}/{id}/members/{membership}', [MembershipController::class, 'delete']);
    Route::put('/memberships/{type}/{id}/members/{membership}', [MembershipController::class, 'update']);
});
