<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $request)
    {
        $user = $request->user();

        return UserResource::make($user->load(['memberships']));
    }
    public function search($search)
    {
        $users = User::query()
            ->where('id', '!=', auth()->id())
            ->where(function ($query) use ($search) {
                $query->where('users.name', 'like', '%' . $search . '%')
                    ->orWhere('users.email', 'like', '%' . $search . '%');
            })
            ->take(8)
            ->get();

        return UserResource::collection($users);
    }
}
