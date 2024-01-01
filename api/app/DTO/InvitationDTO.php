<?php

namespace App\DTO;

use Illuminate\Foundation\Http\FormRequest;

readonly class InvitationDTO
{
    public function __construct(
        public array $users,
        public string $role,
        public string $message,
    ) {
    }

    static function fromRequest(FormRequest $request)
    {
        return new self(
            users: $request->validated('users'),
            role: $request->validated('role'),
            message: $request->validated('message'),
        );
    }
}
