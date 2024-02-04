<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateMembershipRequest;
use App\Http\Resources\MembershipResource;
use App\Models\Membership;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function index(Request $request)
    {
        $role = $request->get('role');
        $search = $request->get('search');

        $memberships = Membership::fromRequest($request)
            ->with('user')
            ->with('roles')
            ->whereHas('user', fn ($q) => $q->search($search))
            ->whereHas('roles', fn ($q) =>  $role ? $q->where('roles.name', $role) : null)
            ->paginate();

        return MembershipResource::collection($memberships);
    }

    public function update(UpdateMembershipRequest $request, string $type, int $id, Membership $membership)
    {
        $membership->syncRoles([$request->validated('role')]);

        return response()->noContent();
    }

    public function delete(string $type, int $id, Membership $membership)
    {
        $membership->delete();

        return response()->noContent();
    }
}
