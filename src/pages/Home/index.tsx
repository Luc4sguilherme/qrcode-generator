import './style.css';

import qrcode from 'qrcode';
import { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import ErrorAlert from '../../components/ErrorAlert';
import Modal from '../../components/Modal';
import QRCode from '../../components/QRCode';
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { useError } from '../../contexts/errorContext';

function Home() {
  const [url, setUrl] = useState('');
  const [open, setOpen] = useState(false);
  const { setError } = useError();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function generateQrCode() {
    if (url) {
      handleOpen();
    } else {
      setError('Input is empty');
    }
  }

  async function handleSaveFile(url: string) {
    try {
      const qrcodeURL = await qrcode.toDataURL(url, {
        scale: 10,
      });
      const link = document.createElement('a');

      link.download = `qrcode.png`;
      link.href = qrcodeURL;
      link.click();
    } catch (error) {
      setError('There was an error generating the QR code');
    }
  }

  return (
    <ErrorAlert>
      <div className="App">
        <ThemeSwitcher />

        <div className="form-wrapper">
          <form>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="Enter the link here"
              value={url}
              onChange={event => setUrl(event.target.value)}
            />

            <button
              type="submit"
              onClick={event => {
                event.preventDefault();
                generateQrCode();
              }}
            >
              Generate
            </button>
          </form>
        </div>

        <Modal open={open} handleClose={handleClose}>
          <QRCode text={url} />

          <button
            type="button"
            onClick={handleClose}
            className="close-modal-btn"
          >
            <CloseIcon />
          </button>

          <button
            type="button"
            onClick={() => {
              handleSaveFile(url);
            }}
            className="save-file-btn"
          >
            Save
          </button>
        </Modal>
      </div>
    </ErrorAlert>
  );
}

export default Home;
