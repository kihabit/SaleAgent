<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ConsultationRequest;
use App\Mail\ConsultationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ConsultationController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'first_name'    => 'required|string|max:255',
            'last_name'     => 'nullable|string|max:255',
            'company_name'  => 'nullable|string|max:255',
            'country'       => 'nullable|string|max:255',
            'email'         => 'required|email|max:255',
            'phone'         => 'nullable|string|max:20',
            'looking_for'   => 'nullable|string|max:255',
            'message'       => 'nullable|string|max:2000',
        ]);

        // Database me save karo
        ConsultationRequest::create($data);

        // Apne business email pe notification bhejo
     Mail::to('neeraj.kumarkeysolutions@gmail.com')->send(new ConsultationMail($data));

        return response()->json([
            'success' => true,
            'message' => 'Thank you! We will contact you soon.'
        ]);
    }
}