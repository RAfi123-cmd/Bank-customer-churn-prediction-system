<?php

namespace App\Console\Commands;

use App\Models\Customer;
use Illuminate\Console\Command;

class ImportCustomerFromCsv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'customers:import {path : Path ke file CSV, relatif dari root project}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Import Data Nasabah dari file CSV churn Dataset';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $path = base_path($this->argument('path'));

        if (! file_exists($path)) {
            $this->error("File tidak ditemukan: {$path}");
            return self::FAILURE;
        }

        $handle = fopen($path, 'r');
        $header = fgetcsv($handle); // baris pertama = nama kolom

        $imported = 0;
        $skipped = 0;

        $this->info('Mulai import...');

        while (($row = fgetcsv($handle)) !== false) {
            $data = array_combine($header, $row);

            try {
                Customer::updateOrCreate(
                    ['customer_id' => (string) $data['CustomerId']],
                    [
                        'surname'          => $data['Surname'],
                        'credit_score'     => (int) $data['CreditScore'],
                        'country'          => $data['Geography'],
                        'gender'           => strtolower($data['Gender']),
                        'age'              => (int) $data['Age'],
                        'tenure'           => (int) $data['Tenure'],
                        'balance'          => (float) $data['Balance'],
                        'product_number'   => (int) $data['NumOfProducts'],
                        'credit_card'      => (bool) $data['HasCrCard'],
                        'active_member'    => (bool) $data['IsActiveMember'],
                        'estimated_salary' => (float) $data['EstimatedSalary'],
                        'exited'           => isset($data['Exited']) ? (bool) $data['Exited'] : null,
                    ]
                );
                $imported++;
            } catch (\Exception $e) {
                $skipped++;
                $this->warn("Gagal import CustomerId {$data['CustomerId']}: {$e->getMessage()}");
            }

            if ($imported % 500 === 0) {
                $this->info("...{$imported} nasabah diproses");
            }
        }
        fclose($handle);
        $this->newLine();
        $this->info("Selesai. Berhasil: {$imported}, Gagal: {$skipped}");

        return self::SUCCESS;
    }
}
