<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function register(Request $request): JsonResponse
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        $token = $user->createToken("auth")->plainTextToken;

        return response()->json([
            "user" => $user,
            "token" => $token
        ]);
    }

    /**
     * Handle an incoming login request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        /** @var User */
        $user = auth()->user();
        $token = $user->createToken("auth")->plainTextToken;

        return response()->json([
            "user" => UserResource::make($user),
            "token" => $token
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function logout(Request $request): Response
    {
        /** @var User */
        $user = $request->user();
        $user->tokens()->delete();

        return response()->noContent();
    }
}
