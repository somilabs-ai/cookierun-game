# 🍪 쿠키런 킹덤 맞추기 게임 (Cookie Run Kingdom Quiz)

이 프로젝트는 Next.js 15, Tailwind CSS, Supabase 스택으로 제작된 쿠키런 킹덤 맞추기 게임 및 왕국소식 웹 앱입니다.

## 📌 배포 & 브랜치 가이드라인 (DevOps Workflow)
모든 변경사항 및 개발은 [.agents/rules/git_deployment_workflow.md](file:///.agents/rules/git_deployment_workflow.md) 지침을 수록하여 다음 흐름으로 진행해야 합니다:

1. `somilabs-dev` 레포지토리를 `somilabs-ai`로 Fork
2. Local에서 `develop` 브랜치 기반 git worktree 생성 후 개발 진행
3. `somilabs-ai` develop PR & Merge -> `somilabs-ai` Vercel 배포 (Dev DB)
4. `somilabs-dev` PR & Merge -> `somilabs-dev` Vercel 배포 (Prod DB)

자세한 문서들은 [`docs/`](file:///docs/) 폴더를 참조하세요.
