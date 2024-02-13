<?php

namespace App\Http\Requests;

use App\Enums\Visibility;
use Illuminate\Foundation\Http\FormRequest;

class StoreWorkspaceRequest extends FormRequest
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
        // TODO: User Cannot have duplicated workspace name (filter workspaces by membership)
        return [
            'name' => [
                'required',
                'max:25'
            ],
            'description' => [
                'max:255'
            ],
            'visibility' => [
                'in:' . implode(',', Visibility::values())
            ],
        ];
    }
}
