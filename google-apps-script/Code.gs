/**
 * ZIBEN 작업복 & 안전화 문의 폼 데이터 수집
 * Google Sheets ID: 19UCjTkcBnxzioix2MFwS0aFQkkZDdmKLK-alKasY4Go
 *
 * 배포 방법:
 * 1. Google Sheets에서 확장 프로그램 > Apps Script 열기
 * 2. 이 코드를 복사하여 붙여넣기
 * 3. 배포 > 새 배포 클릭
 * 4. 유형: 웹 앱
 * 5. 다음 계정으로 실행: 나
 * 6. 액세스 권한: 모든 사용자
 * 7. 배포 후 웹 앱 URL을 Contact.tsx에 입력
 */

function doPost(e) {
  try {
    // 활성 시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // POST 데이터 파싱
    const data = JSON.parse(e.postData.contents);

    // 현재 시간
    const timestamp = new Date();

    // 헤더가 없으면 추가
    if (sheet.getLastRow() === 0) {
      const headers = ['이름', '회사명', '이메일', '전화번호', '문의내용', '처리상태', '접수일시'];
      sheet.appendRow(headers);

      // 헤더 스타일링
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#4285f4');
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');
    }

    // 데이터 행 추가 (날짜/시간을 맨 뒤로)
    const rowData = [
      data.name || '',
      data.company || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      '미처리',
      timestamp
    ];

    sheet.appendRow(rowData);

    // 방금 추가된 행 서식 지정
    const lastRow = sheet.getLastRow();
    const dataRange = sheet.getRange(lastRow, 1, 1, 7);

    // 타임스탬프 포맷 (7번째 열로 이동)
    sheet.getRange(lastRow, 7).setNumberFormat('yyyy-mm-dd hh:mm:ss');

    // 테두리 추가
    dataRange.setBorder(true, true, true, true, true, true);

    // 처리상태 셀 배경색 (미처리: 노란색) - 6번째 열로 이동
    sheet.getRange(lastRow, 6).setBackground('#fff3cd');

    // 열 너비 자동 조정
    for (let i = 1; i <= 7; i++) {
      sheet.autoResizeColumn(i);
    }

    // 성공 응답 반환
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: '문의가 성공적으로 접수되었습니다.',
      timestamp: timestamp.toISOString()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답 반환
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: '문의 접수 중 오류가 발생했습니다: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 테스트용 함수 - Apps Script 에디터에서 직접 실행 가능
 */
function testInsert() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        name: '홍길동',
        company: '테스트 회사',
        email: 'test@example.com',
        phone: '010-1234-5678',
        message: '작업복 대량 구매 문의드립니다.'
      })
    }
  };

  const result = doPost(testData);
  Logger.log(result.getContent());
}

/**
 * 처리상태 업데이트 함수
 * @param {number} row - 업데이트할 행 번호
 * @param {string} status - 새로운 상태 ('미처리', '처리중', '완료')
 */
function updateStatus(row, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const statusCell = sheet.getRange(row, 6); // 6번째 열로 변경

  statusCell.setValue(status);

  // 상태에 따른 배경색 설정
  switch(status) {
    case '미처리':
      statusCell.setBackground('#fff3cd');
      break;
    case '처리중':
      statusCell.setBackground('#cfe2ff');
      break;
    case '완료':
      statusCell.setBackground('#d1e7dd');
      break;
  }
}
