function info_pfm(
  binaryData: ArrayBuffer
): [boolean, [number, number], number, number] {
  const dataView = new DataView(binaryData);
  let byteOffset = 0;
  let line = "";
  let isColored = false;
  let width = 0;
  let height = 0;
  let scale = 0;

  // Read the first line
  while (true) {
    const charCode = dataView.getUint8(byteOffset++);
    if (charCode === 10) {
      // Newline character
      break;
    }
    line += String.fromCharCode(charCode);
  }

  // Check if the PFM is colored or not
  if (line === "PF") {
    isColored = true;
  } else if (line !== "Pf") {
    throw new Error("Invalid PFM format");
  }

  // Read the width and height
  line = "";
  while (true) {
    const charCode = dataView.getUint8(byteOffset++);
    if (charCode === 10) {
      // Newline character
      break;
    }
    line += String.fromCharCode(charCode);
  }
  const [widthStr, heightStr] = line.split(" ");
  width = parseInt(widthStr);
  height = parseInt(heightStr);

  // Read the scale variable
  line = "";
  while (true) {
    const charCode = dataView.getUint8(byteOffset++);
    if (charCode === 10) {
      // Newline character
      break;
    }
    line += String.fromCharCode(charCode);
  }
  scale = parseFloat(line);

  return [isColored, [width, height], scale, byteOffset];
}
export default info_pfm