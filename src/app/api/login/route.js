import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import db from '@/lib/db'; 

export async function POST(request) {
  try {

    const { email, password } = await request.json();


    const [rows] = await db.execute(
      'SELECT account_id, account_email, password_hash FROM user_info WHERE account_email = ?',
      [email]
    );

    const user = rows[0];


    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }


    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

   return NextResponse.json(
      { 
        message: 'Login successful!',
        userId: user.account_id,
        userEmail: user.account_email 
      }, 
      { status: 200 }
    );

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}