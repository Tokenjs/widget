import { h } from 'preact';
import QRious from 'qrious';

const QrCode = ({ size, value }) => (
  <img
    src={new QRious({ size, value }).toDataURL()}
    alt={value}
  />
);

export default QrCode;
