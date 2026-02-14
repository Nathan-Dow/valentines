"use client";
import { useState, useRef } from 'react';
import BouquetScene from '@/components/BouquetScene';
import { motion, AnimatePresence } from 'framer-motion';

const MEMORIES = [
  { id: 1, url: '/photo1.jpg', caption: 'Last year\'s Valentines' },
  { id: 2, url: '/photo2.jpg', caption: 'A birthday to remember' },
  { id: 3, url: '/photo3.jpg', caption: "First time!" },
  { id: 4, url: '/photo4.jpg', caption: 'Growth together' },
  { id: 5, url: '/photo5.jpg', caption: 'Never a boring moment' },
  { id: 6, url: '/photo6.jpg', caption: 'A year for the books' },
];

const BUFFER_RANGE = 2.5; 
const SCROLL_RANGE = 7.0; // Increased to accommodate the extra letter card
const TOTAL_CYCLE = BUFFER_RANGE + SCROLL_RANGE; 

export default function Home() {
  const [showCarousel, setShowCarousel] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleRotate = (yRotation: number) => {
    // We disable carousel logic if the modal is open so it doesn't move in the background
    if (isLetterOpen) return;

    const absRot = Math.abs(yRotation);
    const cyclePos = absRot % TOTAL_CYCLE;

    if (cyclePos < BUFFER_RANGE) {
      if (showCarousel) setShowCarousel(false);
      setProgress(0);
    } else {
      if (!showCarousel) setShowCarousel(true);
      const scrollProgress = (cyclePos - BUFFER_RANGE) / SCROLL_RANGE;
      setProgress(scrollProgress);

      if (scrollRef.current) {
        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollLeft = scrollProgress * maxScroll;
      }
    }
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#381d52]">
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <BouquetScene onRotate={handleRotate} isCarouselOpen={showCarousel} />
      </div>

      <AnimatePresence>
        {showCarousel && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
            
            <motion.div 
              ref={scrollRef}
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="w-full flex gap-12 overflow-x-hidden px-[35%] py-10" 
            >
              {/* --- GREETING CARD --- */}
              <div className="min-w-[400px] aspect-[4/3] bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 flex-shrink-0 border-4 border-pink-200">
                <h2 className="text-pink-500 font-serif text-5xl mb-4 text-center">Happy Valentine's!</h2>
                <p className="text-gray-500 font-serif italic text-center text-lg">Scroll through to see the end...</p>
              </div>

              {/* --- MEMORIES --- */}
              {MEMORIES.map((item) => (
                <div key={item.id} className="min-w-[300px] aspect-[3/4] bg-white p-3 shadow-2xl rounded-lg flex-shrink-0">
                  <div className="w-full h-[85%] bg-pink-50 rounded-md overflow-hidden flex items-center justify-center">
                    <img src={item.url}/>
                  </div>
                  <p className="mt-4 text-center font-serif text-gray-700 italic border-t pt-2">{item.caption}</p>
                </div>
              ))}

              {/* --- CLICKABLE LETTER CARD --- */}
              <div 
                onClick={() => setIsLetterOpen(true)}
                className="min-w-[300px] aspect-[3/4] bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center p-6 flex-shrink-0 cursor-pointer pointer-events-auto border-2 border-dashed border-pink-400 hover:bg-pink-200 transition-colors group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">✉️</div>
                <p className="text-pink-600 font-serif font-bold text-xl">A Letter for Alexia</p>
                <p className="text-pink-400 text-sm mt-2 font-serif italic">Click to open</p>
              </div>
              
              <div className="min-w-[35%] h-1" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- THE LETTER MODAL --- */}
      <AnimatePresence>
        {isLetterOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#fff9f0] w-full max-w-lg p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
            >
              {/* Decorative "Paper" lines */}
              <div className="absolute inset-0 opacity-10 pointer-events-none" 
                   style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px)', backgroundSize: '100% 2rem' }} />
              
              <button 
                onClick={() => setIsLetterOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 transition-colors text-xl font-bold"
              >✕</button>

              <div className="relative z-10 font-serif text-gray-800 space-y-4 max-h-128 overflow-y-auto pr-2">
                <p className="text-lg">Dearest Alexia,</p>
                <p className="leading-relaxed">
                  Thank you for being the fountain of my joy and the center of my world. In the restlessness of the world, and the complexities of my days, you are the melody that makes sense of it all. Through you, I find a clarity I never knew existed and a direction that leads me exactly where I need to be.	
                  <br/>
                  <br/>
                  You are the light that pierces my world of heavy clouds. Undoubtedly, even small conversations and moments become worthy of remembrance and cherish. Throughout the past year, I found myself constantly in awe of the elegance you carry, a fact you often deny. 
                  <br/>
                  <br/>
                  I am deeply grateful for the way you treat me, for the way you believe in my dreams, and for your constant choice to be a constant in my life. You have been key in keeping me grounded and inspired throughout all of my endeavors. I would be half the man I am today if it wasn’t for your daily late night conversations and encouragement. I hope that you have truly been delighted with the things that we have done together this past year. From tasting new eats to fulfilling unforgettable dates, you have truly been the beacon of light that lifts up my world. 
                  <br/>
                  <br/>
                  I’m still excited for all the memories we haven’t made yet, for the future sunrises and sunsets we’ll watch together, the challenges we’ll overcome, and many more Valentine’s dates that we’ll spend. I hope that this digital gift provides you with even an inkling of the joy that you have provided me. Thank you for illuminating my life with the flame of your fervent love.
                  <br/>
                  <br/>
                  Happy Valentine's!

                </p>
                <p className="pt-4 italic">Love, Nathan</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {!showCarousel && !isLetterOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute bottom-20 w-full text-center text-black italic font-serif">
          Spin the flower to reveal gifts.
        </motion.div>
      )}
    </main>
  );
}