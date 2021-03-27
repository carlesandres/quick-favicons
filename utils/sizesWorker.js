import SizesMaker from 'utils/sizesMaker';

const onFinished = canvas => {
  requestAnimationFrame(() => {
    const bmp = canvas.transferToImageBitmap();
    self.postMessage({
      status: 'finished',
      bmp
    }, [bmp]);
  });
};

self.onmessage = e => {
  if (e.data.image) {
    self.image = e.data.image;
    return;
  }

  if (e.data.props) {
    const props = Object.assign({}, e.data.props, { image: self.image });
    if (props.squareMosaic) {
      props.colsInMosaic = props.rowsInMosaic;
    }
    new SizesMaker(props, OffscreenCanvas, onFinished); // eslint-disable-line no-new
  }
};
