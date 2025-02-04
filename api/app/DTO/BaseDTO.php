<?php

namespace App\DTO;

use ReflectionClass;

abstract class BaseDTO
{
    /**
     * BaseDTO constructor to dynamically set properties
     */
    public function __construct(array $data = [])
    {
        $reflection = new ReflectionClass($this);
        foreach ($reflection->getProperties() as $property) {
            $name = $property->getName();
            $this->{$name} = $data[$name] ?? null;
        }
    }

    /**
     * Create a DTO instance from an array
     */
    public static function from(array $data): static
    {
        return new static($data);
    }

    /**
     * Convert DTO properties to an array excluding null values
     */
    public function toArray(bool $include_nullable = false): array
    {
        if($include_nullable) {
            return get_object_vars($this);
        }

        return array_filter(get_object_vars($this), fn($value) => !is_null($value));
    }
}
