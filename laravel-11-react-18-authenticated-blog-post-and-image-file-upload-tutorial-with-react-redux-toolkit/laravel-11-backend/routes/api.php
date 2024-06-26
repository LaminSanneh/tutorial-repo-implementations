<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserProfileController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('getUserData', [UserProfileController::class, 'user']);
    Route::post('updateUserProfile', [UserProfileController::class, 'updateProfile']);
    Route::post('/logout', [AuthController::class, 'logout']);
});