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
        Schema::create('conversation_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('role', ['normal', 'admin'])->default('normal'); // Para grupos
            $table->enum('status', ['active', 'left', 'removed'])->default('active');
            $table->timestamp('last_read_at')->nullable();
            $table->boolean('notifications_enabled')->default(true);
            $table->timestamps();

            // Combinación única para evitar participantes duplicados
            $table->unique(['conversation_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversation_participants');
    }
};