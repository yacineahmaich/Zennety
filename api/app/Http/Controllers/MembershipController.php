<?php

namespace App\Http\Controllers;

use App\Http\Resources\MembershipResource;
use App\Models\Membership;
use Illuminate\Http\Request;

class MembershipController extends Controller
{
    public function index(Request $request, int $membershipable_id)
    {
        $role = $request->get('role');
        $search = $request->get('search');
        $namespace = $request->get("namespace"); // App\Models\Workspace or App\Models\Board

        $memberships = Membership::where('membershipable_id', $membershipable_id)
            ->where('membershipable_type', $namespace)
            ->with('user')
            ->with('roles')
            ->whereHas('user', function ($query) use ($search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%');
            })
            ->whereHas('roles', function ($q) use ($role) {
                if ($role) {
                    $q->where('roles.name', $role);
                }
            })
            ->paginate();

        return MembershipResource::collection($memberships);
    }
}
