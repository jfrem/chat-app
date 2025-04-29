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
        Schema::table('users', function (Blueprint $table) {
            // Agregar los campos específicos para el sistema de chat
            $table->string('avatar')->nullable()->after('password');
            $table->enum('status', ['online', 'offline', 'away'])->default('offline')->after('avatar');
            $table->timestamp('last_online_at')->nullable()->after('status');
            $table->json('settings')->nullable()->after('last_online_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Eliminar los campos agregados si se revierte la migración
            $table->dropColumn(['avatar', 'status', 'last_online_at', 'settings']);
        });
    }
};