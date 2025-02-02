<?php

namespace App\Services;

use App\Enums\NotificationType;
use App\Models\Invitation;
use App\Models\Membership;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class InvitationService
{

    public function getInvitations($type, $id, array $params = []): \Illuminate\Contracts\Pagination\Paginator
    {
        $invitations = Invitation::from($type, $id)
            ->with('invited')
            ->whereHas('invited', fn ($q) => $q->search($params['search'] ?? null))
            ->when(fn ($q) =>  $params['role'] ? $q->where('role', $params['role']) : null)
            ->where('expires_at', '>', now())
            ->paginate();

        return $invitations;
    }

    public function sendInvitation($type, $id, array $data): void
    {
        /** @var Illuminate\Database\Eloquent\Model $inviteable */
        if(!$inviteable = getModel($type, $id)) {
            throw new ModelNotFoundException();
        }

        DB::transaction(function () use ($type, $inviteable, $data) {
            $users = User::whereIn('id', $data['users'])->get();

            $invitations = [];

            foreach ($users as $user) {
                $invitation_token = Str::uuid();

                // If there's already an invitation for the user -> Then we delete the old one
                $inviationExists = $inviteable
                    ->invitations()
                    ->where('invited_email', $user->email)
                    ->first();

                if (!is_null($inviationExists)) {
                    $inviationExists->notification()->delete();
                    $inviationExists->delete();
                }

                // Create notification for invitation
                $notification = $user->notifications()->create([
                    'type' => NotificationType::NORMAL,
                    'title' => 'Invited to join ' . getModelPrefix($type) . $inviteable->name,
                    'description' => $data['message'],
                    'link' => '/app/invitations/' . $invitation_token,
                ]);

                $invitations[] = [
                    'token' => $invitation_token,
                    'invited_email' => $user->email,
                    'message' => $data['message'],
                    'role' => $data['role'],
                    'user_id' => auth()->id(),
                    'notification_id' => $notification->id,
                    'expires_at' => now()->addWeek(),
                ];
            }

            $inviteable->invitations()->createMany($invitations);
        });
    }

    public function acceptInvitation(Invitation $invitation, User $user): void
    {
        $inviteable = $invitation->inviteable;

        // Check if user is already a member
        if ($user->memberFor($inviteable)) {
            abort(402, 'You\'re aleady a member in - ' . $inviteable->name);
        };

        DB::transaction(function () use ($invitation, $inviteable, $user) {
            /**@var Membership $member */
            $member = $inviteable->members()->create([
                'user_id' => $user->id,
            ]);

            $member->assignRole($invitation->role);

            $invitation->delete();

            $invitation->notification()->delete();

        });
    }

    public function rejectInvitation(Invitation $invitation): void
    {
        DB::transaction(function () use ($invitation) {
            $invitation->delete();
            $invitation->notification()->delete();
        });
    }

    public function deleteInvitation(Invitation $invitation): void
    {
        $invitation->delete();
    }
}
