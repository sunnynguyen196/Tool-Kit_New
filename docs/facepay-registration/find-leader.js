import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const searchDirs = [
  process.env.APPDATA,
  process.env.LOCALAPPDATA,
  process.env.TEMP,
  path.join(process.env.LOCALAPPDATA, 'Programs'),
  path.join(process.env.APPDATA, 'Figma'),
  path.join(process.env.LOCALAPPDATA, 'Figma')
].filter(Boolean);

console.log('Searching in system dirs:', searchDirs);

let found = false;

const walk = (dir, depth = 0) => {
  if (depth > 4) return; // limit depth to avoid freezing
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      let stat;
      try {
        stat = fs.statSync(fullPath);
      } catch (e) {
        return;
      }
      if (stat.isDirectory()) {
        // Only search directories starting with gemini, antigravity, or temp-like names
        if (file.toLowerCase().includes('gemini') || 
            file.toLowerCase().includes('antigravity') || 
            file.toLowerCase().includes('figma') || 
            file.toLowerCase().includes('mcp') ||
            depth === 0) {
          walk(fullPath, depth + 1);
        }
      } else if (file === 'leader.json') {
        console.log(`🎉 FOUND leader.json at: ${fullPath}`);
        console.log('Content:', fs.readFileSync(fullPath, 'utf8'));
        found = true;
      }
    });
  } catch(e) {
    // Ignore error
  }
};

searchDirs.forEach(dir => {
  if (!found) {
    walk(dir);
  }
});

if (!found) {
  console.log('leader.json was not found in system appdata or temp.');
}
