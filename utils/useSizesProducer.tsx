import { useState, useEffect, useMemo } from 'react';
import bitmapToBlob from 'utils/bmpToBlob';

interface Props {
  image: ImageBitmap;
  stringifiedProps: string;
}

export const useSizesProducer = (props: Props): [ImageBitmap, Blob] => {
  const [outImageBmp, setOutimagebmp] = useState<ImageBitmap | null>(null);
  const [outImageBlob, setOutimageblob] = useState<Blob | null>(null);

  const worker: Worker = useMemo(
    () => new Worker(new URL("./sizesWorker", import.meta.url)),
    []
  );

  // Redraw mosaic if params ok
  useEffect(() => {
    if (props.image) {
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
  }, [worker, props.stringifiedProps, props.image]);

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
