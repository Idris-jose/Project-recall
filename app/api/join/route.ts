// app/api/join/route.ts
import { db } from '@/app/firebaseConfig';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // 1. Validation
    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    const waitlistRef = collection(db, "waitlist");

    // 2. Check for Duplicates
    // We query to see if this email already exists
    const q = query(waitlistRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return NextResponse.json({ message: 'You are already on the list!' }, { status: 200 });
    }

    // 3. Add to Firestore
    await addDoc(waitlistRef, {
      email: email,
      createdAt: new Date().toISOString(),
      status: 'pending'
    });

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error("Firebase Error:", error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}