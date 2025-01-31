<?php

namespace App\Http\Controllers;

use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class NotificationController extends Controller
{
    public function __construct(
        public NotificationService $service
    ){}

    /**
     * Display a listing of user notifications.
     */
    public function index(Request $request): ResourceCollection
    {
        $notifications = $this->service->getNotifications($request->user());

        return NotificationResource::collection($notifications);
    }

    /**
     * Mark a user notifications as read.
     */
    public function markAsRead(Notification $notification): Response
    {
        $this->service->markNotificationAsRead($notification);

        return response()->noContent();
    }

    /**
     * Delete a user notifications.
     */
    public function delete(Notification $notification): Response
    {
        $this->service->deleteNotification($notification);

        return response()->noContent();
    }
}
