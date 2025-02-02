<?php

namespace App\Http\Controllers;

use App\Http\Requests\InvitationRequest;
use App\Http\Resources\InvitationResource;
use App\Models\Invitation;
use App\Services\InvitationService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class InvitationController extends Controller
{
    public function __construct(
        public InvitationService $service
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $type, $id): ResourceCollection
    {
        $invitations = $this->service->getInvitations($type,$id, $request->all());

        return InvitationResource::collection($invitations);
    }

    /**
     * Send a membership invitation .
     */
    public function invite(InvitationRequest $request, $type, $id): Response
    {
        $this->service->sendInvitation($type, $id, $request->validated());

        return response()->noContent();
    }

    /**
     * Accept a membership invitation.
     */
    public function accept(Request $request, Invitation $invitation): Response
    {
        $this->service->acceptInvitation($invitation, $request->user());

        return response()->noContent();
    }

    /**
     * Reject a membership invitation.
     */
    public function reject(Invitation $invitation): Response
    {
        $this->service->rejectInvitation($invitation);

        return response()->noContent();
    }

    /**
     * Display the specified resource.
     */
    public function show(Invitation $invitation): InvitationResource
    {
        return InvitationResource::make($invitation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invitation $invitation): Response
    {
        $this->service->deleteInvitation($invitation);

        return response()->noContent();
    }
}
