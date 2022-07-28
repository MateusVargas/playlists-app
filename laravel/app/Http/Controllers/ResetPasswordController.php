<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function sendLinkResetPassword(Request $request)
    {
        try {
            $request->validate(['email' => 'required|email']);
 
            $status = Password::sendResetLink(
                $request->only('email')
            );
         
            return $status === Password::RESET_LINK_SENT
                        ? response()->json(['success'=>true,'msg' => 'link enviado com sucesso, verifique seu e-mail'],200)
                        : response()->json(['error' => 'não foi possível enviar o link de redefinição.'],400);

        } catch (\Exception $e) {
            return response()->json(['error'=>'ocorreu um erro ao enviar o link de redefinição de senha.']);
        }
    }

    public function resetPassword(Request $request)
    {
        try {
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed',
            ]);
         
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));
         
                    $user->save();
         
                    event(new PasswordReset($user));
                }
            );
         
            return $status === Password::PASSWORD_RESET
                ? back()->with('status', __($status))
                : back()->withErrors(['email' => [__($status)]]);
        } catch (Exception $e) {
            return back()->withErrors(['errors' => $e->getMessage()]);
        }
    }
}
