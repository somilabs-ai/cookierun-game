@AGENTS.md

# cookierun-game (web)

이 repo는 `~/work/apps/`의 독립 프로젝트다. **공통 규약은 hub를 따른다.**

## 상위 규약 (반드시 준수)
공통 규칙 정본(실행기 중립) — 요원이 이 저장소에서 떠도 아래를 읽는다.
- `~/work/hub/docs/standards/hub-working-rules.md`
- `~/work/hub/docs/standards/agent-protocol.md`
- `~/work/hub/docs/standards/task-board.md`
컨테이너에서는 `/work/hub/docs/standards/` 아래 같은 파일이다.
요약·안내는 `~/work/hub/CLAUDE.md` 를 본다.
- 코딩 컨벤션: `~/work/hub/docs/standards/coding-conventions.md`
- git 워크플로: `~/work/hub/docs/standards/git-workflow.md`

## 착수 규칙
- 착수 전 `python3 ~/work/hub/tools/board_claim.py claim <이슈번호>` 로 claim 하고, 성공(exit 0)일 때만 시작한다. 소유 확인은 `board_claim.py whois` 로 한다. `status:*`·`claimed-by:*` 라벨을 `gh issue edit` 로 직접 바꾸지 않는다.
- 주 체크아웃을 직접 수정하지 않는다. 피처 작업은 worktree 에서 한다.
- 머지는 사람이 한다. 에이전트는 PR 까지만 연다.

## 통합 브랜치
- 이 저장소의 통합 브랜치 정본은 `~/work/hub/docs/standards/board-repos.json` 의 `base_branch` 다. 이 보드는 `develop` 다.
- 포크에 `develop` 이 없으면 `main` 을 쓴다. PR base 와 worktree 기준은 그 통합 브랜치다.
- 주 체크아웃은 항상 통합 브랜치에 두고, 피처 브랜치는 worktree 에서 딴다.

## 이 프로젝트
- **보드**: `board:cookierun-game`
- **포트 대역**: 3050 (게임 웹) — 정본 `~/work/hub/docs/standards/port-registry.md`
- **기획(PRD)**: `~/work/hub/docs/planning/cookierun-game-PRD.md`
- **런타임**: `.mise.toml`로 고정
- **패키지/빌드**: pnpm

## 작업 규칙
- ADR에 없는 큰 결정은 임의로 하지 말고 설계 단계로 반려.
- 비밀값 커밋 금지(`.env`는 gitignore, 예시는 `.env.example`).
- 중요한 세션 요약은 `~/work/hub/notes/agent-log/`에 비민감하게 남긴다.
