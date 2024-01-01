<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        Permission::create(['name' => 'view-workspace']);
        Permission::create(['name' => 'update-workspace']);
        Permission::create(['name' => 'delete-workspace']);

        $owner = Role::create(['name' => \App\Enums\Role::OWNER]);
        $admin = Role::create(['name' => \App\Enums\Role::ADMIN]);
        $member = Role::create(['name' => \App\Enums\Role::MEMBER]);
        $viewer = Role::create(['name' => \App\Enums\Role::VIEWER]);

        $owner->givePermissionTo(
            'view-workspace',
            'update-workspace',
            'delete-workspace',
        );

        $admin->givePermissionTo(
            'view-workspace',
            'update-workspace',
            'delete-workspace',
        );

        $member->givePermissionTo(
            'view-workspace',
        );

        $viewer->givePermissionTo(
            'view-workspace',
        );
    }
}
