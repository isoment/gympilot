<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Reset Password</title>
</head>
<body>
  <h4>Reset Your Password</h4>
  <form action="{{route('password.update')}}" method="post">
    <input type="text" name="email" placeholder="Email">
    <input type="hidden" name="token" value="{{$token}}">
    <input type="text" name="password" placeholder="Password">
    <input type="text" name="password_confirmation" placeholder="Password Again">
  </form>
</body>
</html>