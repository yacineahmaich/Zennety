<?php

namespace App\Http\Requests;

use App\Enums\Priority;
use Illuminate\Foundation\Http\FormRequest;

class StoreCardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required'
            ],
            'assignee' => [
                'nullable',
                'exists:memberships,id'
            ],
            'priority' => [
                'nullable',
                'in:' . implode(',', Priority::values())
            ],
            'deadline' => [
                'nullable',
                'date'    
            ]
        ];
    }
}
