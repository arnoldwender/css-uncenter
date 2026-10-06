async (page) => {
  // Delay the optional capture module while another user action changes the score.
  await page.unroute('**/*html2canvas*.js*');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await page.getByRole('button', { name: 'Apply THE BUTTON', exact: true }).click();
  await page.getByRole('button', { name: /^SHARE YOUR DESTRUCTION/ }).click();
  const delayedRequests = [];
  let release;
  const resumeImport = new Promise(resolve => { release = resolve; });
  await page.route('**/*html2canvas*.js*', async route => {
    delayedRequests.push(route.request().url());
    await resumeImport;
    await route.continue();
  });
  try {
    const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
    await page.getByRole('button', { name: 'DOWNLOAD SHARE IMAGE', exact: true }).click();
    await page.getByRole('button', { name: 'Apply THE HEADING', exact: true }).click();
    await page.waitForFunction(() => document.querySelector("[data-score]")?.getAttribute("data-score") === "55");
    release();
    const download = await downloadPromise;
    const cardScore = await page.locator('[data-score]').getAttribute('data-score');
    const filename = download.suggestedFilename();
    if (delayedRequests.length === 0 || cardScore !== '55' || filename !== 'css-uncenter-score-55.png') {
      throw new Error(JSON.stringify({ delayedRequests, cardScore, filename }));
    }
    return { delayedRequests, cardScore, filename, passed: true };
  } finally {
    release();
    await page.unroute('**/*html2canvas*.js*');
  }
}
