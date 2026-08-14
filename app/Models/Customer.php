<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Override;

class Customer extends Model
{
    //
    use HasFactory, SoftDeletes, HasUlids;

    protected $fillable = [
        'customer_code',
        'full_name',
        'credit_score',
        'geography',
        'phone',
        'gender',
        'age',
        'tenure',
        'balance',
        'num_of_products',
        'has_credit_card',
        'is_active_member',
        'estimated_salary',
        'exited',
        'created_by',
        'updated_by',
    ];

    
    protected function casts(): array
    {
        return [
            'balance:' => 'decimal:2',
            'estimated_salary:' => 'decimal:2',
            'has_credit_card:' => 'boolean',
            'is_active_member' => 'boolean',
            'exited' => 'boolean', 
        ];
    }

    public function predictions(): HasMany{
        return $this->hasMany(Prediction::class)->orderByDesc('predite');
    }

    /** Prediksi paling baru saja, dipakai untuk badge risiko di daftar nasabah */
    public function latestPrediction(): HasMany
    {
        return $this->hasMany(Prediction::class)->latest('predicted_at')->limit(1);
    }
 
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
 
    public function updater(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
