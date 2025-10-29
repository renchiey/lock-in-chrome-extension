let lockInActive = false;

export function toggleLockIn() {
  lockInActive = !lockInActive;
}

export function isLockInActive() {
  return lockInActive;
}
