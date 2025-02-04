<?php

namespace App\DTO;

class InvitationDTO extends BaseDTO
{
    public ?array $users;
    public ?string $role;
    public ?string $message;
}
