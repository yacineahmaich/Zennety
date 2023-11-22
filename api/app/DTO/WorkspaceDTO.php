<?php

namespace App\DTO;

readonly class WorkspaceDTO
{
    public function __construct(
        public string $title,
        public ?string $description,
    ) {
    }
}
