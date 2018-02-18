import { h } from 'hyperapp';
import component from 'hyperapp-nestable';
import QRious from 'qrious';

const QrCode = component(
  {
    size: 0,
    value: '',
    dataUrl: '',
  },
  {
    init: () => ({ size, value }) => ({
      dataUrl: generate({ size, value }),
    }),
  },
  ({ value, dataUrl }) => (
    <img src={dataUrl} alt={value} />
  )
);

function generate({ size, value }) {
  const qr = new QRious({
    size,
    value,
  });
  return qr.toDataURL();
}

export default QrCode;
