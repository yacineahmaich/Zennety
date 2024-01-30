<?php

namespace App\Http\Controllers;

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
            ->whereHas('roles', fn ($q) =>  $role ? $q->where('roles.name', $role): null)
            ->paginate();

        return MembershipResource::collection($memberships);
    }
}
