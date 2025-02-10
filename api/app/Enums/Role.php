<?php

namespace App\Enums;

class Role
{
    const OWNER = "Owner";
    const ADMIN = "Admin";
    const MEMBER = "Member";
    const GUEST = "Guest";

    public static function values(): array
    {
        return [
            self::OWNER,
            self::ADMIN,
            self::MEMBER,
            self::GUEST
        ];
    }
}
