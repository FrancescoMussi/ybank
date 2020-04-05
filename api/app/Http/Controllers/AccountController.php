<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function index($id)
    {
        $account = Account::find($id);

        if (!$account) {
            return response('account_not_found');
        }

        $transactions = Transaction::where('to', $account->id)->orWhere('from', $account->id)->get();
        return response()->json(compact('account', 'transactions'), 200);
    }
}
