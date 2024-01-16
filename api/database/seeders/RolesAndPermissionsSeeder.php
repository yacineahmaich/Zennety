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

        // Create permissions
        Permission::create(['name' => 'view']);
        Permission::create(['name' => 'update']);
        Permission::create(['name' => 'delete']);

        // Create roles
        $owner = Role::create(['name' => \App\Enums\Role::OWNER]);
        $admin = Role::create(['name' => \App\Enums\Role::ADMIN]);
        $member = Role::create(['name' => \App\Enums\Role::MEMBER]);
        $viewer = Role::create(['name' => \App\Enums\Role::VIEWER]);

        // Assign permissions to roles
        $owner->givePermissionTo(
            'view',
            'update',
            'delete',
        );
        $admin->givePermissionTo(
            'view',
            'update',
        );
        $member->givePermissionTo(
            'view',
        );
        $viewer->givePermissionTo(
            'view',
        );

    }
}
