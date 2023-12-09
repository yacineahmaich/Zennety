<?php

namespace App\Enums;

class Visibility
{
    const PUBLIC = 'Public';
    const PRIVATE = 'Private';

    public static function values(): array
    {
        return [
            self::PUBLIC,
            self::PRIVATE
        ];
    }
}
