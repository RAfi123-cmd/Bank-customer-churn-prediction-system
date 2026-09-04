<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use Override;

class Prediction extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'customer_id',
        'churn_probability',
        'risk_level',
        'model_version',
        'churn_percentage',
        'requested_by',
        'predicted_at'
    ];
    protected function casts(): array

    {
        return [
            'churn_probability' => 'decimal:5',
            'churn_percentage' => 'decimal:2',
            'predicted_at' => 'datetime',
        ];
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
 
    public function requestedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'requested_by');
    }
 
    
    public static function riskLevelFromProbability(float $probability): string
    {
        return match (true) {
            $probability >= 0.7 => 'high',   
            $probability >= 0.3 => 'medium', 
            default => 'low',                
        };
    }
}
