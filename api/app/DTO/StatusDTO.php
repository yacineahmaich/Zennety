<?php

namespace App\DTO;

use Illuminate\Foundation\Http\FormRequest;

readonly class StatusDTO
{
    public function __construct(
        public string $name,
    ) {
    }

    static function fromRequest(FormRequest $request)
    {
        return new self(
            name: $request->validated('name'),
        );
    }
}
