import { Typewriter } from "react-simple-typewriter";

function Landing() {
  const keywords = [
    "Breaking News", "World", "Economy", "Tech", "Sports", "Headlines",
    "Weather", "Real-Time", "Trending", "Exclusive", "Politics", "Health", "Business", "Updates"
  ];

  return (
    <div className="h-screen top-0 bg-[#121212] text-white relative overflow-hidden flex items-center justify-center m-0 p-0">
      {/* Background texture with improved contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none p-6 flex flex-wrap gap-2">
        {Array.from({ length: 100 }).map((_, i) => {
          const word = keywords[Math.floor(Math.random() * keywords.length)];
          const size = Math.floor(Math.random() * 8) + 22; // 14px to 22px
          const opacity = (Math.random() * 0.2 + 0.1).toFixed(2); // 0.1 to 0.3

          return (
            <span
              key={i}
              className="font-mono whitespace-nowrap"
              style={{
                fontSize: `${size}px`,
                opacity,
                color: `rgba(255, 255, 255, ${opacity})`,
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-[#b91c1c]">
          Stay Ahead of the Headlines
        </h1>

        <div className="text-xl sm:text-2xl md:text-3xl mb-6">
          <span className="text-gray-100">
            <Typewriter
              words={[
                "Real-time news.",
                "Curated insights.",
                "One place.",
                "Your bite of the news world.",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Landing;
