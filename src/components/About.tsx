import { Calendar, MapPin } from 'lucide-react';

interface EducationCard {
  institution: string;
  degree: string;
  date: string;
  location: string;
  description: string;
}

interface ExperienceCard {
  company: string;
  position: string;
  date: string;
  location: string;
  type: 'On-site' | 'Remote' | 'Hybrid';
  description: string;
}

interface AboutProps {
  translations: any;
  isRTL: boolean;
}

const educationData: EducationCard[] = [
  {
    institution: 'The British University in Egypt',
    degree: 'BSc in Computer Science',
    date: '2020 – 2024',
    location: 'Cairo, Egypt',
    description: 'Focused on AI & ML coursework. Led the graduation project on real-time recommendation systems.',
  },
];

const experienceData: ExperienceCard[] = [
  {
    company: 'NTI',
    position: 'AI Instructor',
    date: '2025 – Present',
    location: 'Cairo, Egypt',
    type: 'On-site',
    description: 'Delivered hands-on AI training programs. Developed curriculum covering ML fundamentals to deployment.',
  },
  {
    company: 'EYouth',
    position: 'AI Instructor',
    date: '2026 – Present',
    location: 'Remote',
    type: 'Remote',
    description: 'Conducted virtual AI workshops for 200+ participants. Mentored junior developers on NLP projects.',
  },
];

const typeBadgeColor = (type: string) => {
  if (type === 'Remote') return 'bg-[#1fea00]';
  if (type === 'Hybrid') return 'bg-[#27a102]';
  return 'bg-[#1fea00]';
};

const About = ({ isRTL }: AboutProps) => {
  return (
    <section
      id="about"
      className="py-12 bg-[#001a03]"
      style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1000px] mx-auto px-6">
        <h2
          id="about-heading"
          className="text-3xl md:text-4xl font-bold text-white text-center mb-8"
        >
          About Me
        </h2>

        <p className="text-white/80 text-base leading-relaxed text-center max-w-2xl mx-auto mb-12">
          I am a Junior AI Engineer passionate about building intelligent systems that turn raw data
          into decisive action. With a solid foundation in computer science and hands-on experience
          in machine learning, I focus on creating practical AI solutions that make a real impact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Education column */}
          <div>
            <h3 className="text-[#1fea00] font-bold text-lg mb-4 flex items-center gap-3">
              Education
              <span className="flex-1 h-px bg-[#1c6000]/50" />
            </h3>
            <div className="flex flex-col gap-4">
              {educationData.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#000a01]/60 border border-[#1c6000]/40 rounded-xl p-5 hover:border-[#27a102]/60 transition-all duration-300"
                >
                  <p className="text-white font-bold text-sm mb-1">{item.institution}</p>
                  <p className="text-[#1fea00] text-sm font-medium mb-3">{item.degree}</p>
                  <div className="flex flex-wrap items-center gap-4 text-white/60 text-xs mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Experience column */}
          <div>
            <h3 className="text-[#1fea00] font-bold text-lg mb-4 flex items-center gap-3">
              Experience
              <span className="flex-1 h-px bg-[#1c6000]/50" />
            </h3>
            <div className="flex flex-col gap-4">
              {experienceData.map((item, i) => (
                <div
                  key={i}
                  className="bg-[#000a01]/60 border border-[#1c6000]/40 rounded-xl p-5 hover:border-[#27a102]/60 transition-all duration-300"
                >
                  <p className="text-white font-bold text-sm mb-1">{item.company}</p>
                  <p className="text-[#1fea00] text-sm font-medium mb-3">{item.position}</p>
                  <div className="flex flex-wrap items-center gap-3 text-white/60 text-xs mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-semibold text-black ${typeBadgeColor(item.type)}`}
                    >
                      {item.type}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
