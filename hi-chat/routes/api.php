<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post('/login',[AuthController::class,'login']);
Route::post('/logout',[AuthController::class,'logout']);
Route::post('/refresh',[AuthController::class,'refresh']);

Route::prefix('/signup')->group(function () {
    Route::post('checkEmail', [AuthController::class, 'checkEmail']);
    Route::post('verify-otp', [AuthController::class, 'verifyOtp']);
    Route::post('set-password', [AuthController::class, 'setPassword']);
    Route::post('finalize', [AuthController::class, 'finalizeSignup']);
    Route::get('check',[AuthController::class, 'check']);
});

