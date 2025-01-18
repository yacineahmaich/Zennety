<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

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

    public function update(UpdateProfileRequest $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $user->update($request->validated());

        return response()->noContent();
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $oldPassword = $request->validated('old_password');

        if (!Hash::check($oldPassword, $user->password)) {
            return response()->json(["message" => "Old password incorrect"], 402);
        }

        $user->update(["password" => Hash::make($request->new_password)]);

        return response()->noContent();
    }

    public function bookmark(Request $request, $type, $id)
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $pins = $user->pins;
        $key = "{$type}_{$id}";

        if (isset($pins[$key])) {
            unset($pins[$key]);
        } else {
            $pins[$key] = ["type" => $type, "id" => $id];
        }

        $user->update(["pins" => $pins]);

        return response()->noContent();
    }

    public function setAvatar(Request $request)
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $request->validate([
            "avatar" => ["required", "image", "max:1024"]
        ]);

        $user->addMediaFromRequest('avatar')
            ->toMediaCollection('avatar');

        return response()->noContent();
    }

    public function deleteAvatar()
    {
        /**
         * @var \App\Models\User
         */
        $user = auth()->user();

        $user->getFirstMedia('avatar')?->deleteOrFail();

        return response()->noContent();
    }
}
