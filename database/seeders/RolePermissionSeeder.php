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
            'dashboard.view',

            'customers.view',
            'customers.create',
            'customers.update',
            'customers.delete',

            'predictions.view',
            'predictions.trigger',

            'analytics.view',
            'reports.view',

            'users.manage',
        ];

        foreach($permissions as $permission){
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $admin = Role::firstOrCreate(['name' => 'Admin', 'guard_name' => 'web']);
        $admin->syncPermissions($permissions);
 
        
 
        $crmStaff = Role::firstOrCreate(['name' => 'CRM Staff', 'guard_name' => 'web']);
        $crmStaff->syncPermissions([
            'dashboard.view',
            'customers.view',
            'customers.create',
            'customers.update',
            'predictions.view',
            'predictions.trigger',
            'analytics.view',
        ]);
    }
}
