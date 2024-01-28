import SizesMaker from 'utils/sizesMaker';

const onFinished = (canvas: OffscreenCanvas) => {
  requestAnimationFrame(() => {
    const bmp = canvas.transferToImageBitmap();
    self.postMessage({
      status: 'finished',
      bmp
    }, '' , [bmp]);
  });
};

let image: ImageBitmap;

self.onmessage = (e: MessageEvent) => {
  if (e.data.image) {
    image = e.data.image;
    return;
  }

  if (e.data.props) {
    const props = { ...e.data.props, image};
    if (props.squareMosaic) {
      props.colsInMosaic = props.rowsInMosaic;
    }
    const offscreen = new OffscreenCanvas(256, 256);
    new SizesMaker(props, offscreen, onFinished); // eslint-disable-line no-new
  }
};
