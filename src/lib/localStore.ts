'use client';

import { useSyncExternalStore } from 'react';

/**
 * localStorage 를 읽는 값을 React 외부 스토어로 감싼다.
 *
 * 왜 필요한가: localStorage 는 서버에서 읽을 수 없어 종전에는 useEffect 안에서
 * setState 로 채웠다. 그 패턴은 react-hooks/set-state-in-effect 에 걸리고
 * 연쇄 렌더를 유발한다(somilabs-hub#185).
 *
 * 스냅샷은 반드시 캐시해야 한다 — useSyncExternalStore 는 값이 바뀌지 않았으면
 * **같은 참조**를 돌려받아야 하고, 매번 새 객체를 만들면 무한 렌더가 된다.
 *
 * `loaded` 를 스냅샷에 넣는 이유: 서버 스냅샷은 loaded=false 다. 하이드레이션
 * 전에는 "아직 모른다" 를 표현할 수 있어야 종전 동작(값이 없을 때 온보딩 모달을
 * 열지 않음)을 그대로 유지한다. 이게 없으면 프로필이 있는 사용자에게도
 * 첫 렌더에 모달이 잠깐 떴다 사라진다.
 */
export interface Snapshot<T> {
  loaded: boolean;
  value: T;
}

export interface LocalStore<T> {
  subscribe: (onChange: () => void) => () => void;
  getSnapshot: () => Snapshot<T>;
  getServerSnapshot: () => Snapshot<T>;
  /** 값을 저장한 쪽에서 호출한다. 캐시를 버리고 구독자에게 알린다. */
  invalidate: () => void;
}

export function createLocalStore<T>(read: () => T, fallback: T): LocalStore<T> {
  const serverSnapshot: Snapshot<T> = { loaded: false, value: fallback };
  let cache: Snapshot<T> | null = null;
  const listeners = new Set<() => void>();

  return {
    subscribe(onChange) {
      listeners.add(onChange);
      return () => {
        listeners.delete(onChange);
      };
    },
    getSnapshot() {
      if (typeof window === 'undefined') return serverSnapshot;
      if (cache === null) cache = { loaded: true, value: read() };
      return cache;
    },
    getServerSnapshot() {
      return serverSnapshot;
    },
    invalidate() {
      cache = null;
      listeners.forEach((l) => l());
    }
  };
}

export function useLocalStore<T>(store: LocalStore<T>): Snapshot<T> {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}
