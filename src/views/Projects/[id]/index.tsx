import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './css/project-details.css';
import { etGet } from '../../../utils/blfetch';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import { BackIcon, NextIcon, CloseIcon } from '../../../components/icons';
import { Helmet } from 'react-helmet';


interface Project {
  id: string;
  imgSrc: string;
  title: string;
  title_url: string;
  image: string;
  description: string;
  gallery: Gallery[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
}

interface Gallery {
  id: string;
  imgSrc: string;
  desc: string;
}

interface Description {
  id: string;
  title: string;
  value: string;
}

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [baseURL, setBaseURL] = useState<string>();
  const [project, setProject] = useState<Project>();
  const [iconSize, setIconSize] = useState<number>(36);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null
  ); // Keep track of the current image index for the modal
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const updateIconSize = () => {
    if (window.innerWidth <= 960) {
      setIconSize(25); // Smaller size for screen widths <= 960px
    } else {
      setIconSize(36); // Default size for larger screens
    }
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentImageIndex(null);
  };

  const showNextImage = () => {
    if (currentImageIndex !== null && project?.gallery) {
      setCurrentImageIndex((currentImageIndex + 1) % project.gallery.length);
    }
  };

  const showPreviousImage = () => {
    if (currentImageIndex !== null && project?.gallery) {
      setCurrentImageIndex(
        (currentImageIndex - 1 + project.gallery.length) %
        project.gallery.length
      );
    }
  };

  // const showNextImage = () => {
  //   if (currentImageIndex !== null && project?.gallery) {
  //     if (currentImageIndex < project.gallery.length - 1) {
  //       // Only go to the next image if it is not the last one
  //       setCurrentImageIndex(currentImageIndex + 1);
  //     }
  //   }
  // };

  // const showPreviousImage = () => {
  //   if (currentImageIndex !== null && project?.gallery) {
  //     if (currentImageIndex > 0) {
  //       // Only go to the previous image if it is not the first one
  //       setCurrentImageIndex(currentImageIndex - 1);
  //     }
  //   }
  // };

  useEffect(() => {
    const baseURL = window.location.origin;
    setBaseURL(baseURL);

    etGet(`api_our_projects`, (data) => {
      const projects = data.list;

      function findProjectById() {
        for (let project of projects) {
          if (project.title_url === id) {
            return project;
          }
        }

        return null;
      }

      setProject(findProjectById());
    });
  }, []);

  useEffect(() => {
    // Update icon size on component mount
    updateIconSize();

    // Add a listener for window resize events
    window.addEventListener('resize', updateIconSize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateIconSize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{project?.title}</title>
        <meta name="title" content={project?.meta_title} />
        <meta name="description" content={project?.meta_description} />
        <meta name="keywords" content={project?.meta_keywords} />
      </Helmet>
      <div className='main-container'>
        {project ? (
          <>
            <div className='main-title'>
              <div className='container'>
                <div>
                  <div className='text'>{project.title}</div>
                  <div className='back-btn'>
                    <NavLink className='logo' to='/projects'>
                      <BackIcon w={iconSize} h={iconSize} color='#fff' />
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>

            <div className='project-desc' dangerouslySetInnerHTML={{ __html: project.description }}>

            </div>

            <div className='inner-section project-gallery'>
              {project.gallery ? (
                project.gallery.map((gal, index) => (
                  <div key={gal.id} onClick={() => openModal(index)}>
                    <img
                      src={gal.imgSrc}
                      alt={gal.desc}
                      className='gallery-image'
                    />
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>

            {/* Modal for viewing gallery images with next/previous navigation */}
            {modalIsOpen && currentImageIndex !== null && project.gallery && (
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel='Image Modal'
              >
                <div className='modal-content'>
                  <button onClick={closeModal} className='close-btn'>
                    <CloseIcon w={25} h={25} color='#fff' />
                  </button>
                  <img
                    src={`${project.gallery[currentImageIndex].imgSrc}`}
                    alt={project.gallery[currentImageIndex].desc}
                    className='modal-image'
                  />
                  <div className='popup-nav'>
                    <button onClick={showPreviousImage} className='nav-btn'>
                      <BackIcon w={30} h={30} color='#fff' />
                    </button>
                    <button onClick={showNextImage} className='nav-btn'>
                      <NextIcon w={30} h={30} color='#fff' />
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </>
        ) : (
          <></>
        )}
      </div >
    </>
  );
};

export default ProjectDetails;
