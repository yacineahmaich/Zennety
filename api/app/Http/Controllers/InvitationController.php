<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreInvitationRequest;
use App\Http\Requests\UpdateInvitationRequest;
use App\Models\Invitation;
use App\Models\User;
use App\Models\Workspace;
use Ramsey\Uuid\Uuid;

class InvitationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvitationRequest $request, Workspace $worksapce)
    {
        $users = User::query()->whereIn('id', $request->validated('users'))->get();

        $invitations = [];

        foreach ($users as $user) {
            $invitations[] = [
                "token" => Uuid::uuid4(),
                "email" => $user->email,
                "message" => $request->validated('message'),
                "user_id" => auth()->id(),
                "expires_at" => now()->addWeek(),
            ];
        }

        $worksapce->invitations()->createMany($invitations);

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(Invitation $invitation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvitationRequest $request, Invitation $invitation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invitation $invitation)
    {
        //
    }
}
