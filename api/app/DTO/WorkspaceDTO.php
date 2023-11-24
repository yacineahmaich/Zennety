<?php

namespace App\DTO;

readonly class WorkspaceDTO
{
    public function __construct(
        public string $name,
        public ?string $description,
    ) {
    }
}
