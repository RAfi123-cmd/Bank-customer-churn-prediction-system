<?php

namespace App\Services;

use App\Models\Customer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Exception;

class ChurnPredictionService
{
    protected string $baseUrl;
    protected int $timeout;

    private const RISK_LEVEL_MAP = [
        'Hijau' => 'low',
        'Kuning' => 'medium',
        'Merah' => 'high',
    ];

    public function __construct()
    {
        $this->baseUrl = config('services.ml_churn.base_url');
        $this->timeout = config('services.ml_churn.timeout');
    }

    public function predict(Customer $customer): array
    {
        $payload = [
            'CustomerId'      => (string) $customer->id,
            'Surname'         => $customer->surname,
            'CreditScore'     => (int) $customer->credit_score,
            'Geography'       => $customer->country,
            'Gender'          => $customer->gender,
            'Age'             => (int) $customer->age,
            'Tenure'          => (int) $customer->tenure,
            'Balance'         => (float) $customer->balance,
            'NumOfProducts'   => (int) $customer->product_number,
            'HasCrCard'       => (int) $customer->credit_card,
            'IsActiveMember'  => (int) $customer->active_member,
            'EstimatedSalary' => (float) $customer->estimated_salary,
        ];

        $response = Http::baseUrl($this->baseUrl)
            ->timeout($this->timeout)
            ->acceptJson()
            ->post('/predict', $payload);

        if ($response->failed()) {
            Log::error('ML API prediction failed', [
                'status' => $response->status(),
                'body'   => $response->body(),
                'nasabah_id' => $customer->id,
            ]);

            throw new Exception(
                $response->status() === 422
                    ? 'Data nasabah tidak valid untuk model ML.'
                    : 'Gagal terhubung ke service prediksi churn.'
            );
        }
        
        $result = $response->json();

        $result['risk_level'] = self::RISK_LEVEL_MAP[$result['risk_level']] ?? 'low';

        return $result;
    }

    public function isHealthy(): bool
    {
        try {
            $res = Http::baseUrl($this->baseUrl)->timeout(3)->get('/health');
            return $res->successful() && ($res->json('status') === 'ok');
        } catch (Exception $e) {
            return false;
        }
    }
}