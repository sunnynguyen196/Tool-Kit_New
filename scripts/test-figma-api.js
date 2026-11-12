const testFrame = await figma.create({
  type: "FRAME",
  name: "API Test Frame",
  x: 0,
  y: 0,
  width: 400,
  height: 120,
  fill: "#F8FAFC",
  stroke: "#CBD5E1",
  strokeWeight: 1,
  cornerRadius: 8,
  layoutMode: "HORIZONTAL",
  primaryAxisAlignItems: "CENTER",
  counterAxisAlignItems: "CENTER",
  itemSpacing: 12,
  paddingLeft: 16,
  paddingRight: 16
});

const label = await figma.create({
  type: "TEXT",
  parentId: testFrame.id,
  name: "Label",
  characters: "Test Auto Layout Label",
  fontSize: 14,
  fontWeight: "Bold",
  fill: "#3B82F6"
});

return { frameId: testFrame.id, textId: label.id };
