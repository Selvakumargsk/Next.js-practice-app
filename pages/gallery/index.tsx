import React, { useState } from 'react';
import { getLayout } from '../components/layout';
import { usePhotogallery } from '@/hooks/usePhotoGalleryQuery';

const PHOTOS_PER_PAGE = 20;

function Gallery() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = usePhotogallery(`https://jsonplaceholder.typicode.com/photos`  , {
    PHOTOS_PER_PAGE ,
    currentPage
  });

  console.log(isLoading);
  

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <div className='m-3'>
      <div className="grid grid-cols-4 gap-4">
        {Array.isArray(data?.data) && data?.data.map((photo:any) => (
          <div key={photo.id}>
            <img src={photo.url} alt={photo.title} />
            <p>{photo.id}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full mx-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <p className='bg-red-700 text-white rounded px-2'>
        {currentPage}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full mx-1 pointer"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === 30}
        >
          Next
        </button>
      </div>
    </div>
  );
}

(Gallery as any).getLayout = getLayout;

export default Gallery;
