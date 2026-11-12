import { runFigmaCode } from './figma-runner.mjs';

async function main() {
  const code = `
    const res = await figma.searchNodes({ query: "-DT-" });
    const frames = (res?.nodes || []).filter(n => n.type === 'FRAME' && n.name.includes('-DT-'));
    
    const details = [];

    for (const f of frames) {
      const topChildren = await figma.getChildren(f.id);
      const mainWrapper = topChildren?.find(c => c.name === 'Main Content Wrapper' || c.name === 'Base Screen Layout');
      
      let pageAreaChildren = [];
      if (mainWrapper) {
        let mwChildren = await figma.getChildren(mainWrapper.id);
        if (mainWrapper.name === 'Base Screen Layout') {
          const innerMW = mwChildren?.find(c => c.name === 'Main Content Wrapper');
          if (innerMW) mwChildren = await figma.getChildren(innerMW.id);
        }
        const pageArea = mwChildren?.find(c => c.name === 'Page Content Area');
        if (pageArea) {
          pageAreaChildren = await figma.getChildren(pageArea.id);
        }
      }

      details.push({
        id: f.id,
        name: f.name,
        pageAreaChildrenNames: pageAreaChildren.map(c => c.name)
      });
    }

    return details;
  `;

  const result = await runFigmaCode(code, 'Page 2');
  console.log('Row 3 Details Verification:');
  console.log(JSON.stringify(result, null, 2));
}

main();
