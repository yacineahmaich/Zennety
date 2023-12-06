<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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

        $owner = Role::create(['name' => 'owner']);
        $admin = Role::create(['name' => 'admin']);
        $member = Role::create(['name' => 'member']);
        $viewer = Role::create(['name' => 'viewer']);

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
