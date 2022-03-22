import { useState, useEffect } from 'react';
import bitmapToBlob from 'utils/bmpToBlob';

export const useSizesProducer = props => {
  const [worker, setWorker] = useState(null);
  const [outImageBmp, setOutimagebmp] = useState();
  const [outImageBlob, setOutimageblob] = useState();

  // wait for the worker to load
  useEffect(() => {
    const getWorker = async () => {
      const Worker = await import('./sizesWorker');
      await setWorker(Worker.default());
    };

    getWorker();
  }, []);

  // Redraw mosaic if params ok
  useEffect(() => {
    if (worker && props.image) {
      const makeImg = () => {
        // Don't make this an async function, it does not work
        // with web workers
        createImageBitmap(props.image)
          .then(imageBitmap => {
            worker.postMessage({ image: imageBitmap }, [imageBitmap]);
            const simpleProps = JSON.parse(props.stringifiedProps);
            worker.postMessage({ props: simpleProps });
          }).catch(
            err => console.error('Problem creating ImageBitmap', err) // eslint-disable-line no-console
          );
      };

      makeImg();
    }
  }, [props.stringifiedProps, props.image, worker]);

  // Listen to the worker's "finished" messge
  useEffect(() => {
    if (worker) {
      worker.onmessage = msg => {
        const { status, bmp } = msg.data;
        if (status && status === 'finished') {
          if (bmp) {
            setOutimagebmp(bmp);
          }
        }
      };
    }

    // Remove listener
    return () => { if (worker) { worker.onmessage = null; } };
  }, [worker]);

  useEffect(() => {
    const makeBlob = async () => {
      const blob = await bitmapToBlob(outImageBmp);
      setOutimageblob(blob);
    };

    if (outImageBmp) {
      makeBlob();
    }
  }, [outImageBmp]);

  return [outImageBmp, outImageBlob];
};
