<?php

namespace App\Enums;

class Priority
{
    const NORMAL = 'Normal';
    const MEDIUM = 'Medium';
    const HIGH = 'Hight';
    const URGENT = 'Urgent';

    public static function values(): array
    {
        return [
            self::NORMAL,
            self::MEDIUM,
            self::HIGH,
            self::URGENT
        ];
    }
}
