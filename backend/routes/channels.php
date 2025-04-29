<?php

use Illuminate\Support\Facades\Broadcast;
use App\Models\Conversation;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Canal para presencia de usuario (online/offline)
Broadcast::channel('presence.users', function (User $user) {
    return [
        'id' => $user->id,
        'name' => $user->name,
        'status' => $user->status
    ];
});

// Canal para notificaciones personales
Broadcast::channel('user.{userId}', function (User $user, $userId) {
    return (int) $user->id === (int) $userId;
});

// Canal para mensajes de conversación individual
Broadcast::channel('conversation.{conversationId}', function (User $user, $conversationId) {
    $conversation = Conversation::findOrFail($conversationId);
    
    // Verificar si el usuario es participante de la conversación
    return $conversation->participants()
        ->where('user_id', $user->id)
        ->where('status', 'active')
        ->exists();
});

// Canal para notificaciones de escritura
Broadcast::channel('typing.{conversationId}', function (User $user, $conversationId) {
    $conversation = Conversation::findOrFail($conversationId);
    
    // Verificar si el usuario es participante de la conversación
    return $conversation->participants()
        ->where('user_id', $user->id)
        ->where('status', 'active')
        ->exists();
});

// Canal para mensajes de grupo
Broadcast::channel('group.{conversationId}', function (User $user, $conversationId) {
    $conversation = Conversation::findOrFail($conversationId);
    
    // Verificar si es una conversación grupal y el usuario pertenece a ella
    return $conversation->type === 'group' && $conversation->participants()
        ->where('user_id', $user->id)
        ->where('status', 'active')
        ->exists();
});