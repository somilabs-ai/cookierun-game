export interface ItemInventory {
  answerItems: number;        // 정답 표시 아이템 (Max: 5, 하루 1개 충전)
  hintItems: number;          // 힌트 표시 아이템 (Max: 3, 1시간 1개 충전)
  lastAnswerRecharge: number; // timestamp ms
  lastHintRecharge: number;   // timestamp ms
}

const MAX_ANSWER_ITEMS = 5;
const MAX_HINT_ITEMS = 3;
const ANSWER_RECHARGE_MS = 24 * 60 * 60 * 1000; // 24시간
const HINT_RECHARGE_MS = 60 * 60 * 1000;         // 1시간

export function getInventory(): ItemInventory {
  if (typeof window === 'undefined') {
    return {
      answerItems: 1,
      hintItems: 1,
      lastAnswerRecharge: Date.now(),
      lastHintRecharge: Date.now()
    };
  }

  const saved = localStorage.getItem('cookierun_item_inventory');
  const now = Date.now();

  const inventory: ItemInventory = saved
    ? JSON.parse(saved)
    : {
        answerItems: 1,
        hintItems: 1,
        lastAnswerRecharge: now,
        lastHintRecharge: now
      };

  // 1. 정답 아이템 자동 충전 (24시간당 1개)
  const answerPassed = now - inventory.lastAnswerRecharge;
  if (answerPassed >= ANSWER_RECHARGE_MS && inventory.answerItems < MAX_ANSWER_ITEMS) {
    const gained = Math.floor(answerPassed / ANSWER_RECHARGE_MS);
    inventory.answerItems = Math.min(MAX_ANSWER_ITEMS, inventory.answerItems + gained);
    inventory.lastAnswerRecharge = now - (answerPassed % ANSWER_RECHARGE_MS);
  }

  // 2. 힌트 아이템 자동 충전 (1시간당 1개)
  const hintPassed = now - inventory.lastHintRecharge;
  if (hintPassed >= HINT_RECHARGE_MS && inventory.hintItems < MAX_HINT_ITEMS) {
    const gained = Math.floor(hintPassed / HINT_RECHARGE_MS);
    inventory.hintItems = Math.min(MAX_HINT_ITEMS, inventory.hintItems + gained);
    inventory.lastHintRecharge = now - (hintPassed % HINT_RECHARGE_MS);
  }

  saveInventory(inventory);
  return inventory;
}

export function saveInventory(inventory: ItemInventory): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('cookierun_item_inventory', JSON.stringify(inventory));
}

export function consumeAnswerItem(): { success: boolean; updated: ItemInventory } {
  const inv = getInventory();
  if (inv.answerItems > 0) {
    inv.answerItems -= 1;
    saveInventory(inv);
    return { success: true, updated: inv };
  }
  return { success: false, updated: inv };
}

export function consumeHintItem(): { success: boolean; updated: ItemInventory } {
  const inv = getInventory();
  if (inv.hintItems > 0) {
    inv.hintItems -= 1;
    saveInventory(inv);
    return { success: true, updated: inv };
  }
  return { success: false, updated: inv };
}
