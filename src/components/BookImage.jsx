// import { useState } from 'react';

// export default function BookImage({ src, alt }) {
//   const [loaded, setLoaded] = useState(false);
//   const [error, setError] = useState(false);

//   const imageSrc = error || !src ? '/fallback-book-cover.jpg' : src;

//   return (
//     <div className="relative aspect-[2/3] w-full bg-gray-200 overflow-hidden">
//       {!loaded && (
//         <div className="absolute inset-0 animate-pulse bg-gray-300 z-10" />
//       )}

//       <img
//         src={imageSrc}
//         alt={alt || 'Book'}
//         className={`w-full h-full object-cover transition-opacity duration-300 ${
//           loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
//         }`}
//         onLoad={() => {
//           console.log(`[Image Loaded] src=${src}`);
//           setLoaded(true);
//         }}
//         onError={(e) => {
//           console.error(`[Image Error] src=${src}`);
//           setError(true);
//           setLoaded(true);
//         }}
//       />
//     </div>
//   );
// }
