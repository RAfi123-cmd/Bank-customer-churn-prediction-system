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
        Schema::create('customers', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('customer_id')->unique();
            $table->string('full_name')->nullable();
            $table->unsignedBigInteger('credit_score')->nullable();
            $table->string('country')->nullable();
            $table->string('phone')->nullable();
            $table->enum('gender',['male', 'female'])->nullable();
            $table->unsignedBigInteger('age')->nullable('');
            $table->unsignedBigInteger('tenure')->default(0);
            $table->decimal('balance', 15, 2)->default(0);
            $table->unsignedTinyInteger('product_number')->default(1);
            $table->boolean('credit_card')->default(false);
            $table->boolean('active_member')->default(true);
            $table->decimal('estimated_salary', 15, 2)->nullable();
            $table->boolean('exited')->nullable();
            $table->foreignUuid('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignUuid('update_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index('active_member');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
