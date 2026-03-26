<?php

namespace App\Http\Controllers;

use App\DTO\OrganizationDTO;
use App\Http\Requests\StoreOrganizationRequest;
use App\Http\Requests\UpdateOrganizationRequest;
use App\Http\Resources\OrganizationResource;
use App\Models\Membership;
use App\Models\Organization;
use App\Services\OrganizationService;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;

class OrganizationController extends Controller
{
    public function __construct(
        public OrganizationService $service
    ) {}

    public function index(Request $request): ResourceCollection
    {
        $this->authorize('viewAny', Organization::class);

        $organizations = $this->service->getMyOrganizations($request->user());

        return OrganizationResource::collection($organizations);
    }

    public function store(StoreOrganizationRequest $request): OrganizationResource
    {
        $this->authorize('create', Organization::class);

        $organization = $this->service->createOrganization(
            OrganizationDTO::from($request->validated()),
            $request->user()
        );

        return OrganizationResource::make($organization);
    }

    public function show(Organization $organization): OrganizationResource
    {
        $this->authorize('view', $organization);

        return OrganizationResource::make($organization->load(['members.user', 'members.roles']));
    }

    public function transferOwnership(
        Request $request,
        Organization $organization,
        Membership $membership
    ): Response {
        $this->authorize('transferOwnership', [$organization, $membership]);

        $this->service->transferOwnership(
            $organization,
            $request->user(),
            $membership
        );

        return response()->noContent();
    }

    public function update(UpdateOrganizationRequest $request, Organization $organization): OrganizationResource
    {
        $this->authorize('update', $organization);

        $updated = $this->service->updateOrganization(
            $organization,
            OrganizationDTO::from($request->validated())
        );

        return OrganizationResource::make($updated);
    }

    public function destroy(Organization $organization): Response
    {
        $this->authorize('delete', $organization);

        $this->service->deleteOrganization($organization);

        return response()->noContent();
    }

    public function updateAvatar(Request $request, Organization $organization): Response
    {
        $this->authorize('update', $organization);

        $this->service->updateOrganizationAvatar($organization, $request->avatar);

        return response()->noContent();
    }
}
