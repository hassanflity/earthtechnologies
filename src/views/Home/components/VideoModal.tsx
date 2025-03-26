// VideoModal.tsx
import React from 'react';
import Modal from 'react-modal';
import './css/videoModal.css';

// Set the root element for accessibility
Modal.setAppElement('#root');

interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  videoUrl,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel='Video Modal'
      className='modal'
      overlayClassName='overlay'
    >
      <button onClick={onClose} className='close-button'>
        ×
      </button>
      <div className='modal-content'>
        <video controls autoPlay>
          <source src={videoUrl} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      </div>
    </Modal>
  );
};

export default VideoModal;
