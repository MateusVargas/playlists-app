<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PlaylistController;
use App\Http\Controllers\VideoController;
use App\Http\Controllers\VerificationController;
use App\Http\Controllers\ResetPasswordController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register',[UserController::class,'register']);

Route::post('login',[UserController::class,'login']);

Route::post('email/resend', [VerificationController::class,'resend'])
            ->middleware(['auth:sanctum', 'throttle:6,1'])
            ->name('verification.resend');

Route::post('forgot-password', [ResetPasswordController::class,'sendLinkResetPassword'])
            ->middleware('throttle:6,1')
            ->name('password.email');

Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/user', function (Request $request) {
    //     return $request->user();
    // });

    Route::middleware('verified.api')->group(function(){
        Route::prefix('playlists')->group(function(){
            Route::get('/',[PlaylistController::class,'index']);
            Route::get('/total',[PlaylistController::class,'totalPlaylists']);
            Route::get('/{id}',[PlaylistController::class,'show']);
            Route::post('/',[PlaylistController::class,'store']);
            Route::put('/{id}',[PlaylistController::class,'update']);
            Route::delete('/{id}',[PlaylistController::class,'destroy']);
        });

        Route::prefix('videos')->group(function(){
            Route::get('/{id}',[VideoController::class,'show']);
            Route::post('/',[VideoController::class,'store']);
            Route::put('/{id}',[VideoController::class,'update']);
            Route::delete('/{id}',[VideoController::class,'destroy']);
        });
    });

    Route::post('logout',[UserController::class,'logout']); 
});


Route::fallback(function(){
    return response()->json(['message' => 'Not Found'], 404);
})->name('api.fallback.404');