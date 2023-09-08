@extends('layouts.master')

@section('title')
    {{ 'Home | '.config('app.name') }}
@endsection

@section('content')
    <div class="container">
        <div class="py-5 text-center">
            <p class="py-5 lead text-muted">
                <a href="/spa" class="link-1">Enter To SPA</a>
            </p>
        </div>
    </div>
@endsection
