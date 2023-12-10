<?php

namespace App\DTO;

use Illuminate\Foundation\Http\FormRequest;

readonly class BoardDTO
{
    public function __construct(
        public string $name,
        public ?string $description,
        public string $visibility,
    ) {
    }

    static function fromRequest(FormRequest $request)
    {
        return new self(
            name: $request->validated('name'),
            description: $request->validated('description'),
            visibility: $request->validated('visibility'),
        );
    }
}
