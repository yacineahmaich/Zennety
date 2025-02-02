<?php


namespace App\Services;

use App\Models\Membership;

class MembershipService
{
    public function getMemberships($type, $id, array $params = []): \Illuminate\Contracts\Pagination\Paginator
    {
        return Membership::from($type, $id)
            ->with(['user', 'roles'])
            ->whereHas('user', fn ($q) => $q->search($params['search'] ?? null))
            ->whereHas('roles', fn ($q) =>  $params['role'] ? $q->where('role', $params['role']) : null)
            ->paginate();
    }

    public function updateMembership(Membership $membership, array $data): Membership
    {
        $membership->syncRoles([$data['role']]);

        return $membership;
    }

    public function deleteMembership(Membership $membership): void
    {
        $membership->delete();
    }
}
