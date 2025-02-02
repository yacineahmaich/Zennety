<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMembershipRequest;
use App\Http\Resources\MembershipResource;
use App\Models\Membership;
use App\Services\MembershipService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class MembershipController extends Controller
{

    public function __construct(
        public MembershipService $service
    )
    {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, $type, $id): ResourceCollection
    {
        $this->authorize('viewAny', [Membership::class, getModel($type, $id)]);

        $memberships = $this->service->getMemberships($type, $id,$request->all());

        return MembershipResource::collection($memberships);
    }

    /**
     * Update the specified resource.
     */
    public function update(UpdateMembershipRequest $request, string $type, int $id, Membership $membership): Response
    {
        $this->authorize('update', $membership);

        $this->service->updateMembership($membership, $request->validated());

        return response()->noContent();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete(string $type, int $id, Membership $membership): Response
    {
        $this->authorize('delete', $membership);

        $this->service->deleteMembership($membership);

        return response()->noContent();
    }
}
