<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function store(Request $request, Account $account)
    {
        $to = $request->input('to');
        $amount = $request->input('amount');
        $details = $request->input('details');

        // validate inputs
        $request->validate([
            'to' => 'required',
            'amount' => 'required',
            'details' => 'nullable',
        ]);

        $error_message = '';

        // check if account exists
        $receiver_account = Account::find($to);

        if (!$receiver_account) {
            $error_message = 'receiver account does not exist';
            return response(compact('error_message'));
        }

        if ($account->balance - $amount > 0) {

            // add transaction
            $transaction = Transaction::create([
                'to' => $to,
                'from' => $account->id,
                'amount' => $amount,
                'details' => $details,
            ]);
            
            // update balance
            $account->balance -=$amount;
            $account->save();

            // update receiver balance
            $receiver_account->balance +=$amount;
            $receiver_account->save();

            // get transactions
            $transactions = Transaction::where('to', $account->id)->orWhere('from', $account->id)->get();
            return response()->json(compact('account', 'transactions', 'error_message'), 200);
        }

        $error_message = 'insufficient_funds';

        return response(compact('error_message'));
    }
}
