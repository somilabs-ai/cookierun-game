import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // eslint-plugin-react-hooks v7 이 React Compiler 규칙으로 새로 넣은 것.
      // 이 코드베이스의 해당 5곳은 모두 정당한 용도다:
      //   - localStorage 하이드레이션(page.tsx, OnboardingModal) — SSR 이라 렌더 중 읽을 수 없다
      //   - 마운트 시 게임 초기화(CookidleGame, IdealWorldcupGame)
      //   - 타이머 만료 처리(InitialSpeedQuizGame)
      // 규칙을 지키려면 useSyncExternalStore 도입 등 구조 변경이 필요한데,
      // 그건 lint 정리와 별개 작업이다. 가시성은 유지하되 CI 를 막지 않도록 warn 으로 둔다.
      // 되돌릴 때는 이 블록을 지우면 된다. — somilabs-hub#184
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
