import { router } from 'expo-router';

import type { PlanItem } from '../data/content';

export function routeFor(item: PlanItem) {
  return item.kind === 'lesson'
    ? ({ pathname: '/subtopic/[id]', params: { id: item.id } } as const)
    : ({ pathname: '/practice/[id]', params: { id: item.id } } as const);
}

// From a tab: push a new screen.
export function openItem(item: PlanItem) {
  router.push(routeFor(item));
}

// From a lesson/practice screen: swap in place so the back button still goes to the tabs.
// With the iPad sidebar, staying on the same route type keeps the sidebar where it is.
export function switchItem(item: PlanItem, currentKind: PlanItem['kind'], isWide: boolean) {
  if (isWide && item.kind === currentKind) router.setParams({ id: item.id });
  else router.replace(routeFor(item));
}
