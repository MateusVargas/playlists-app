<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
//use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    // public function __construct() {
    //     $this->middleware('guest:api')->except('logout');
    // }

    public function login(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
                'device_name' => 'required'
            ]);

            $user = User::where('email', $request->email)->first();
         
            if (! $user || ! Hash::check($request->password, $user->password)) {
                return response()->json(['error'=>'email ou senha incorretos'],400);
            }
         
            return response()->json(['user'=>$user,'token'=>$user->createToken($request->device_name)->plainTextToken]);
        } catch (Exception $e) {
            return response()->json('não foi possível realizar o login'.$e->getMessage());
        }
    }

    public function register(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|email|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ])->sendEmailVerificationNotification();

            return response()->json(["msg" => "conta criada com sucesso! valide seu email pelo link que lhe enviamos."],201);

        } catch (Exception $e) {
            return response()->json('não foi possível realizar o login'.$e->getMessage());
        }
    }

    public function logout()
    {
        try {
            auth()->user()->tokens()->delete();
            return response()->json(["success"=>true,"msg"=>"logout successfully"],200);
        } catch (Exception $e) {
            return response()->json('não foi possível realizar o logout'.$e->getMessage());   
        }
    }
}
