<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the connections below you wish to use as
    | your default connection for all work. Of course, you may use many
    | connections at once using the manager class.
    |
    */

    'default' => env('REVERB_CONNECTION', 'main'),

    /*
    |--------------------------------------------------------------------------
    | Reverb Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the connections setup for your application. Examples of
    | configuring each supported driver is shown below.
    |
    */

    'connections' => [
        'main' => [
            'host' => env('REVERB_SERVER_HOST', '0.0.0.0'),
            'port' => env('REVERB_SERVER_PORT', 8080),
            'timeout' => env('REVERB_CONNECTION_TIMEOUT', 0),
            'secrets' => [
                env('REVERB_APP_KEY'),
            ],
            'tls' => [
                'verify_peer' => env('REVERB_VERIFY_PEER', true),
                'verify_peer_name' => env('REVERB_VERIFY_PEER_NAME', true),
                'allow_self_signed' => env('REVERB_ALLOW_SELF_SIGNED', false),
            ],
            'max_connections' => env('REVERB_MAX_CONNECTIONS', 1000),
            'max_connection_lifetime' => env('REVERB_MAX_CONNECTION_LIFETIME', 60 * 60 * 6),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Reverb Channels
    |--------------------------------------------------------------------------
    |
    | Here are each of the channels setup for your application. For detailed
    | information about all of the available options, please see the reverb
    | documentation.
    |
    */

    'channels' => [
        'default' => [
            'route' => 'reverb',
            'domains' => [
                env('APP_URL'),
                env('REVERB_DOMAIN'),
            ],
            'middleware' => [
                'web',
                'auth',
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Broadcasting Driver
    |--------------------------------------------------------------------------
    |
    | The broadcasting driver specifies the mechanism that should be used
    | when broadcasting events. Currently, the options are 'reverb' or 'null'
    |
    */

    'broadcaster' => env('REVERB_BROADCASTER', 'reverb'),

    /*
    |--------------------------------------------------------------------------
    | Heartbeat Monitor Interval
    |--------------------------------------------------------------------------
    |
    | The interval in seconds between sending heartbeat messages to the server.
    | This is used for monitoring connection health.
    |
    */

    'heartbeat_interval' => env('REVERB_HEARTBEAT_INTERVAL', 30),

    /*
    |--------------------------------------------------------------------------
    | Presence Channel Status Check Interval
    |--------------------------------------------------------------------------
    |
    | The interval in seconds between checking for presence on specific channels.
    | This is used in 'presence' channels to manage who's joined or left.
    |
    */

    'presence_check_interval' => env('REVERB_PRESENCE_CHECK_INTERVAL', 60),

    /*
    |--------------------------------------------------------------------------
    | Queue
    |--------------------------------------------------------------------------
    |
    | Configure the queue options for the reverb server when it's running.
    | By default, it will use the queue connection specified in your queue.php
    | config file. You may also specify a specific queue to use here.
    |
    */

    'queue' => [
        'connection' => env('REVERB_QUEUE_CONNECTION'),
        'queue' => env('REVERB_QUEUE'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Server Path
    |--------------------------------------------------------------------------
    |
    | This option specifies the path where the reverb server should be run
    | from. By default, it will use the root directory of your application.
    |
    */

    'server_path' => env('REVERB_SERVER_PATH', base_path()),
];