<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            RolePermissionSeeder::class,
        ]);
        
        $crmStaff = User::factory()->create([
            'name' => 'CRM Staff',
            'email' => 'crm@gmail.com'
        ]);

        $crmStaff->assignRole('CRM Staff');
    }
}
