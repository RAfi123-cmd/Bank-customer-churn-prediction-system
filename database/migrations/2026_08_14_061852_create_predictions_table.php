<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('predictions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('customer_id')->constrained('customers')->cascadeOnDelete();
            $table->decimal('churn_probability', 6, 5);
            $table->enum('risk_level', ['low', 'medium', 'high']);
            $table->string('model_version')->nullable();
            $table->jsonb('raw_response')->nullable();
            $table->foreignUuid('requested_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps('predicted_at')->useCurrent();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['customer_id', 'predicted_at']);
            $table->index(['risk_level']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('predictions');
    }
};
