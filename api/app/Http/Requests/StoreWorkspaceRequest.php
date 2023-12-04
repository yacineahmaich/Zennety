<?php

namespace App\Http\Requests;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
                'min:4',
                'max:55'
            ],
            'description' => [
                'max:255'
            ],
            'visibility' => [
                'in:Public,Private'
            ],
            // User can have only one memebership for wokspace/board
            Rule::unique('memberships', 'membershipable_id')->where('user_id', auth()->id())
        ];
    }
}
