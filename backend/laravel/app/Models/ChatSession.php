<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatSession extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'is_group',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_group' => 'boolean',
    ];

    /**
     * Get the messages for the chat session.
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    /**
     * Get the users for the chat session.
     */
    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }
}
