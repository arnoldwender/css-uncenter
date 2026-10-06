async (page) => {
  // A delayed optional effect must stay cancelled after an explicit reset.
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  const delayedRequests = [];
  await page.route('**/*confetti.module*.js*', async route => {
    delayedRequests.push(route.request().url());
    await page.waitForTimeout(800);
    await route.continue();
  });
  try {
    await page.getByRole('button', { name: 'Apply THE BUTTON', exact: true }).click();
    await page.getByRole('button', { name: 'RESTORE SANITY (undo all)', exact: true }).click();
    await page.waitForTimeout(1200);
    const cancelledCanvas = await page.locator('canvas').count();
    if (delayedRequests.length === 0 || cancelledCanvas !== 0) {
      throw new Error(JSON.stringify({ delayedRequests, cancelledCanvas }));
    }
    // The cancellation guard must also let a later, valid action produce particles.
    await page.getByRole('button', { name: 'Apply THE BUTTON', exact: true }).click();
    await page.waitForTimeout(100);
    const activeCanvas = await page.locator('canvas').count();
    if (activeCanvas !== 1) throw new Error(`Normal confetti did not fire: ${activeCanvas}`);
    await page.getByRole('button', { name: 'RESTORE SANITY (undo all)', exact: true }).click();
    return { delayedRequests, cancelledCanvas, activeCanvas, passed: true };
  } finally {
    await page.unroute('**/*confetti.module*.js*');
    await page.evaluate(() => localStorage.clear());
  }
}
