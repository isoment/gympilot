<?php

namespace App\Actions\Fortify;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LogUserLoginAttempt
{
    public function __invoke(Request $request, $next)
    {
        Log::info('User with email, ' . $request->email . ' attempted login.');
        $next($request);
    }
}