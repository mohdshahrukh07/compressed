<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\RefreshToken;
use App\Models\User;
use App\Models\EmailOtp;
use Illuminate\Support\Facades\Cache;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        return $this->handleAction(function () use($request){
            $credentials = $request->only('email', 'password');
        if (!auth()->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = auth()->user();
        $accessToken = $user->createToken('access')->plainTextToken;
        $refreshToken = Str::random(64);

        RefreshToken::create([
            'user_id' => $user->id,
            'token' => $refreshToken,
            'expires_at' => Carbon::now()->addDays(30), // 30 days
        ]);

        return response()->json([
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'user' => $user,
        ],200);
        });
    }

    public function refresh(Request $request)
    {
        $refreshToken = $request->input('refresh_token');

        $record = RefreshToken::where('token', $refreshToken)
            ->where('expires_at', '>', Carbon::now())
            ->first();

        if (!$record) {
            return response()->json(['status'=>false,'message' => 'Invalid or expired refresh token'], 401);
        }

        $user = User::find($record->user_id);
        $newAccessToken = $user->createToken('access')->plainTextToken;

        return response()->json([
            'status'=>true,
            'access_token' => $newAccessToken,
            'user' => $user,
        ],200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();
        RefreshToken::where('user_id', $user->id)->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function checkEmail(Request $request)
    {
        return $this->handleAction(function () use ($request) {
            $request->validate(['email' => 'required|email']);
            if (User::where('email', $request->email)->exists()) {
                return response()->json(['exists' => true, 'message' => 'Email already registered.'], 409);
            }

            // Generate 6-digit OTP
            $otp = rand(100000, 999999);
            EmailOtp::updateOrCreate(
                ['email' => $request->email],
                ['otp' => $otp, 'expires_at' => Carbon::now()->addMinutes(5)]
            );

            // Send OTP via Mail
            Mail::raw("Your verification code is: $otp", function ($message) use ($request) {
                $message->to($request->email)->subject('Your OTP Code');
            });

            return response()->json(['status' => true, 'message' => 'OTP sent successfully.'], 200);
        });
    }

    // STEP 2: Verify OTP
    public function verifyOtp(Request $request)
    {
        return $this->handleAction(function () use ($request) {
            $request->validate([
                'email' => 'required|email',
                'otp' => 'required|digits:6'
            ]);

            $otpRecord = EmailOtp::where('email', $request->email)->first();
            if (!$otpRecord || $otpRecord->otp !== $request->otp) {
                return response()->json(['status' => false, 'message' => 'Invalid OTP.'], 400);
            }

            if (Carbon::now()->greaterThan($otpRecord->expires_at)) {
                return response()->json(['status' => false, 'message' => 'OTP expired.'], 400);
            }

            return response()->json(['status' => true, 'message' => 'OTP verified.'], 200);
        });
    }

    // STEP 3: Set Password
    public function setPassword(Request $request)
    {
        return $this->handleAction(function () use ($request) {

            $request->validate([
                'email' => 'required|email',
                'password' => 'required|min:8'
            ]);

            // Use cache instead of session (sessions don't persist in API routes)
            Cache::put('signup_email', $request->email,   now()->addMinutes(10));
            Cache::put('signup_password', Hash::make($request->password), now()->addMinutes(10));

            return response()->json(['status' => true, 'message' => 'Password set successfully.'], 200);
        });
    }

    // STEP 4: Create username + avatar
    public function finalizeSignup(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:50|unique:users,username',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $email = Cache::get('signup_email');
        $password = Cache::get('signup_password');

        if (!$email || !$password) {
            return response()->json(['error' => 'Session expired. Please restart signup.'], 400);
        }

        $avatarPath = null;
        if ($request->hasFile('avatar')) {
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
        }

        $user = User::create([
            'email' => $email,
            'password' => $password,
            'username' => $request->username,
            'avatar' => $avatarPath,
        ]);

        if ($user) {
            $accessToken = $user->createToken('access')->plainTextToken;
            $refreshToken = Str::random(64);
        }

        Cache::forget('signup_email');
        Cache::forget('signup_password');

        RefreshToken::create([
            'user_id' => $user->id,
            'token' => $refreshToken,
            'expires_at' => Carbon::now()->addDays(30), // 30 days
        ]);

        $result = [
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
            'user' => $user,
        ];

        return response()->json(['status' => true, 'message' => 'User created successfully.', 'data' => $result], 200);
    }
}
