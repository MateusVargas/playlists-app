@if(session('status'))
	<span>Senha alterada com sucesso</span>
@endif

@if ($errors->any())
	<ul>
		@foreach($errors->all() as $error)
			<li>{{$error}}</li>
		@endforeach
	</ul>
@endif

<form action="{{route('password.update')}}" method="post">
	@csrf

	<input type="hidden" name="token" value="{{$token}}">
	<input type="email" name="email" placeholder="email">
	<input type="password" name="password" placeholder="senha">
	<input type="password" name="password_confirmation" placeholder="confirme a senha">

	<button type="submit">Enviar</button>
</form>