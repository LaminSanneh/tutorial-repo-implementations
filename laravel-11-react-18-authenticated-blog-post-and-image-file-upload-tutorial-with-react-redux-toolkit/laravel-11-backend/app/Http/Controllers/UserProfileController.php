<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'phone' => ['required', 'string'],
            'address' => ['required', 'string'],
        ]);

        $userData = [
            'name' => $request->input('name'),
            'phone' => $request->input('phone'),
            'address' => $request->input('address')
        ];

        $user = Auth::user();
        $updated = $user->update($userData);

        if (!$updated) {
            return response('Could not update profile', Response::HTTP_BAD_REQUEST);
        }

        return response($user->only('id', 'name', 'phone', 'address'), 200);
    }

    public function user()
    {
        if (Auth::check()) {
            $user = Auth::user();
            return response($user->only('id', 'name', 'phone', 'address'), 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);
    }
}
