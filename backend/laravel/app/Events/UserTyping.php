<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class UserTyping implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * The user that is typing.
     *
     * @var \App\Models\User
     */
    public $user;

    /**
     * The chat session ID.
     *
     * @var int
     */
    public $chatSessionId;

    /**
     * Create a new event instance.
     *
     * @param  \App\Models\User  $user
     * @param  int  $chatSessionId
     * @return void
     */
    public function __construct(User $user, $chatSessionId)
    {
        $this->user = $user;
        $this->chatSessionId = $chatSessionId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('chat.' . $this->chatSessionId);
    }
}
