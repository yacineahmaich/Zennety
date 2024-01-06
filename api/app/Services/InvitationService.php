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

            foreach ($users as $user) {
                $invitation = [
                    'token' => Str::uuid(),
                    'invited_email' => $user->email,
                    'message' => $invitationDTO->message,
                    'role' => $invitationDTO->role,
                    'user_id' => auth()->id(),
                    'expires_at' => now()->addWeek(),
                ];

                Notification::create([
                    'type' => NotificationType::NORMAL,
                    'title' => 'Invited to join w/' . $inviteable->name,
                    'description' => $invitationDTO->message,
                    'link' => '/app/invitations/' . $invitation['token'],
                    'user_id' => $user->id
                ]);

                $invitations[] = $invitation;
            }

            $inviteable->invitations()->createMany($invitations);
        });
    }

    public function accept(Invitation $invitation)
    {
        DB::transaction(function () use ($invitation) {
            $inviteable = $invitation->inviteable;

            /**@var App\Models\Membership $member */
            $member = $inviteable->members()->create([
                'user_id' => auth()->id(),
            ]);

            $member->assignRole($invitation->role);

            $invitation->update([
                "expires_at" => now()
            ]);
        });
    }

    public function reject(Invitation $invitation)
    {
        $invitation->update([
            "expires_at" => now()
        ]);
    }
}
