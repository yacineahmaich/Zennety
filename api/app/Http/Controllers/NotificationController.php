<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Notification;

class NotificationController extends Controller
{
    /**
     * Display a listing of user notifications.
     */
    public function index()
    {
        /**@var App\Models\User $user */
        $user = auth()->user();

        $notifications = $user->notifications()->latest()->get();

        return NotificationResource::collection($notifications);
    }

    /**
     * Mark a user notifications as read.
     */
    public function markAsRead(Notification $notification)
    {
        $notification->update([
            'is_read' => true,
        ]);

        return response()->json();
    }
}
