import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; 
import db from '@/lib/db'; 

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      'INSERT INTO user_info (account_name, account_email, password_hash) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    return NextResponse.json(
      { 
        message: 'User registered successfully!', 
        userId: result.insertId 
      }, 
      { status: 201 } 
    );

  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ message: 'Email or Username already in use.' }, { status: 409 }); // 409 Conflict
    }
    console.error('Registration Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}