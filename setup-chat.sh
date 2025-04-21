#!/bin/bash

echo "Creando modelo Message..."
docker-compose exec backend bash -c "cd /var/www/html/laravel && php artisan make:model Message -m"

echo "Creando controlador ChatController..."
docker-compose exec backend bash -c "cd /var/www/html/laravel && php artisan make:controller ChatController"

echo "Creando evento MessageSent..."
docker-compose exec backend bash -c "cd /var/www/html/laravel && php artisan make:event MessageSent"

echo "Configurando tablas de mensajes..."
cat << 'EOF' > backend/migrations-messages.php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->text('message');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
EOF

echo "Copiando migración de mensajes..."
docker-compose exec -T backend bash -c "cat > /var/www/html/laravel/database/migrations/2023_01_01_000000_create_messages_table.php" < backend/migrations-messages.php

echo "Creando modelo Message..."
cat << 'EOF' > backend/Message.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['message', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
EOF

echo "Copiando modelo Message..."
docker-compose exec -T backend bash -c "cat > /var/www/html/laravel/app/Models/Message.php" < backend/Message.php

echo "Creando evento MessageSent..."
cat << 'EOF' > backend/MessageSent.php
<?php

namespace App\Events;

use App\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    public function broadcastOn()
    {
        return new PresenceChannel('chat');
    }
}
EOF

echo "Copiando evento MessageSent..."
docker-compose exec -T backend bash -c "cat > /var/www/html/laravel/app/Events/MessageSent.php" < backend/MessageSent.php

echo "Creando controlador ChatController..."
cat << 'EOF' > backend/ChatController.php
<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return view('chat');
    }

    public function fetchMessages()
    {
        return Message::with('user')->get();
    }

    public function sendMessage(Request $request)
    {
        $message = auth()->user()->messages()->create([
            'message' => $request->input('message')
        ]);

        broadcast(new MessageSent($message))->toOthers();

        return ['status' => 'success'];
    }
}
EOF

echo "Copiando controlador ChatController..."
docker-compose exec -T backend bash -c "cat > /var/www/html/laravel/app/Http/Controllers/ChatController.php" < backend/ChatController.php

echo "Configurando rutas..."
cat << 'EOF' > backend/web.php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChatController;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/chat', [ChatController::class, 'index'])->name('chat');
Route::get('/messages', [ChatController::class, 'fetchMessages']);
Route::post('/messages', [ChatController::class, 'sendMessage']);

Route::get('/api/health', function () {
    return ['status' => 'ok', 'message' => 'API is running'];
});
EOF

echo "Copiando rutas..."
docker-compose exec -T backend bash -c "cat > /var/www/html/laravel/routes/web.php" < backend/web.php

echo "Ejecutando migraciones..."
docker-compose exec backend bash -c "cd /var/www/html/laravel && php artisan migrate"

echo "¡Controlador de chat básico creado!"