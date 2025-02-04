<?php

namespace App\DTO;

class CardDTO extends BaseDTO
{
    public ?string $name;
    public ?string $description;
    public ?string $priority;
    public ?string $deadline;
    public ?string $assignee;
}
