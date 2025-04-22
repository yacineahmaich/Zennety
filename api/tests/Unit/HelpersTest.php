<?php

namespace Tests\Unit;

use App\Models\Workspace;

describe('getModelNamespace', function () {
    test('returns correct namespace', function () {
        expect(getModelNamespace('workspace'))->toBe(Workspace::class);
    });
    
    test('returns null for non existing model', function () {
        expect(getModelNamespace('unknown'))->toBe(null);
    });    
});

describe('getModelPrefix', function () {
    test('returns expected prefix', function () {
        expect(getModelPrefix('workspace'))->toBe('w/')
            ->and(getModelPrefix('board'))->toBe('b/');
    });   
});