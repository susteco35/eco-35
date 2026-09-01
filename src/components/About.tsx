export default function About() {
  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="container-px mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="reveal relative">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/8199196/pexels-photo-8199196.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Our batch sharing a moment"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 to-transparent" />
            </div>
            <div className="glass absolute -bottom-6 -right-4 hidden rounded-2xl px-7 py-5 shadow-xl sm:block">
              <p className="font-display text-3xl font-semibold text-gold-500">35</p>
              <p className="text-xs uppercase tracking-widest2 text-slatey-400">Economics Batch</p>
            </div>
          </div>

          {/* Text */}
          <div className="reveal">
            <span className="eyebrow">About Us</span>
            <h2 className="mt-4 heading-display text-4xl text-navy-900 sm:text-5xl dark:text-white">
              More Than a Batch
            </h2>
            <div className="mt-6 h-px w-12 bg-gradient-to-r from-gold-400 to-gold-600" />

            {/* Large quotation mark */}
            <div className="relative mt-8">
              <span className="pointer-events-none absolute -left-2 -top-8 font-display text-7xl leading-none text-gold-500/30">
                &ldquo;
              </span>
              <p className="relative text-pretty text-lg leading-relaxed text-slatey-600 dark:text-slatey-300">
                We are more than classmates. We share experiences, friendships,
                challenges and memories. Our journey at SUST connects us beyond
                the classroom.
              </p>
            </div>

            {/* Quote */}
            <blockquote className="mt-8 border-l-2 border-gold-500 pl-5">
              <p className="font-display text-xl italic leading-relaxed text-navy-800 dark:text-slatey-100">
                &ldquo;It&rsquo;s not just about the destination, it&rsquo;s about
                the people you travel the journey with.&rdquo;
              </p>
            </blockquote>

            <div className="mt-8 flex flex-wrap gap-3">
              {['Friendship', 'Memories', 'Growth', 'Forever'].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slatey-200 px-4 py-1.5 text-xs font-medium text-slatey-600 transition-colors hover:border-gold-500 hover:text-gold-600 dark:border-navy-700 dark:text-slatey-300 dark:hover:border-gold-500 dark:hover:text-gold-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
