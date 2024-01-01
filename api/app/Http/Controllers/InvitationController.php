<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateInvitationRequest;
use App\Http\Resources\InvitationResource;
use App\Models\Invitation;
use App\Services\InvitationService;

class InvitationController extends Controller
{
    public function __construct(
        public InvitationService $service
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Accept a worksapce/board membership invitation.
     */
    public function accept(Invitation $invitation)
    {
        $this->service->accept($invitation);

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(Invitation $invitation)
    {
        return InvitationResource::make($invitation);
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
