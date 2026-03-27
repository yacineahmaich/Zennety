<?php

namespace App\Http\Controllers;

use Database\Seeders\DemoDatabaseSeeder;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class DemoResetController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        if (! config('demo.reset_enabled') || ! is_string(config('demo.reset_token')) || config('demo.reset_token') === '') {
            abort(404);
        }

        $token = $request->header('X-Demo-Reset-Token');
        if (! is_string($token) || ! hash_equals(config('demo.reset_token'), $token)) {
            abort(404);
        }

        Artisan::call('migrate:fresh', [
            '--force' => true,
            '--seeder' => DemoDatabaseSeeder::class,
        ]);

        return response()->json(['ok' => true]);
    }
}
