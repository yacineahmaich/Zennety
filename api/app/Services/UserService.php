<?php


namespace App\Services;

use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function searchUsers($search): Collection
    {
        /** @var Collection<User> $users */
        $users = User::query()
            ->where('id', '!=', auth()->id())
            ->where(function ($query) use ($search) {
                $query->where('users.name', 'like', '%' . $search . '%')
                    ->orWhere('users.email', 'like', '%' . $search . '%');
            })
            ->take(8)
            ->get();

        return $users;
    }

    public function updateUser(User $user, array $data): User
    {
        return tap($user)->update($data);
    }

    public function updatePassword(User $user, string $password): void
    {
        if (!Hash::check($password, $user->password)) {
            throw new Exception('Old password incorrect', 200);
        }

        $user->update(["password" => Hash::make($password)]);
    }

    public function bookmarkItem(User $user, string $type, int $id): void
    {
        $pins = $user->pins ?? [];
        $key = "{$type}_{$id}";

        if (isset($pins[$key])) {
            unset($pins[$key]);
        } else {
            $pins[$key] = ["type" => $type, "id" => $id];
        }

        $user->update(["pins" => $pins]);
    }

    public function updateUserAvatar(User $user, $avatar): void
    {
        if($avatar === "unset") {
            $user->getFirstMedia('avatar')?->delete();
        }elseif(is_uploaded_file($avatar)) {
            $user->addMedia($avatar)
                ->toMediaCollection('avatar');
        }
    }
}
