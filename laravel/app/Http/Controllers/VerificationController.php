<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class VerificationController extends Controller
{
    public function verify(Request $request,$user_id, $hash) {
        if (!$request->hasValidSignature()) {
            return view('auth.invalid-link-email-verified');
        }

        $user = User::findOrFail($user_id);

        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
        }

        return view('auth.email-verified');
    }

    public function resend() {
        if (auth()->user()->hasVerifiedEmail()) {
            return response()->json(["error" => "Email já verificado, faça login para poder utilizar o aplicativo."], 400);
        }

        auth()->user()->sendEmailVerificationNotification();

        return response()->json(["msg" => "Link enviado com sucesso, verifique seu e-mail"]);
    }
}
