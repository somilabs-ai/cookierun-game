import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // react-hooks v7(React Compiler 규칙)의 set-state-in-effect 예외.
    //
    // localStorage 하이드레이션 2건(page.tsx, OnboardingModal)은 somilabs-hub#185 에서
    // useSyncExternalStore / 마운트 시 초기화로 해소했다. 아래 3개는 게임 로직이라
    // 구조 변경 위험이 크고 이 repo 에 테스트가 없어 남겨 둔다.
    //
    // **파일을 특정해 완화한다** — 다른 곳에서 같은 패턴이 새로 생기면 error 로 막힌다.
    // 세 파일을 정리하면 이 블록을 통째로 지운다.
    files: [
      'src/components/games/CookidleGame.tsx',
      'src/components/games/IdealWorldcupGame.tsx',
      'src/components/games/InitialSpeedQuizGame.tsx',
    ],
    rules: {
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
