import { CookieData, LanguageCode } from '@/types/cookie';

const INITIAL_CONSONANTS = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

export function extractInitialConsonants(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const initialIndex = Math.floor((code - 0xac00) / 588);
      result += INITIAL_CONSONANTS[initialIndex];
    } else {
      result += text[i];
    }
  }
  return result;
}

export function normalizeCookieName(str: string): string {
  return str
    .replace(/\s+/g, '')       // 공백 제거
    .replace(/쉐/g, '섀')       // '쉐' -> '섀'
    .replace(/셰/g, '섀')
    .toLowerCase();
}

/**
 * 다국어 정답 매칭 검증 함수
 */
export function isCorrectAnswer(
  userGuess: string,
  cookie: CookieData,
  targetLang: LanguageCode = 'ko'
): boolean {
  if (!userGuess || !userGuess.trim()) return false;

  const normUser = normalizeCookieName(userGuess);

  // 1. 요청받은 난이도/언어의 공식 명칭 검사
  const targetName = cookie.name[targetLang] || cookie.name.ko;
  const normTarget = normalizeCookieName(targetName);

  if (normUser === normTarget) return true;

  // 2. 접미사(Cookie, Galleta, 쿠키) 생략 허용
  const baseTarget = normTarget
    .replace(/(맛)?쿠키$/, '')
    .replace(/cookie$/, '')
    .replace(/^galletade/, '')
    .replace(/^galleta/, '');

  const baseUser = normUser
    .replace(/(맛)?쿠키$/, '')
    .replace(/cookie$/, '')
    .replace(/^galletade/, '')
    .replace(/^galleta/, '');

  if (baseUser.length >= 2 && baseUser === baseTarget) return true;

  // 3. 교차 언어 허용 (타 언어로 입력해도 인정)
  for (const lang of ['ko', 'en', 'es', 'ja'] as LanguageCode[]) {
    const langName = normalizeCookieName(cookie.name[lang]);
    if (normUser === langName) return true;
  }

  // 4. 별칭(Aliases) 등록건 검사
  if (cookie.aliases && cookie.aliases.length > 0) {
    for (const alias of cookie.aliases) {
      if (normalizeCookieName(alias) === normUser) return true;
    }
  }

  return false;
}
