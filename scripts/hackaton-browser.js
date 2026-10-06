async (page) => {
  const base = await page.evaluate(() => location.origin);
  const results = [];
  const errors = [];
  const requests = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => requests.push(request.url()));
  const check = (name, condition, evidence) => {
    results.push({ name, passed: Boolean(condition), evidence });
    if (!condition) throw new Error(`${name}: ${JSON.stringify(evidence)}`);
  };
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto(base);
  await page.evaluate(() => localStorage.clear());

  // Corruption tests exercise rendering, beyond the storage helper contract.
  for (const raw of ['null', '{}', '42', '{broken', '[null,"unknown","first-uncenter"]']) {
    await page.evaluate(raw => localStorage.setItem('css-uncenter-achievements', raw), raw);
    await page.reload();
    await page.getByRole('button', { name: 'Apply THE BUTTON', exact: true }).waitFor();
    check(`achievement recovery ${raw}`, await page.locator('h1').count() === 1, raw);
  }
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('css-uncenter-high-score', 'invalid');
    localStorage.setItem('css-uncenter-global-counter', 'invalid');
  });
  await page.reload();
  await page.getByRole('button', { name: 'Apply THE BUTTON', exact: true }).click();
  await page.waitForTimeout(150);
  const counters = await page.evaluate(() => ({
    high: localStorage.getItem('css-uncenter-high-score'),
    counter: localStorage.getItem('css-uncenter-global-counter'),
    nan: document.body.innerText.includes('NaN'),
  }));
  check('numeric recovery', counters.high === '25' && counters.counter === '1' && !counters.nan, counters);
  await page.evaluate(() => localStorage.clear());
  await page.reload();

  // Native buttons must change state for both standard activation keys.
  for (const [label, key] of [['THE BUTTON', 'Enter'], ['THE HEADING', 'Space']]) {
    const button = page.getByRole('button', { name: `Apply ${label}`, exact: true });
    await button.focus();
    await page.keyboard.press(key);
    const applied = page.getByRole('button', { name: `Applied ${label}`, exact: true });
    check(`snippet ${key}`, await applied.isDisabled(), label);
  }
  const range = page.getByRole('slider', { name: 'Before and after comparison' });
  await range.focus();
  await page.keyboard.press('ArrowRight');
  check('range keyboard', await range.inputValue() === '51', await range.inputValue());
  await page.keyboard.press('Home');
  check('range Home', await range.inputValue() === '0', await range.inputValue());
  await page.keyboard.press('End');
  check('range End', await range.inputValue() === '100', await range.inputValue());
  await range.fill('40');
  const clip = await page.evaluate(() => [...document.querySelectorAll('[style]')].find(e => e.style.clipPath)?.style.clipPath);
  check('range updates comparison', clip === 'inset(0px 0px 0px 40%)', clip);
  await range.scrollIntoViewIfNeeded();
  const sliderBox = await range.boundingBox();
  await page.mouse.move(sliderBox.x + sliderBox.width * 0.4, sliderBox.y + sliderBox.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(sliderBox.x + sliderBox.width * 0.8, sliderBox.y + sliderBox.height * 0.5, { steps: 8 });
  await page.mouse.up();
  const draggedValue = Number(await range.inputValue());
  check('range pointer drag', draggedValue >= 78 && draggedValue <= 82, draggedValue);

  // Each disclosure announces its state and points to its rendered content.
  for (const pattern of [/^CSS OUTPUT/, /^> Elements/, /Centering Compliance Report/, /^CHANGELOG \+ PRO TIER/, /^SHARE YOUR DESTRUCTION/]) {
    const button = page.getByRole('button', { name: pattern });
    check(`collapsed ${pattern}`, await button.getAttribute('aria-expanded') === 'false', await button.getAttribute('aria-expanded'));
    await button.click();
    const id = await button.getAttribute('aria-controls');
    check(`expanded ${pattern}`, await button.getAttribute('aria-expanded') === 'true' && await page.locator(`[id="${id}"]`).count() === 1, id);
  }
  const recommendation = page.getByRole('button', { name: /Consider using margin: auto/ });
  await recommendation.click();
  const recommendationId = await recommendation.getAttribute('aria-controls');
  check('recommendation expanded', await recommendation.getAttribute('aria-expanded') === 'true' && await page.locator(`[id="${recommendationId}"]`).count() === 1, recommendationId);
  const rawEscapes = await page.evaluate(() => document.body.innerText.includes('\\u2014'));
  check('no literal Unicode escapes', !rawEscapes, rawEscapes);

  const small = await page.evaluate(() => [...document.querySelectorAll('button:not(:disabled)')].map(e => {
    const rect = e.getBoundingClientRect();
    return { text: e.textContent, width: rect.width, height: rect.height };
  }).filter(e => e.width < 43.5 || e.height < 43.5));
  check('44px button targets', small.length === 0, small);
  const color = await page.getByText('Slight offsets & rotations. Tasteful destruction.', { exact: true }).evaluate(e => ({ color: getComputedStyle(e).color, font: getComputedStyle(e).fontSize }));
  check('readable mode description', color.color === 'rgb(179, 255, 255)' && color.font === '16px', color);

  const icon = await page.request.get(`${base}/favicon.svg`);
  check('real SVG favicon', icon.status() === 200 && icon.headers()['content-type'].includes('image/svg+xml') && (await icon.text()).includes('<svg'), icon.headers()['content-type']);
  check('capture dependency deferred', !requests.some(url => url.includes('html2canvas')), requests.filter(url => url.includes('html2canvas')));
  const downloadPromise = page.waitForEvent('download', { timeout: 15000 });
  await page.getByRole('button', { name: 'DOWNLOAD SHARE IMAGE', exact: true }).click();
  const download = await downloadPromise;
  check('image download', download.suggestedFilename() === 'css-uncenter-score-55.png', download.suggestedFilename());
  check('capture dependency loaded on demand', requests.some(url => url.includes('html2canvas')), requests.filter(url => url.includes('html2canvas')));

  for (const label of ['THE IMAGE', 'THE NAV', 'THE HERO', 'THE CARD', 'THE FOOTER', 'THE PADDING']) {
    await page.getByRole('button', { name: `Apply ${label}`, exact: true }).click();
  }
  await page.getByText('EVEN MORE CHAOS — UNLOCKED', { exact: true }).waitFor();
  const progress = await page.evaluate(() => ({ score: localStorage.getItem('css-uncenter-high-score'), achievements: JSON.parse(localStorage.getItem('css-uncenter-achievements')) }));
  check('healthy score and achievements', progress.score === '225' && progress.achievements.length === 6, progress);
  for (const label of ['THE BLINK TAG', 'THE MARQUEE', 'THE TABLE LAYOUT']) {
    await page.getByRole('button', { name: `Apply ${label}`, exact: true }).focus();
    await page.keyboard.press('Enter');
    check(`extra keyboard ${label}`, await page.getByRole('button', { name: `Applied ${label}`, exact: true }).isDisabled(), label);
  }
  await page.getByRole('button', { name: 'RESTORE SANITY (undo all)', exact: true }).click();
  const resetRecord = await page.getByText('HIGH SCORE', { exact: true }).locator('..').innerText();
  check('reset preserves visible and persisted record', await page.evaluate(() => localStorage.getItem('css-uncenter-high-score')) === '385' && resetRecord.includes('385') && await page.getByRole('slider').count() === 0, resetRecord);

  // Start a fresh document under reduced motion so canvas preference is measured too.
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await page.getByRole('button', { name: 'Apply THE BUTTON', exact: true }).click();
  await page.waitForTimeout(500);
  const reduced = await page.evaluate(() => {
    const tip = [...document.querySelectorAll('div')].find(e => e.textContent?.startsWith('PRO TIP:') && e.children.length === 0);
    return { animation: tip ? getComputedStyle(tip).animationName : null, canvasCount: document.querySelectorAll('canvas').length };
  });
  check('reduced CSS and confetti motion', reduced.animation === 'none' && reduced.canvasCount === 0, reduced);
  await page.waitForTimeout(3600);
  check('reduced title motion', await page.locator('h1').innerText() === 'CSS UN-CENTER PRO', await page.locator('h1').innerText());
  check('no runtime errors', errors.length === 0, errors);
  await page.evaluate(() => localStorage.clear());
  return { base, results, errors, passed: results.length };
}
