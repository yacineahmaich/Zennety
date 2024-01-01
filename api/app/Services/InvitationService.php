<?php

namespace App\Services;

use App\DTO\InvitationDTO;
use App\Enums\NotificationType;
use App\Models\Invitation;
use App\Models\Notification;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class InvitationService
{

    public function send($inviteable, InvitationDTO $invitationDTO)
    {
        DB::transaction(function () use ($inviteable, $invitationDTO) {
            $users = User::whereIn('id', $invitationDTO->users)->get();

            $invitations = [];
            $notifications = [];

            foreach ($users as $user) {
                $invitation = [
                    'token' => Str::uuid(),
                    'invited_email' => $user->email,
                    'message' => $invitationDTO->message,
                    'role' => $invitationDTO->role,
                    'user_id' => auth()->id(),
                    'expires_at' => now()->addWeek(),
                ];

                $notification = [
                    'type' => NotificationType::NORMAL,
                    'title' => 'Invited to join w/' . $inviteable->name,
                    'description' => $invitationDTO->message,
                    'link' => '/app/invitations/' . $invitation['token'],
                    'user_id' => $user->id
                ];

                $invitations[] = $invitation;
                $notifications[] = $notification;
            }

            $inviteable->invitations()->createMany($invitations);
            Notification::insert($notifications);
        });
    }

    public function accept(Invitation $invitation)
    {

        $inviteable = $invitation->inviteable;

        /**@var App\Models\Membership $member */
        $member = $inviteable->members()->create([
            'user_id' => auth()->id(),
        ]);

        $member->assignRole($invitation->role);
    }
}
