import { NextResponse } from 'next/server';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

export const dynamic = 'force-dynamic';

const secretKey = process.env.TOSS_SECRET_KEY || 'test_sk_KNbdOvk5rk1vx1gE2pxA3n07xlzm';

// Firebase 초기화 (서버 사이드)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig, 'payment-server') : getApps()[0];
const db = getFirestore(app);

export async function POST(request: Request) {
  try {
    const { paymentKey, orderId, amount, userId } = await request.json();

    // 입력값 검증
    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { message: '필수 파라미터가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // Toss Payments API를 통한 결제 승인
    const response = await fetch(
      'https://api.tosspayments.com/v1/payments/confirm',
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error('Toss Payments 결제 승인 오류:', data);
      return NextResponse.json(
        {
          message: data.message || '결제 승인에 실패했습니다.',
          code: data.code,
        },
        { status: response.status }
      );
    }

    // 결제 성공 - Firestore에 주문 정보 저장
    console.log('결제 승인 성공:', data);

    try {
      // Firestore에 주문 정보 저장
      const orderData = {
        orderId: data.orderId,
        orderName: data.orderName,
        paymentKey: data.paymentKey,
        method: data.method,
        totalAmount: data.totalAmount,
        status: data.status,
        requestedAt: data.requestedAt,
        approvedAt: data.approvedAt,
        customerEmail: data.card?.customerEmail || data.virtualAccount?.customerEmail || '',
        customerName: data.card?.customerName || data.virtualAccount?.customerName || '',
        userId: userId && userId !== 'guest' ? userId : null,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      console.log('주문 정보 Firestore 저장 완료');
    } catch (firestoreError) {
      console.error('Firestore 저장 오류:', firestoreError);
      // Firestore 저장 실패해도 결제는 성공이므로 계속 진행
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('결제 승인 API 오류:', error);
    return NextResponse.json(
      {
        message: '결제 승인 처리 중 오류가 발생했습니다.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
