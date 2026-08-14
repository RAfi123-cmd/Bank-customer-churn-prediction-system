<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'customers.view',
            'customers.create',
            'customers.view',
            'customers.update',
            'customers.delete',
            'predictions.view',
            'predictions.trigger',
            'users.manage',
            'dashboard.view'
        ];

        foreach($permissions as $permission){
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $admin = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $admin->syncPermissions($permissions);
 
        $manager = Role::firstOrCreate(['name' => 'Manager', 'guard_name' => 'web']);
        $manager->syncPermissions([
            'customers.view',
            'predictions.view',
            'dashboard.view',
        ]);
 
        $crmStaff = Role::firstOrCreate(['name' => 'CRM Staff', 'guard_name' => 'web']);
        $crmStaff->syncPermissions([
            'customers.view',
            'customers.create',
            'customers.update',
            'predictions.view',
            'predictions.trigger',
            'dashboard.view',
        ]);
    }
}
