import fs from 'node:fs';
import { buildScreenCttList, buildActionMenusOverview } from './generate-all-screens.mjs';

// Prepare specification containing the CTT List Screen and the 6 Status Action Menus
const cttSpecs = [
  { ...buildScreenCttList(), x: 0, y: 0 },
  { ...buildActionMenusOverview(), x: 0, y: 1000 }
];

fs.writeFileSync('d:/BA Master Flow/scripts/ctt-list-spec.json', JSON.stringify(cttSpecs, null, 2), 'utf8');
console.log('✅ Generated ctt-list-spec.json successfully!');
