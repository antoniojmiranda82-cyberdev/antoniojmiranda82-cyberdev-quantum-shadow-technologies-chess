const base = process.env.BASE_URL ?? 'http://localhost:3000';
const routes = ['/', '/ai-automation', '/cloud-strategy', '/cybersecurity', '/software', '/process'];
let failed = false;
for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`);
    console.log(response.status, route);
    if (!response.ok) failed = true;
  } catch (error) {
    console.error('ERR', route, error.message);
    failed = true;
  }
}
if (failed) process.exit(1);
