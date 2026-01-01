#! /usr/bin/env node

const command = process.argv[2];

if (!command) {
  console.log('Usage: maverick <command>');
  process.exit(1);
}

if (command === 'health') {
  try {
    const res = await fetch('http://localhost:4545/health');
    const data = await res.json();
    console.log('Maverick status:')
    console.log('- Service:', data.service);
    console.log('- Status:', data.status);
    console.log('- Uptime (seconds):', data.uptime.toFixed(2));
  } catch (error) {
    console.error('Error fetching health status:', error.message);
  }
} else if (command === 'ingest') {
  const targetPath = process.argv[3];
  if (!targetPath) {
    console.log('Usage: maverick ingets <path>');
    process.exit(1);
  }

  try {
    const res = await fetch('http://localhost:4545/ingest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: targetPath }),
    });
    const data = await res.json();
    console.log('Ingestion successful:', data);
  } catch (error) {
    console.error('Error during ingestion:', error.message);
  }
} else if (command === 'search') {
  const query = process.argv.slice(3).join(' ');
  if (!query) {
    console.log('Usage: maverick search <query>');
    process.exit(1);
  }

  try {
    const res = await fetch('http://localhost:4545/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    const results = await res.json();

    console.log(`🔎 Top results:\n`, results);

    results.data.forEach((r, i) => {
      console.log(`#${i + 1} (${r.score.toFixed(3)})`);
      console.log(`📄 ${r.path}`);
      if (r.startLine) {
        console.log(`📍 lines ${r.startLine}–${r.endLine}`);
      }
      console.log(r.content.slice(0, 300));
      console.log("—".repeat(50));
    });
  } catch (error) {
    console.error('Error during search:', error.message);
  }
} else {
  console.log(`Unknown command: ${command}`);
  process.exit(1);
}