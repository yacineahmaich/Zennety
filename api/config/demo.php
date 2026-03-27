<?php

return [

    'reset_enabled' => filter_var(env('DEMO_RESET_ENABLED', false), FILTER_VALIDATE_BOOLEAN),

    'reset_token' => env('DEMO_RESET_TOKEN'),

];
