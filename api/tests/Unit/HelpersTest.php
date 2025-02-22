<?php

namespace Tests\Unit;

use App\Models\Workspace;

test('getModelNamespace returns correct namespace', function () {
    expect(getModelNamespace('workspace'))->toBe(Workspace::class);
});

test('getModelNamespace returns null for non existing model', function () {
    expect(getModelNamespace('unknown'))->toBe(null);
});

test('getModelPrefix returns expected prefix', function () {
    expect(getModelPrefix('workspace'))->toBe('w/')
        ->and(getModelPrefix('board'))->toBe('b/');
});

//test('getModel returns expected model', function() {
//   $user = User::factory()->create();
//
//   expect(getModel('user', $user->id))->toBe($user);
//});
