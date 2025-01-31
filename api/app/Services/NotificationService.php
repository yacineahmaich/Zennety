<?php

namespace App\Services;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class NotificationService
{
    public function getNotifications(User $user): Collection
    {
        return $user->notifications()->latest()->get();
    }

    public function markNotificationAsRead(Notification $notification): void
    {
        $notification->update([
            'is_read' => true,
        ]);
    }

    public function deleteNotification(Notification $notification): void
    {
        $notification->delete();
    }
}
