<?php

namespace App\Services;

use App\DTO\OrganizationDTO;
use App\Enums\Role;
use App\Models\Membership;
use App\Models\Organization;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class OrganizationService
{
    public function getMyOrganizations(User $user): Collection
    {
        return Organization::query()
            ->whereHas('members', fn ($q) => $q->where('user_id', $user->id))
            ->orderBy('name')
            ->get();
    }

    public function createOrganization(OrganizationDTO $organizationDTO, User $user): Organization
    {
        return DB::transaction(function () use ($organizationDTO, $user) {
            /** @var Organization $organization */
            $organization = Organization::create($organizationDTO->toArray());

            /** @var Membership $owner */
            $owner = $organization->members()->create([
                'user_id' => $user->id,
            ]);

            $owner->assignRole(Role::OWNER);

            return $organization;
        });
    }

    public function updateOrganization(Organization $organization, OrganizationDTO $organizationDTO): Organization
    {
        return tap($organization)->update($organizationDTO->toArray());
    }

    public function deleteOrganization(Organization $organization): void
    {
        if ($organization->workspaces()->exists()) {
            abort(422, 'Remove or reassign all workspaces before deleting this organization.');
        }

        $organization->delete();
    }

    public function transferOwnership(Organization $organization, User $user, Membership $member): void
    {
        DB::transaction(function () use ($organization, $user, $member) {
            $currentOwnerMembership = $user->memberFor($organization);

            $currentOwnerMembership->syncRoles([Role::ADMIN]);

            $member->syncRoles([Role::OWNER]);
        });
    }

    public function updateOrganizationAvatar(Organization $organization, mixed $avatar): void
    {
        if ($avatar === 'unset') {
            $organization->getFirstMedia('avatar')?->delete();
        } elseif (is_uploaded_file($avatar)) {
            $organization->addMedia($avatar)
                ->toMediaCollection('avatar');
        }
    }
}
