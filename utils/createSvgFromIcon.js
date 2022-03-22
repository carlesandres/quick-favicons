export const createSvgFromIcon = async (iconName) => {
  const imgUrl = `icons/${iconName}.svg`;
  const resp = await fetch(imgUrl);
  const XML = await resp.text();
  const domparser = new DOMParser();
  const ppp = domparser.parseFromString(XML, 'image/svg+xml');
  const svg = ppp.querySelector('svg');
  const viewBox = svg && svg.getAttribute('viewBox');
  const [, , width, height] = viewBox?.split(' ');

  const domPath = ppp.querySelector('path');
  const path = domPath?.getAttribute('d');
  if (!path) {
    return;
  }

  const path2D = new Path2D(path);
  const icon = Object.assign({}, {
    path2D,
    width: parseInt(width, 10),
    height: parseInt(height, 10)
  });

  return icon;
};

