<?php

namespace App\Services;

use App\DTO\InvitationDTO;
use App\Enums\NotificationType;
use App\Models\Invitation;
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

                $user->notifications()->create([
                    'type' => NotificationType::NORMAL,
                    'title' => 'Invited to join w/' . $inviteable->name,
                    'description' => $invitationDTO->message,
                    'link' => '/app/invitations/' . $invitation['token'],
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

            /**@var App\Models\User $user */
            $user = auth()->user();

            // Check if user is already a member 
            if ($user->memberFor($inviteable)) {
                abort(402, 'You\'re aleady a member of - ' . $inviteable->name);
            };

            /**@var App\Models\Membership $member */
            $member = $inviteable->members()->create([
                'user_id' => auth()->id(),
            ]);

            $member->assignRole($invitation->role);

            // Mark invitation as expired so its no longer accessible
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
