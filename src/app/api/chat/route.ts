import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, apiKey, model = 'gemini-2.5-flash' } = await req.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 필요합니다. 설정 버튼을 클릭하여 Gemini API 키를 입력해주세요.' },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const generativeModel = genAI.getGenerativeModel({
      model: model,
      systemInstruction: `당신은 ZIBEN(지벤) 프리미엄 작업복 및 안전화 브랜드의 친절한 고객 상담 AI 어시스턴트입니다.

주요 역할:
- ZIBEN 제품(작업복, 안전화)에 대한 문의 응대
- 제품 추천 및 상담
- 견적 및 대량 구매 안내
- 일반적인 고객 질문 응답

제품 라인업:
[작업복]
- 일반 작업복: 내구성과 편안함을 겸비한 기본 작업복
- 방한 작업복: 겨울철 보온성이 뛰어난 작업복
- 방수 작업복: 우천 작업 시 완벽한 방수 기능
- 난연 작업복: 화재 위험 환경에서의 안전 보장
- 정전기 방지: 전자 부품 취급 시 필수
- 고시인성 작업복: 야간/저조도 환경에서의 안전성 향상

[안전화]
- 기본 안전화: 발등 보호 및 미끄럼 방지
- 절연 안전화: 전기 작업 시 감전 방지
- 방수 안전화: 습한 환경에서도 쾌적함 유지
- 경량 안전화: 장시간 착용 시 피로 최소화
- 정전기 방지 안전화: 정전기 민감 작업 환경용
- 고온 작업용: 용접 등 고온 환경 특화

브랜드 철학:
- 안전과 스타일의 조화
- 프리미엄 품질 추구
- B2B 대량 공급 전문

응답 스타일:
- 친절하고 전문적인 어투 사용
- 구체적이고 명확한 정보 제공
- 필요시 견적 문의 양식으로 안내
- 이모지는 최소한으로 사용`
    });

    // 메시지 히스토리 변환
    const chat = generativeModel.startChat({
      history: messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    });

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessageStream(lastMessage);

    // 스트리밍 응답 생성
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            // Vercel AI SDK 형식으로 데이터 전송
            controller.enqueue(encoder.encode(`0:"${text}"\n`));
          }
          controller.close();
        } catch (error) {
          console.error('스트리밍 오류:', error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    console.error('Gemini API 오류:', error);

    // 할당량 초과 에러 처리
    if (error.status === 429) {
      return NextResponse.json(
        { error: 'API 할당량이 초과되었습니다. 잠시 후 다시 시도하거나 다른 모델을 선택해주세요.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || '오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
