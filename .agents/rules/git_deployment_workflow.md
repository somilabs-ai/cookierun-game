# 🌿 [규칙] Git Worktree, Fork & Dual-Vercel/Supabase 배포 파이프라인

이 프로젝트는 `somilabs-dev` 및 `somilabs-ai` 조직 간의 Fork 및 Dual Vercel/Supabase 멀티 스태이징 구조를 준수합니다.

---

## 1. 레포지토리 & 원격(Remote) 구조

* **Upstream**: `https://github.com/somilabs-dev/cookierun-game.git` (메인 프로덕션 레포)
* **Origin (Fork)**: `https://github.com/somilabs-ai/cookierun-game.git` (개발/스테이징 포크 레포)

```bash
git remote add upstream https://github.com/somilabs-dev/cookierun-game.git
git remote add origin https://github.com/somilabs-ai/cookierun-game.git
```

---

## 2. 브랜치 & Worktree 개발 브랜칭 전략

1. **메인 개발 브랜치**: `develop`
2. **Worktree 작업 방식**:
   ```bash
   # develop 브랜치를 위한 전용 worktree 디렉토리 생성
   git worktree add ../cookierun-game-dev develop
   ```
3. **PR & 배포 워크플로우**:
   * **Step 1 (개발/스테이징)**: `develop` 워크트리에서 기능 구현 ➡️ `somilabs-ai` (Origin) 의 `develop` 브랜치로 Push & PR ➡️ 머지 시 **`somilabs-ai` Vercel** 자동 배포 (Dev/Staging DB 연동)
   * **Step 2 (프로덕션)**: 검증 완료 후 `somilabs-dev` (Upstream) 의 `develop` / `main` 브랜치로 PR ➡️ 머지 시 **`somilabs-dev` Vercel** 자동 배포 (Prod DB 연동)

---

## 3. 데이터베이스 (Supabase) 환경 분리

* **개발/테스트 DB (`somilabs-ai`)**:
  * `.env.development.local` 및 `somilabs-ai` Vercel 프로젝트 환경 변수에 연동
  * `NEXT_PUBLIC_SUPABASE_URL_DEV`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV`
* **운영/프로덕션 DB (`somilabs-dev`)**:
  * `somilabs-dev` Vercel 프로젝트 환경 변수에 연동
  * `NEXT_PUBLIC_SUPABASE_URL_PROD`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD`
