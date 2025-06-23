import { Typewriter } from "react-simple-typewriter";

function Landing() {
  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#0D0D0D] text-white relative overflow-hidden flex items-center justify-center">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.05] text-white pointer-events-none select-none font-mono text-[12px] leading-loose z-0 whitespace-pre-wrap p-10">
        {Array(40)
          .fill(
            "Breaking News | World | Economy | Tech | Sports | Headlines | Weather | Real-Time Updates | Trending Now | Exclusive"
          )
          .join(" — ")}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-3xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-red-500">
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
