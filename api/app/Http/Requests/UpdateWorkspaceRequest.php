<?php

namespace App\Http\Requests;

use App\Enums\Visibility;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateWorkspaceRequest extends FormRequest
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
                'sometimes',
                'max:100',
                Rule::unique('workspaces', 'name')
                    ->ignore($this->workspace)
            ],
            'description' => [
                'sometimes',
                'max:255'
            ],
            'visibility' => [
                'sometimes',
                'in:' . implode(',', Visibility::values())
            ],
        ];
    }
}
