<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;

class NotificationController extends Controller
{
    /**
     * Display a listing of user notifications.
     */
    public function index()
    {
        /**@var App\Models\User $user */
        $user = auth()->user();

        $notifications = $user->notifications;

        return NotificationResource::collection($notifications);
    }
}
