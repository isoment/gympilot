<?php

namespace App\Providers;

use Laravel\Fortify\Actions\AttemptToAuthenticate;
use Laravel\Fortify\Actions\EnsureLoginIsNotThrottled;
use Laravel\Fortify\Actions\PrepareAuthenticatedSession;
use Laravel\Fortify\Actions\RedirectIfTwoFactorAuthenticatable;
use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\LogUserLoginAttempt;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Models\User;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->email;

            return Limit::perMinute(5)->by($email.$request->ip());
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        Fortify::authenticateUsing(function (Request $request) {
            Log::info('Login attempt.');
            $user = User::where('email', $request->email)->first();
            if ($user && Hash::check($request->password, $user->password)) {
                return $user;
            }
        });

        // To customize the authentication pipeline...
        // Fortify::authenticateThrough(function (Request $request) {
        //     return array_filter([
        //         config('fortify.limiters.login') ? null : EnsureLoginIsNotThrottled::class,
        //         Features::enabled(Features::twoFactorAuthentication()) ? RedirectIfTwoFactorAuthenticatable::class : null,
        //         LogUserLoginAttempt::class,
        //         AttemptToAuthenticate::class,
        //         PrepareAuthenticatedSession::class,
        //     ]);
        // });

        // To customize the confirm password logic. We need to return true if the password is 
        // confirmed correctly else false. The $user is the current user and the $password is the password
        // from the request.
        // Fortify::confirmPasswordsUsing(function ($user, $password) {
        //     // Logic
        // });

        // When we enable the fortify views we can customize them as follows. For a SPA this isn't needed...
        // Fortify::confirmPasswordView(function () {
        //     return view('auth.confirm-password');
        // });
        // Fortify::verifyEmailView(function () {
        //     return view('auth.verify-email');
        // });
        // Fortify::loginView(function () {
        //     return view('auth.login');
        // });
        // Fortify::registerView(function () {
        //     return view('auth.register');
        // });
        // Fortify::twoFactorChallengeView(function () {
        //     return view('auth.two-factor-challenge');
        // });
        // Fortify::requestPasswordResetLinkView(function () {
        //     return view('auth.forgot-password');
        // });
        // Fortify::resetPasswordView(function ($request) {
        //     return view('auth.reset-password', ['request' => $request]);
        // });    
    }
}
