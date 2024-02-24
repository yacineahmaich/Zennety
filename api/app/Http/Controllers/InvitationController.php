<?php

namespace App\Http\Controllers;

use App\DTO\InvitationDTO;
use App\Http\Requests\InvitationRequest;
use App\Http\Requests\UpdateInvitationRequest;
use App\Http\Resources\InvitationResource;
use App\Models\Board;
use App\Models\Invitation;
use App\Models\Workspace;
use App\Services\InvitationService;
use Illuminate\Http\Request;

class InvitationController extends Controller
{
    public function __construct(
        public InvitationService $service
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $role = $request->get('role');
        $search = $request->get('search');

        $invitations = Invitation::fromRequest($request)
            ->with('invited')
            ->whereHas('invited', fn ($q) => $q->search($search))
            ->where(fn ($q) =>  $role ? $q->where('role', $role) : null)
            ->paginate();

        return InvitationResource::collection($invitations);
    }

    /**
     * Send a membership invitation .
     */
    public function invite(InvitationRequest $request, string $type, int $id)
    {
        $invitable = null;

        if ($type === "workspace") {
            $invitable = Workspace::find($id);
        } else if ($type === "board") {
            $invitable = Board::find($id);
        }

        if (is_null($invitable)) {
            abort(404);
        }


        $this->service->send(
            $invitable,
            InvitationDTO::fromRequest($request)
        );

        return response()->noContent();
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
     * Reject a worksapce/board membership invitation.
     */
    public function reject(Invitation $invitation)
    {
        $this->service->reject($invitation);

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
