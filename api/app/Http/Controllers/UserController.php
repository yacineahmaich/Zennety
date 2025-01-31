<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class UserController extends Controller
{

    public function __construct(
        private readonly UserService $service
    ){}

    public function me(Request $request): UserResource
    {
        /** @var User $user */
        $user = $request->user();

        return UserResource::make($user->load(['memberships']));
    }

    public function search($search): ResourceCollection
    {
        $users = $this->service->searchUsers($search);

        return UserResource::collection($users);
    }

    public function update(UpdateProfileRequest $request): UserResource
    {
        $updatedUser = $this->service->updateUser(
            $request->user(),
            $request->validated()
        );

        return UserResource::make($updatedUser);
    }

    public function updatePassword(UpdatePasswordRequest $request): Response
    {
        $this->service->updatePassword(
            $request->user(),
            $request->validated('old_password')
        );

        return response()->noContent();
    }

    public function bookmark(Request $request, $type, $id): Response
    {
        $this->service->bookmarkItem($request->user(), $type, $id);

        return response()->noContent();
    }

    /**
     * Update user avatar
     */
    public function updateAvatar(Request $request): Response
    {
        $this->service->updateUserAvatar($request->user(), $request->avatar);

        return response()->noContent();
    }
}
