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
        Permission::create(['name' => 'create']);
        Permission::create(['name' => 'view']);
        Permission::create(['name' => 'update']);
        Permission::create(['name' => 'delete']);

        // Create roles
        $owner = Role::create(['name' => \App\Enums\Role::OWNER]);
        $admin = Role::create(['name' => \App\Enums\Role::ADMIN]);
        $member = Role::create(['name' => \App\Enums\Role::MEMBER]);
        $guest = Role::create(['name' => \App\Enums\Role::GUEST]);

        // Assign permissions to roles
        $owner->givePermissionTo([
            'create',
            'view',
            'update',
            'delete'
        ]);

        $admin->givePermissionTo([
            'create',
            'view',
            'update'
        ]);

        $member->givePermissionTo([
            'create',
            'view',
            'update'
        ]);

        $guest->givePermissionTo(
            'view',
        );

    }
}
