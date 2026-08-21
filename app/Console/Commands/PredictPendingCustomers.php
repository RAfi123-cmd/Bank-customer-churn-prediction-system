<?php

namespace App\Console\Commands;

use App\Models\Customer;
use App\Models\Prediction;
use App\Services\ChurnPredictionService;
use Illuminate\Console\Command;

class PredictPendingCustomers extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'customers:predict-pending';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Jalankan prediksi churn untuk semua nasabah yang belum pernah diprediksi';

    public function handle(ChurnPredictionService $churnService): int
    {
        $pending = Customer::doesntHave('predictions')->get();

        if ($pending->isEmpty()) {
            $this->info('Tidak ada nasabah yang perlu diprediksi.');
            return self::SUCCESS;
        }

        $this->info("Memproses {$pending->count()} nasabah...");
        $bar = $this->output->createProgressBar($pending->count());

        $success = 0;
        $failed = 0;

        foreach ($pending as $customer) {
            try {
                $result = $churnService->predict($customer);

                Prediction::create([
                    'customer_id'       => $customer->id,
                    'churn_probability' => $result['churn_probability'],
                    'risk_level'        => Prediction::riskLevelFromProbability($result['churn_probability']),
                    'model_version'     => $result['model_version'] ?? null,
                    'raw_response'      => $result,
                    'predicted_at'      => now(),
                ]);

                $success++;
            } catch (\Exception $e) {
                $failed++;
                $this->newLine();
                $this->warn("Gagal prediksi CustomerId {$customer->customer_id}: {$e->getMessage()}");
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine(2);
        $this->info("Selesai. Berhasil: {$success}, Gagal: {$failed}");

        return self::SUCCESS;
    }
}
