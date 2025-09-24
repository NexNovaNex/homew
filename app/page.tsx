'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Playfair_Display, Inter } from 'next/font/google'
import Image from 'next/image'
import BuyBox from '../components/BuyBox';

// Add this TypeScript declaration at the top, after imports
// @ts-ignore
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal'],
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Page() {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState(2 * 3600 + 22 * 60 + 33); // 2h 22m 33s in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  function formatTime(secs: number) {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${h}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}s`;
  }

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    document.querySelectorAll('.scroll-animation').forEach((element) => {
      observerRef.current?.observe(element);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // Sticky CTA logic
  useEffect(() => {
    const jakeSection = document.getElementById('jake-research-section');
    if (!jakeSection) return;

    const stickyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setShowStickyCTA(true);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px'
    });

    stickyObserver.observe(jakeSection);

    return () => stickyObserver.disconnect();
  }, []);

  useEffect(() => {
    const loadTally = () => {
      const existingScript = document.querySelector('script[src="https://tally.so/widgets/embed.js"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = "https://tally.so/widgets/embed.js";
        script.async = true;
        script.onload = () => {
          // @ts-ignore
          if (window.Tally) {
            // @ts-ignore
            window.Tally.loadEmbeds();
          }
        };
        document.body.appendChild(script);
      }
    };

    loadTally();
  }, []);

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-50 to-white">
        <div className="max-w-6xl w-full mx-auto px-2 md:px-4 pt-0 md:pt-0 pb-6 md:pb-16">
          {/* Main Content */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 max-w-xl w-full">
              {/* Headline */}
              <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-gray-900">
                How I keep My Home <span className="text-blue-600 font-extrabold">Smelling Fresh</span> to <span className="text-blue-500 italic">Whilst Smoking 20 Cigarettes a Day</span>
              </h1>
              
              {/* Image on Mobile */}
              <div className="md:hidden w-full flex justify-center mb-6">
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                  <Image 
                    src="/OG-placeholder.jpg" 
                    alt="Woman holding sc product" 
                    className="w-[340px] h-[420px] object-cover rounded-xl" 
                    width={340} 
                    height={420} 
                  />
                </div>
              </div>

              {/* Subheading */}
              <div className="flex items-center gap-2 text-blue-600 font-medium mb-2">
                <span className="text-lg">🏠</span>
                The First Device Specifically Created to Eliminate Smoke Smells at the Molecular Level
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-blue-200">
                  <span className="text-2xl mt-1">🔬</span>
                  <div>
                    <div className="font-semibold text-gray-900">Advanced Molecular Technology</div>
                    <div className="text-gray-500 text-sm">Breaks down smoke particles at their source - not just masking the smell.</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-blue-200">
                  <span className="text-2xl mt-1">⚡</span>
                  <div>
                    <div className="font-semibold text-gray-900">Works in 30 minutes</div>
                    <div className="text-gray-500 text-sm">Leave OdorGo running for 30 Minutes and your home will be smell free</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-blue-200">
                  <span className="text-2xl mt-1">💎</span>
                  <div>
                    <div className="font-semibold text-gray-900">Preserves Vehicle Value</div>
                    <div className="text-gray-500 text-sm">Protect your investment by eliminating "smoker's home" depreciation.</div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow p-4 flex items-start gap-3 border border-blue-200">
                  <span className="text-2xl mt-1">♻️</span>
                  <div>
                    <div className="font-semibold text-gray-900">Long-Lasting Results</div>
                    <div className="text-gray-500 text-sm">Continuous protection against new smoke odors.</div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4 text-blue-700 font-semibold text-center">
                Smoke Worry-Free Again<br/>
                <span className="text-blue-500 font-normal">No more embarrassment. No more excuses. Just a fresh, clean home.</span>
              </div>
              <div className="text-xs text-gray-400 mb-4">Backed by molecular odor elimination technology proven effective in homes, apartments, and cars.</div>
              <div className="flex flex-wrap gap-4 text-xs text-gray-500 items-center justify-center md:justify-center mt-2">
                <div className="flex items-center gap-1"><span className="text-lg">🏠</span> Built for Strong Smoke Odors</div>
                <div className="flex items-center gap-1"><span className="text-lg">🔬</span> Driving Freedom Restored</div>
                <div className="flex items-center gap-1"><span className="text-lg">🗝️</span> No Social Judgment</div>
                <div className="flex items-center gap-1"><span className="text-lg">🎯</span> Targets Car Smoke</div>
              </div>
            </div>

            {/* Image on Desktop */}
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="rounded-2xl overflow-hidden shadow-lg bg-white p-2">
                <Image 
                  src="/OG-placeholder.jpg" 
                  alt="Woman holding sc product" 
                  className="w-[340px] h-[420px] object-cover rounded-xl" 
                  width={340} 
                  height={420} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reviews Section */}
      <section className="w-full flex justify-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-2xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Real Car Smokers Share Their OdorGo Results</h2>
          <div className="flex flex-col gap-4 mb-8">
            {/* Review 1 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile1.jpg" alt="David M." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Margaret B. - Retired Teacher</div>
                <div className="text-gray-700 text-sm">"I smoke a pack and a half daily and was devastated when my daughter said the grandkids couldn't sleep over anymore. 2 weeks with OdorGo and my grandson asked if I got new furniture because everything 'smells so nice.' Family sleepovers are back."</div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile2.jpg" alt="Lisa K." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Lisa S. -  Home Owner</div>
                <div className="text-gray-700 text-sm">"Smoked indoors for 40 years. Tried $800 worth of air purifiers, professional cleaning, even had new ventilation installed. Nothing worked. OdorGo eliminated decades of smoke smell in 30 minutes. Wish I'd found this years ago."</div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile3.jpg" alt="Tom A." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Linda M. - Retired Nurse</div>
                <div className="text-gray-700 text-sm">""My best friend stopped visiting because she said the smoke smell gave her headaches. I wasn't ready to quit, but I was losing everyone I cared about. Now she comes over twice a week and has no idea I still smoke inside daily."</div>
              </div>
            </div>
            {/* Review 4 */}
            <div className="flex gap-3 bg-gray-50 rounded-2xl shadow p-2 md:p-4 items-start">
              <Image src="/profile4.jpg" alt="Marcus R." className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="font-semibold text-gray-800">Frank T. - Retiree</div>
                <div className="text-gray-700 text-sm">Arthritis makes going outside painful, especially in winter. My neighbors were complaining about smoke smell seeping into their unit. OdorGo solved the problem completely - I can smoke comfortably inside without affecting anyone else."</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a 
              href="https://newsrelease.odorgo.store/new-checkout-1695176203-1702051815-1702053141-1706890883"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition"
            >
              Get Your OdorGo Today
            </a>
          </div>
        </div>
      </section>
      {/* Jake's Story Introduction */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6">Meet Emily — A Homeowner Who Thought She'd Lost Everyone She Loved</h2>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="prose prose-lg text-gray-700">
                <p className="mb-4">
                Emily had been smoking in her own home for over 30 years. After her husband passed, those quiet moments with a cigarette in her kitchen became even more sacred — her way of coping, her routine, her comfort in the space they'd built together. 
                  </p>
                <p className="mb-4">
                  But what started as her sanctuary had become her prison.
                </p>
                <p className="mb-4">
                The smell wasn't just in the air anymore — it had soaked into every surface of her home. The walls, the furniture, even her clothes carried that telltale odor that marked her as "one of those smokers." 
                  </p>
                <p className="mb-4">
                Her daughter would make excuses to cut visits short. Her 4-year-old grandson asked "What's that smell, grandma?" while covering his little nose. Her best friend, after years of loyalty, finally admitted the smoke smell was too much and stopped coming over. 
                  </p>
                <p className="mb-4">
                The breaking point came on a Tuesday afternoon. Emily had spent hours preparing for her grandson's birthday party — baked his favorite cake, decorated the living room, bought presents. The moment he walked through the door, his face scrunched up in disgust.
                </p>
                <p className="mb-4">
                "Mommy, it stinks in here," he said loudly, making Emily's daughter shoot her that look. The party lasted twenty minutes before they made excuses to leave.
                </p>
                <p className="mb-4">
                That evening, her daughter called with an ultimatum: "Mom, we love you, but we can't keep bringing the kids over. The smoke smell is too strong. You need to figure this out."
                </p>
                <p className="mb-4">
                "I felt like I was losing my family because of something I'd been doing in my own home for decades. But I wasn't ready to give up the one thing that brought me comfort."
                </p>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                  <Image src="/jake-intro.jpg" alt="Jake in his truck" className="object-cover" width={400} height={300} />
                </div>
                <div className="mt-4 text-center text-gray-600 italic text-sm">
                  "Every time someone got in my truck, I could see it in their face. The judgment. The discomfort. It was killing me inside."
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Jake's Discovery Section */}
      <section className="w-full flex flex-col items-center bg-blue-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">Emily's Last Resort: The Discovery That Changed Everything</h2>
          
          {/* Initial Situation */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="flex-1">
              <div className="text-gray-700 mb-6">
              Emily was devastated. Her daughter's words were still echoing in her head, and the image of her grandson covering his nose had broken something inside her. She'd tried quitting before — patches, gum, even hypnosis. Nothing stuck.
              </div>
              <div className="text-gray-700 mb-6">
              But this was her home. The place she'd raised her family. Where she'd grieved her husband. Where she should feel comfortable and free. Giving up smoking felt like losing the last piece of herself.
              </div>
              <div className="text-gray-700">
              That's when her neighbor Helen mentioned something during their weekly chat over the fence.
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                <Image src="/Solutions.jpg" alt="Jake at breaking point" className="object-cover w-full h-full" width={400} height={300} />
              </div>
            </div>
          </div>

          {/* The Ride */}
          <div className="bg-white rounded-2xl p-6 mb-12">
            <h3 className="text-xl font-bold text-blue-800 mb-4">The Conversation That Changed Her Perspective</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-4">
                Emily was telling Helen about the family situation when Helen interrupted her.
                </div>
                <div className="text-gray-700 mb-4">
                "Wait, you mean they can still smell it? Even when you're not smoking?"
                </div>
                <div className="italic text-blue-600 mb-4">Emily was confused. "What do you mean? Of course they can smell it. I smoke inside."</div>
                <div className="text-gray-700">
                Helen laughed. "Honey, I smoke inside too. Have for twenty years. But nobody knows unless they see me doing it."
                </div>
                <div className="text-gray-700 mb-4">
                Emily stared at her neighbor. Helen's house was right next to hers, and Emily had never smelled anything. "How is that possible?"
                </div>
                <div className="text-gray-700 mb-4">
                "Found this thing online. It's called OdorGo. My brother was selling his house and mentioned he used this device to eliminate smoke smell completely before putting it on the market. Not cover it up — actually eliminate it."
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                  <Image src="/smokeincar.jpg" alt="Clean truck interior" className="object-cover w-full h-full" width={400} height={300} />
                </div>
              </div>
            </div>
          </div>

          {/* Research Section */}
          <div className="mb-12" id="jake-research-section">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Jake Went Down a Research Rabbit Hole. Maybe this is what he has been looking for?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl p-5 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎥</span>
                  <div>
                    <div className="font-bold text-blue-700 mb-2">Home Cleaning Forums
                    </div>
                    <div className="text-gray-700">Longtime smokers casually mentioning OdorGo as their "home transformation secret"</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💬</span>
                  <div>
                    <div className="font-bold text-blue-700 mb-2">Facebook Groups</div>
                    <div className="text-gray-700">"Indoor Smokers Unite" - members posting before/after stories with OdorGo</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <div className="font-bold text-blue-700 mb-2">Online Reviews</div>
                    <div className="text-gray-700">Grandparents sharing stories about getting their families back</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="font-bold text-blue-700 mb-2">YouTube Testimonials</div>
                    <div className="text-gray-700">Real homeowners showing rooms before and after OdorGo treatment</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Quotes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="text-gray-700 italic mb-2">"My home health nurse refused to come inside because of smoke smell. At 73 with mobility issues, I needed those visits but wasn't giving up smoking. OdorGo solved everything - she now compliments how fresh my house smells."
                </div>
                <div className="text-blue-600 font-medium">-  Senior Review</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <div className="text-gray-700 italic mb-2">"I'm a grandmother who wasn't ready to quit smoking, but my family stopped visiting because of the smell. This thing gave me my grandchildren back. They sleep over every weekend now and have no idea I still smoke daily."</div>
                <div className="text-blue-600 font-medium">- Grandparent Review</div>
              </div>
            </div>
          </div>

          {/* Price Section */}
          <div className="bg-white rounded-2xl p-6 mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">The Price That Didn't Make Sense</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-4">
                The more Emily researched, the more confused she became. Professional odor removal services cost $600-800. Home cleaning companies charged $400+ for "smoke odor elimination" that barely lasted a week.
                </div>
                <div className="text-2xl font-bold text-blue-600 mb-4">But OdorGo was under $50.</div>
                <div className="text-gray-700">
                Then it clicked. Cleaning services WANTED repeat customers. Air freshener companies NEEDED ongoing purchases. Home sellers and landlords were the only ones with incentive to actually solve the problem permanently — and they were keeping it quiet.
                </div>
                <div className="text-gray-700">
                One homeowner's comment sealed it:
"I've used this before selling three smoker's houses. Saved $30K+ in property value each time. Don't tell everyone about this — it's my secret weapon."
                </div>
              
              </div>
              <div className="flex-1">
                <div className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                  <div className="text-gray-700 italic mb-2">"Shh... don't tell everyone about this. I've made $50K this year just buying smoker's cars and fixing them with this thing. My secret weapon."</div>
                  <div className="text-blue-600 font-medium">- Professional Car Flipper</div>
                </div>
              </div>
            </div>
          </div>

          {/* Skepticism Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-900 mb-6">The Skepticism That Almost Stopped Her</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-6">
                Emily stared at her laptop screen at 11 PM, credit card in hand, fighting every instinct.
                  "Another gimmick," she thought. "Another waste of money."
                </div>
                <div className="bg-red-50 rounded-xl p-5 border border-red-200">
                  <div className="font-bold text-red-700 mb-4">She'd been burned before:</div>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span className="text-gray-700">The $89 "professional grade" air purifier that did nothing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span className="text-gray-700">The $40 "odor eliminating" spray that made it worse</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span className="text-gray-700">The $400 professional cleaning that lasted one week</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-500">✕</span>
                      <span className="text-gray-700">The $800 ventilation system upgrade that barely made a dent</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                  <Image src="/Solutions.jpg" alt="Late night research" className="object-cover w-full h-full" width={400} height={300} />
                </div>
              </div>
            </div>
          </div>

          {/* Final Decision */}
          <div className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">The Order That Changed Her Life</h3>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="text-gray-700 mb-4">
                Emily bought two units. "If it works, I want one for upstairs and downstairs. If it doesn't work, I'm only out $100 instead of another $400 cleaning service."
                </div>
                <div className="text-gray-700 mb-4">
                The price point made it a no-brainer risk. Less than one professional cleaning session. Less than three months of premium candles and air fresheners. Less than what she'd already wasted on failed solutions.
                </div>
                <div className="text-gray-700 mb-6">
                  Three days later, her package arrived.
                </div>
                <div className="text-gray-700 mb-4">
                Emily sat in her kitchen, holding the small device, still skeptical. It looked too simple. Too small. Too inexpensive to solve a problem that had cost her thousands and nearly destroyed her family relationships.
                </div>
                <div className="italic text-gray-700 mb-6">"This better not be another disappointment," she whispered, plugging it in to charge.</div>
                <div className="text-xl font-bold text-blue-800">Thirty minutes later, Emily's life was completely different.</div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative w-full max-w-sm aspect-[4/3] bg-gray-100 rounded-xl overflow-hidden">
                  <Image src="/package-arrival.jpg" alt="OdorGo package arrival" className="object-cover w-full h-full" width={400} height={300} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* The Underground Solution Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">The Unknown Device Cleaning Companies Don't Want You to Know</h2>
          <div className="text-center text-gray-700 mb-8">The homeowners and real estate agents Emily discovered weren't using expensive cleaning services or industrial equipment. They were using OdorGo — a compact ozone generator that destroys smoke particles at the molecular level.</div>
          
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-4">How OdorGo Actually Works:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">🔬</span>
                <div>
                  <div className="font-bold text-blue-700 mb-1">Ozone Generation</div>
                  <div className="text-gray-700">Creates O₃ molecules that seek out contaminants</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">⚛️</span>
                <div>
                  <div className="font-bold text-blue-700 mb-1">Molecular Destruction</div>
                  <div className="text-gray-700">Breaks down smoke particles through oxidation</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">🎯</span>
                <div>
                  <div className="font-bold text-blue-700 mb-1">Complete Elimination</div>
                  <div className="text-gray-700">Particles are destroyed, not masked or moved</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl mt-1">♻️</span>
                <div>
                  <div className="font-bold text-blue-700 mb-1">Natural Breakdown</div>
                  <div className="text-gray-700">Ozone converts back to regular oxygen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jake's Transformation Section */}
      <section className="w-full flex flex-col items-center bg-blue-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">Emily's Transformation: From Isolation to Family Reunion</h2>
          <div className="text-center text-gray-700 mb-8">
          Emily ordered two OdorGo units that night. When they arrived, she followed the simple instructions: charge the device, set it in her living room, run it for 30 minutes while stepping outside.
          </div>
          <div className="bg-white rounded-2xl p-6 mb-8">
            <div className="text-xl text-blue-800 font-bold mb-4">The results were immediate.</div>
            <div className="text-gray-700 mb-6">
            Not "fresher" — completely odor-free. For the first time in years, Emily walked back into her home and smelled... nothing. Clean air. No smoke. No artificial fragrances masking anything. Just clean.
            </div>
            <div className="flex justify-center">
              <a
                href="https://newsrelease.odorgo.store/new-checkout-1695176203-1702051815-1702053141-1706890883"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-12 rounded-full text-xl transition shadow-lg"
              >
                Get Your OdorGo Now
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="font-bold text-blue-700 mb-2">Week 1: The Phone Call</div>
              <div className="text-gray-700">That Friday, Emily called her daughter without anxiety for the first time in months. "Why don't you bring the kids over this weekend?" No hesitation. No worry about judgment. When they arrived, her grandson ran straight to her for a hug — no covering his nose, no complaints.</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="font-bold text-blue-700 mb-2">Week 2: The Best Friend Returns</div>
              <div className="text-gray-700">Helen came over for coffee and stayed for three hours — the longest visit in over a year. She had no idea Emily had been smoking daily in that very room. Their weekly coffee dates resumed like nothing had changed.</div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="font-bold text-blue-700 mb-2">Week 3: The Ultimate Test</div>
              <div className="text-gray-700">Emily volunteered to host her grandson's sleepover birthday party. Eight kids, overnight, in her home. Not one parent comment about smell. Not one child complaint. Just normal family life returned.</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-4">The emotional impact was profound:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">No more isolation in her own home</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Family gatherings restored</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Grandchildren sleeping over again</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500 text-xl">✓</span>
                <span className="text-gray-700">Friends visiting without excuses</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Shame Spiral Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">The Isolation Spiral That Every Home Smoker Knows</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">👨‍👩‍👧‍👦</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Family Rejection</div>
                <div className="text-gray-700 text-sm">
                  • Grandchildren covering their noses and asking "what's that smell?"<br/>
                  • Adult children making excuses to cut visits short<br/>
                  • Holiday gatherings moved to other family members' homes
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🏠</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Social Exile</div>
                <div className="text-gray-700 text-sm">
                  • Friends declining invitations or leaving early<br/>
                  • Unable to host parties, dinners, or get-togethers<br/>
                  • Becoming the family member whose house everyone avoids
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">😔</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Personal Shame</div>
                <div className="text-gray-700 text-sm">
                  • Feeling judged and unwelcome in your own home<br/>
                  • Making elaborate excuses for why people can't visit<br/>
                  • The constant underlying guilt of being "that smoker"
                </div>
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">💰</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Financial Waste</div>
                <div className="text-gray-700 text-sm">
                  • $400+ cleaning services that lasted one week<br/>
                  • Endless candles and air fresheners that just added scent on top<br/>
                  • Running multiple air purifiers 24/7, tripling electricity bills
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Root Causes Section */}
      <section className="w-full flex flex-col items-center bg-white py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Here's what actually happens when you smoke in your car</h2>
          <p className="text-center text-blue-700 font-medium mb-8">And why it lingers even after expensive sprays <span className="italic">cause…</span></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🧲</span>
              <div>
                <div className="font-bold text-blue-700 mb-1">Molecular Bonding</div>
                <div className="text-gray-700 text-sm">Smoke particles chemically attach to car surfaces at the molecular level — air fresheners just layer more smell on top of embedded odor.</div>
              </div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🏠</span>
              <div>
                <div className="font-bold text-indigo-700 mb-1">Enclosed Saturation</div>
                <div className="text-gray-700 text-sm">Unlike outdoor smoking, car interiors trap and concentrate smoke with no escape route, creating permanent odor absorption in every surface.</div>
              </div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">♨️</span>
              <div>
                <div className="font-bold text-orange-700 mb-1">Heat Reactivation</div>
                <div className="text-gray-700 text-sm">Daily sun exposure turns your car into an oven, "cooking" trapped smoke molecules back into the air — explaining why the smell returns after cleaning.</div>
              </div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-3 md:p-5 flex items-start gap-3">
              <span className="text-2xl mt-1">🌪️</span>
              <div>
                <div className="font-bold text-purple-700 mb-1">Ventilation Circulation</div>
                <div className="text-gray-700 text-sm">Your car's AC system becomes a smoke distribution network, pulling odor from vents and spreading it to every surface, recontaminating constantly.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="w-full flex flex-col items-center bg-blue-50 py-4 md:py-16 px-2 md:px-4">
        <div className="max-w-4xl w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2">Your Home Can Smell Fresh Again — Starting Today</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="text-lg font-bold text-red-700 mb-3">No More:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Expensive cleaning services that don't last</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Embarrassing moments when family visits</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Friends making excuses to leave early</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Grandchildren covering their noses</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-red-500">❌</span>
                  <span className="text-gray-700">Hosting gatherings at other people's homes</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 shadow">
              <h3 className="text-lg font-bold text-green-700 mb-3">Instead, Experience:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Immediate, permanent odor elimination</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Family visits without anxiety or judgment</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Friends staying for hours like they used to</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Grandchildren running to hug you again</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-700">Pride in your home as a welcoming space</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-8 text-center">
            <h3 className="text-xl font-bold text-blue-800 mb-4">OdorGo works in any home:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">🏠</span>
                <span className="text-gray-700">Houses & Apartments</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">🏢</span>
                <span className="text-gray-700">Condos & Townhomes</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">🏘️</span>
                <span className="text-gray-700">Rental Properties</span>
              </div>
              <div className="flex items-center gap-2 justify-center">
                <span className="text-blue-500">🚗</span>
                <span className="text-gray-700">Cars and Vehicles</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 text-white rounded-2xl p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-2">90-Day Risk-Free Guarantee</h3>
              <p>Try OdorGo in your vehicle for 90 days. If it doesn't completely eliminate smoke odor — if you're not smoking with total confidence — return it for a full refund.</p>
            </div>
            <div className="text-center text-lg font-medium">
              You have nothing to lose except the shame, embarrassment, and isolation.
            </div>
          </div> 

          <div className="text-center">
            <blockquote className="italic text-gray-700 text-lg mb-8">
            "I spent years losing my family because of the smell in my own home. Thousands on solutions that didn't work. If you smoke inside, this is the only thing that actually solves the problem while letting you keep your routine. I wish I'd found it years ago."
              <footer className="text-blue-700 font-medium mt-2">- Emily's advice to other home smokers</footer>
            </blockquote>
            
            <a 
              href="https://newsrelease.odorgo.store/new-checkout-1695176203-1702051815-1702053141-1706890883"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 md:px-12 rounded-full text-lg md:text-xl transition w-full md:w-auto inline-block"
            >
              <span className="block md:hidden">Get Your OdorGo Now</span>
              <span className="hidden md:block">Order OdorGo Today and Get Your Freedom Back</span>
            </a>
          </div>
        </div>
      </section>

      {/* Move BuyBox here */}
      <BuyBox />

      {/* Sticky CTA */}
      {showStickyCTA && (
        <div className="fixed bottom-0 left-0 right-0 bg-blue-600 shadow-lg z-50 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="text-white font-medium">
              Ready to eliminate smoke odors from your home?
            </div>
            <a
              href="https://newsrelease.odorgo.store/new-checkout-1695176203-1702051815-1702053141-1706890883"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-2 px-6 rounded-full transition shadow-lg"
            >
              Get OdorGo Now
            </a>
          </div>
        </div>
      )}
    </div>
  )
}