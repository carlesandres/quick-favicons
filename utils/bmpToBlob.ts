export const canvasToBlob = async (canvas: HTMLCanvasElement) => {
  const blob = await new Promise(resolve => {
    canvas.toBlob(blob => resolve(blob));
  });
  return blob as Blob;
};

const bmpToBlob = async (bitmap: ImageBitmap) => {
  if (!bitmap?.width) {
    throw new Error('image empty');
  }

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('bitmaprenderer');
  if (!ctx) {
    return null;
  }
  // We have to "clone" the bitmap so that we don't "transfer"
  // the input image, which would make this method destructive instead
  // of functional.
  const newBitmap = await window.createImageBitmap(bitmap);

  ctx.transferFromImageBitmap(newBitmap);
  const blob = await canvasToBlob(canvas);
  return blob;
};

export default bmpToBlob;
