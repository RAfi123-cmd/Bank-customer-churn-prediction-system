<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Override;

class Customer extends Model
{
    //
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'customer_id',
        'surname',
        'credit_score',
        'country',
        'gender',
        'age',
        'tenure',
        'balance',
        'product_number',
        'credit_card',
        'active_member',
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
            'credit_card:' => 'boolean',
            'active_member' => 'boolean',
            'exited' => 'boolean', 
        ];
    }

    public function predictions()
    {
        return $this->hasMany(Prediction::class);
    }

    public function latestPrediction()
    {
        return $this->hasOne(Prediction::class)
            ->latest('predicted_at');
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
