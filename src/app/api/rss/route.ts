import { NextResponse } from 'next/server';
import { parseString } from 'xml2js';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // 1시간마다 재검증

interface RSSItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  image?: string;
}

export async function GET() {
  try {
    const response = await fetch('https://www.korea.kr/rss/photo.xml', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('RSS 피드를 가져올 수 없습니다');
    }

    const xmlData = await response.text();

    return new Promise<NextResponse>((resolve, reject) => {
      parseString(xmlData, (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        try {
          const items = result.rss.channel[0].item || [];
          const newsItems: RSSItem[] = items.slice(0, 20).map((item: any) => {
            // 이미지 URL 추출 (description에서 img 태그 파싱)
            let imageUrl = '';
            const description = item.description?.[0] || '';
            const imgMatch = description.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) {
              imageUrl = imgMatch[1];
            }

            // HTML 태그 제거
            const cleanDescription = description
              .replace(/<[^>]*>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .trim()
              .substring(0, 150);

            return {
              title: item.title?.[0] || '',
              link: item.link?.[0] || '',
              description: cleanDescription,
              pubDate: item.pubDate?.[0] || '',
              image: imageUrl,
            };
          });

          // 작업복, 안전, 산업 관련 키워드 필터링
          const workwearKeywords = ['작업복', '안전', '산업', '근로', '노동', '현장', '보호구', '안전화'];
          const filteredItems = newsItems.filter(item => {
            const searchText = (item.title + ' ' + item.description).toLowerCase();
            return workwearKeywords.some(keyword => searchText.includes(keyword));
          });

          // 필터링된 항목이 없으면 전체 뉴스에서 최신 6개 반환
          const finalItems = filteredItems.length >= 6
            ? filteredItems.slice(0, 6)
            : newsItems.slice(0, 6);

          resolve(NextResponse.json({ items: finalItems }));
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  } catch (error: any) {
    console.error('RSS 파싱 오류:', error);
    return NextResponse.json(
      { error: 'RSS 피드를 처리할 수 없습니다', items: [] },
      { status: 500 }
    );
  }
}
