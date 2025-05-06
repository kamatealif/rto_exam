'use client'
import { ArrowRight, CheckCircle2, Brain, Trophy, Sparkles } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      text: "Practice with real RTO exam questions",
      description: "Access our extensive database of verified questions from actual RTO exams",
      color: "from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10"
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      text: "Instant feedback and explanations",
      description: "Get detailed explanations for each answer to understand concepts better",
      color: "from-emerald-500/20 to-teal-500/20 dark:from-emerald-500/10 dark:to-teal-500/10"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      text: "Pass your exam with confidence",
      description: "95% of our users pass their RTO exam on their first attempt",
      color: "from-orange-500/20 to-amber-500/20 dark:from-orange-500/10 dark:to-amber-500/10"
    }
  ];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Master Your{' '}
            <span className="text-black dark:text-white relative inline-block">
              RTO Exam
              <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-black/0 via-black dark:from-white/0 dark:via-white opacity-20"></div>
            </span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            Practice with our comprehensive question bank and boost your confidence for the real RTO exam. Start your journey to becoming a licensed driver today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/practice"
              className="group rounded-lg bg-black dark:bg-white px-6 py-3 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-200 ease-out hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Start Practice
                <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-gray-800/10 to-black/0 dark:from-white/0 dark:via-gray-200/10 dark:to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </a>
            <a
              href="/question-bank"
              className="group text-sm font-semibold leading-6 text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 flex items-center"
            >
              View Question Bank 
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none ml-2">
                →
              </span>
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black p-px hover:shadow-lg transition-all duration-300 ease-out"
              >
                <div className="relative h-full rounded-2xl bg-white dark:bg-black p-8 transition-transform duration-300 group-hover:-translate-y-1">
                  <div className="absolute inset-0 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100/80 dark:bg-gray-900/80 text-black dark:text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                      <Sparkles className="w-3 h-3 absolute top-0 right-0 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <dt className="text-lg font-semibold leading-7 text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">
                      {feature.text}
                    </dt>
                    <dd className="mt-3 text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                      {feature.description}
                    </dd>
                  </div>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 border-t border-gray-200 dark:border-gray-800 pt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { number: "1000+", label: "Practice Questions" },
              { number: "95%", label: "Pass Rate" },
              { number: "24/7", label: "Practice Access" }
            ].map((stat, index) => (
              <div key={index} className="group text-center p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors duration-200">
                <div className="text-4xl font-bold tracking-tight text-black dark:text-white group-hover:scale-105 transition-transform duration-200">
                  {stat.number}
                </div>
                <div className="mt-2 text-base text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
        <div
          className="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80808012] to-[#80808012] opacity-25"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
