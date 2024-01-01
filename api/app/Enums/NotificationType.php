<?php

namespace App\Enums;

class NotificationType
{
    const NORMAL = "Normal";
    const INFO = "Info";
    const WARNING = "Warning";
    const DANGER = "Danger";

    public static function values(): array
    {
        return [
            self::NORMAL,
            self::WARNING,
            self::DANGER,
        ];
    }
}
