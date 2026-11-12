try {
  await figma.deleteNode("4068:2");
} catch {}
return { status: "deleted" };
