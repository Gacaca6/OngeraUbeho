import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Team from './components/Team';
import Bento from './components/Bento';
import CountUp from './components/CountUp';
import Comparison from './components/Comparison';
import Table from './components/Table';
import Timeline from './components/Timeline';
import BrowserFrame from './components/BrowserFrame';

/* ── Ongera Ubeho — Resolution Project Social Venture Challenge 2026 ──
   12 slides · 5 minutes · ~25 seconds each. Speaker notes on every slide
   (press P for presenter mode).                                        */

const card: React.CSSProperties = {
  padding: 'clamp(14px,2vw,22px)',
  borderRadius: 'var(--radius)',
  background: 'var(--surface)',
  border: '1px solid var(--hair)',
};

const chip: React.CSSProperties = {
  padding: '8px 14px',
  borderRadius: 999,
  background: 'var(--surface)',
  border: '1px solid var(--hair)',
  fontSize: 'clamp(12px,1.4vw,15px)',
  fontWeight: 600,
  whiteSpace: 'nowrap',
};

const arrow: React.CSSProperties = {
  color: 'var(--fg-faint)',
  fontSize: 'clamp(12px,1.4vw,15px)',
  fontWeight: 700,
};

const Flow = ({ items, tint }: { items: string[]; tint?: string }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    }}
  >
    {items.map((it, i) => (
      <span key={it} style={{ display: 'contents' }}>
        <span
          style={{
            ...chip,
            ...(tint
              ? { borderColor: `color-mix(in srgb, ${tint} 45%, transparent)` }
              : {}),
          }}
        >
          {it}
        </span>
        {i < items.length - 1 && <span style={arrow}>→</span>}
      </span>
    ))}
  </div>
);

export default function App() {
  return (
    <Deck>
      {/* 1 ── COVER */}
      <Slide
        full
        nav="Cover"
        notes="Muraho — good morning. I'm Macrine, with my co-founders Serge and Henriette, from the University of Rwanda. Ongera Ubeho means 'Live More — Choose Life' in Kinyarwanda. It is a community-based youth and family mentorship hub, and today we'd like to show you why Rwanda needs it now. (~25s)"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(105deg, rgba(18,38,25,0.92) 15%, rgba(18,38,25,0.45) 70%, rgba(18,38,25,0.6)), url(/img/hero.jpg) center 35% / cover no-repeat`,
          }}
        />
        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'var(--gutter-y) var(--gutter)',
          }}
        >
          <Reveal>
            <img
              src="/img/logo-mark.png"
              alt=""
              style={{ height: 72, marginBottom: 'clamp(16px,3vh,28px)' }}
            />
            <div
              className="kicker"
              style={{ color: '#cf9040', marginBottom: 14 }}
            >
              Resolution Project · Social Venture Challenge · July 2026
            </div>
            <h1
              className="display"
              style={{
                color: '#f7f5f0',
                fontSize: 'clamp(52px,9vw,116px)',
                margin: 0,
                lineHeight: 1.02,
              }}
            >
              Ongera <span style={{ color: '#cf9040' }}>Ubeho</span>
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-head)',
                fontSize: 'clamp(19px,2.6vw,28px)',
                color: 'rgba(243,240,232,0.95)',
                margin: 'clamp(14px,2.5vh,22px) 0 0',
                maxWidth: 640,
              }}
            >
              Reconnecting youth. Healing families. Rebuilding futures.
            </p>
            <p
              style={{
                fontSize: 'clamp(12.5px,1.5vw,15px)',
                color: 'rgba(243,240,232,0.75)',
                marginTop: 'clamp(18px,4vh,34px)',
              }}
            >
              “Live More · Choose Life” — Kinyarwanda · University of Rwanda ·
              Mastercard Foundation Scholars · Kigali, Rwanda
            </p>
          </Reveal>
        </div>
      </Slide>

      {/* 2 ── FOUNDER STORY */}
      <Slide
        nav="Our story"
        notes="We grew up watching classmates and neighbours disappear — into drugs, into gambling, onto the streets. Not because nobody loved them, but because their families had nowhere to turn. We are engineers, but this is personal: our own communities held us when we struggled. Ongera Ubeho is us turning to hold others. (~30s)"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%),1fr))',
            gap: 'clamp(24px,4vw,56px)',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div>
            <Reveal>
              <div className="kicker" style={{ marginBottom: 12 }}>
                Why this matters to us
              </div>
              <h2 className="headline" style={{ marginBottom: 18 }}>
                We watched it happen to{' '}
                <span className="accent-text">people we love.</span>
              </h2>
            </Reveal>
            {[
              [
                'Our story',
                'Three engineering students from the University of Rwanda, raised in the same communities we now serve.',
              ],
              [
                'What we saw',
                'Brilliant friends lost to substance abuse, gambling, and street life — while their parents searched for help that did not exist.',
              ],
              [
                'What we chose to do',
                'Build the support system our neighbourhoods never had — community mentors, in Kinyarwanda, reachable from any phone.',
              ],
            ].map(([t, b], i) => (
              <Build at={i + 1} key={t}>
                <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
                  <div
                    className="kicker accent-text"
                    style={{ minWidth: 24, paddingTop: 3 }}
                  >
                    0{i + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 2 }}>{t}</div>
                    <p
                      style={{
                        margin: 0,
                        color: 'var(--fg-muted)',
                        fontSize: 'clamp(14px,1.6vw,16px)',
                        lineHeight: 1.55,
                      }}
                    >
                      {b}
                    </p>
                  </div>
                </div>
              </Build>
            ))}
            <Build at={4}>
              <p
                style={{
                  margin: '18px 0 0',
                  fontFamily: 'var(--font-head)',
                  fontStyle: 'italic',
                  fontSize: 'clamp(16px,2vw,19px)',
                  color: 'var(--primary)',
                }}
              >
                “Our communities held us. Now it is our turn to hold others.”
              </p>
            </Build>
          </div>
          <Reveal>
            <img
              src="/img/community-joy.jpg"
              alt="Young Rwandan women laughing together in their community"
              style={{
                width: '100%',
                aspectRatio: '4/3.4',
                objectFit: 'cover',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow)',
              }}
            />
          </Reveal>
        </div>
      </Slide>

      {/* 3 ── TEAM */}
      <Team
        nav="Team"
        notes="We are youth-created and youth-led — and we bring complementary strengths. Macrine leads strategy and community partnerships and serves as Secretary of the SANGA INSHUTI Initiative. Serge is our full-stack engineer building the USSD and WhatsApp platform. Henriette leads operations and is a member of Solid Minds, Rwanda's mental-health community. A women-led team, all Mastercard Foundation Scholars at UR. (~25s)"
        kicker="Youth-created · Youth-led · Women-led"
        title="Founders from the communities we serve."
        people={[
          {
            name: 'Abikunda Macrine',
            role: 'Founder & Project Lead · Electrical Engineering, UR · Secretary, SANGA INSHUTI Initiative',
          },
          {
            name: 'Dusingizeyezu Serge',
            role: 'Co-founder & CTO · Electrical Engineering, UR · Full-stack software engineer',
          },
          {
            name: 'Giramahoro Henriette Marie',
            role: 'Co-founder & COO · Electrical Engineering, UR · Member, Solid Minds',
          },
        ]}
      />

      {/* 4 ── THE PROBLEM */}
      <Slide
        nav="The problem"
        notes="The scale: more than seven thousand children live on Kigali's streets. Over six thousand young people are in addiction treatment centres. 776 students dropped out of school because of drugs. And it follows a pattern — family conflict, isolation, substance abuse, dropout, street life. Parents see the warning signs early. They simply have nowhere affordable or culturally relevant to turn. (~35s)"
      >
        <Reveal>
          <div className="kicker" style={{ textAlign: 'center', marginBottom: 12 }}>
            The problem
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(20px,3.5vh,34px)',
            }}
          >
            Too many young lives are lost{' '}
            <span className="accent-text">before adulthood.</span>
          </h2>
        </Reveal>
        <Reveal>
          <div className="cols" style={{ marginBottom: 'clamp(18px,3vh,28px)' }}>
            {[
              ['7,000+', 'children living on the streets of Kigali'],
              ['6,200+', 'youth in addiction treatment centres'],
              ['776', 'students dropped out of school due to drugs'],
            ].map(([v, l]) => (
              <div key={l} style={{ ...card, textAlign: 'center' }}>
                <div
                  className="figure accent-text"
                  style={{ fontSize: 'clamp(34px,5vw,54px)', fontWeight: 700 }}
                >
                  {v}
                </div>
                <div
                  style={{
                    color: 'var(--fg-muted)',
                    fontSize: 'clamp(13px,1.5vw,15px)',
                    marginTop: 6,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Build at={1}>
          <Flow
            items={[
              'Family conflict',
              'Isolation',
              'Substance abuse',
              'School dropout',
              'Street life',
              'Lost potential',
            ]}
          />
        </Build>
        <Build at={2}>
          <p
            className="lead"
            style={{
              textAlign: 'center',
              maxWidth: 680,
              marginInline: 'auto',
              marginTop: 'clamp(18px,3vh,26px)',
              fontWeight: 600,
            }}
          >
            Parents recognise the warning signs — but have nowhere affordable,
            accessible, or culturally relevant to turn.
          </p>
        </Build>
        <div
          className="foot"
          style={{ textAlign: 'center', marginTop: 14, opacity: 0.75 }}
        >
          Sources: national rehabilitation-centre and street-children figures —
          [Rwanda Biomedical Centre / NRS · NISR · MINEDUC reports]
        </div>
      </Slide>

      {/* 5 ── WHY EXISTING SYSTEMS FAIL */}
      <Slide
        nav="The gap"
        notes="Why hasn't this been solved? Professional counselling costs more than twenty thousand francs and lives in urban clinics — most families cannot reach it. Everything on offer is reactive, English-speaking, smartphone-dependent, one-off. We flip every one of those: community mentors at two to five thousand francs a month, preventive, in Kinyarwanda, on any basic phone, long-term. (~30s)"
      >
        <Reveal>
          <div className="kicker" style={{ textAlign: 'center', marginBottom: 12 }}>
            Why existing systems fail
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,38px)',
            }}
          >
            Help exists — just not for{' '}
            <span className="accent-text">these families.</span>
          </h2>
        </Reveal>
        <Reveal>
          <div style={{ maxWidth: 860, marginInline: 'auto' }}>
            <Comparison
              cols={['', 'Ongera Ubeho', 'The status quo']}
              highlight={0}
              rows={[
                {
                  label: 'Cost to a family',
                  values: ['2,000–5,000 RWF/mo · subsidised', '20,000+ RWF, out of reach'],
                },
                {
                  label: 'Where it lives',
                  values: ['Inside the community', 'Urban clinics only'],
                },
                {
                  label: 'When it acts',
                  values: ['Preventive — before crisis', 'Reactive — after crisis'],
                },
                {
                  label: 'Technology needed',
                  values: ['Any phone — USSD / SMS', 'Smartphone + data'],
                },
                {
                  label: 'Language & culture',
                  values: ['Kinyarwanda community mentors', 'Clinical, often English'],
                },
                {
                  label: 'The relationship',
                  values: ['Long-term mentorship', 'One-off sessions'],
                },
              ]}
            />
          </div>
        </Reveal>
      </Slide>

      {/* 6 ── THE SOLUTION */}
      <Slide
        nav="Solution"
        notes="Ongera Ubeho is one hub with two connected tracks. Track one — prevention: a parent dials a USSD code or messages WhatsApp from any phone, describes the problem, and is matched with a trained, paid, Kinyarwanda-speaking mentor from their own community. Track two — rehabilitation: weekly street outreach builds trust, brings youth into a safe space, and walks them home — life skills, psychosocial support, family reintegration. Technology supports people. It never replaces them. (~35s)"
      >
        <Reveal>
          <div className="kicker" style={{ textAlign: 'center', marginBottom: 12 }}>
            Our solution
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(22px,4vh,36px)',
            }}
          >
            One hub. <span className="accent-text">Two connected tracks.</span>
          </h2>
        </Reveal>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px,100%),1fr))',
            gap: 'clamp(14px,2vw,22px)',
            maxWidth: 980,
            marginInline: 'auto',
            width: '100%',
          }}
        >
          <Build at={1}>
            <div style={{ ...card, height: '100%' }}>
              <div className="kicker" style={{ color: 'var(--primary)', marginBottom: 10 }}>
                Track 1 · Prevention — Family mentorship
              </div>
              <Flow
                tint="#2c5a3e"
                items={['Parent, any phone', 'USSD / WhatsApp', 'Matched mentor', 'Ongoing mentorship']}
              />
            </div>
          </Build>
          <Build at={2}>
            <div style={{ ...card, height: '100%' }}>
              <div className="kicker" style={{ color: '#b0522f', marginBottom: 10 }}>
                Track 2 · Rehabilitation — Street youth
              </div>
              <Flow
                tint="#b0522f"
                items={['Weekly outreach', 'Safe space', 'Life skills + support', 'Family reintegration']}
              />
            </div>
          </Build>
        </div>
        <Build at={3}>
          <div
            style={{
              textAlign: 'center',
              marginTop: 'clamp(16px,2.5vh,24px)',
            }}
          >
            <Flow items={['Both tracks', 'Referral network — schools · shelters · MINISANTE health services']} />
            <p
              className="lead"
              style={{
                marginTop: 'clamp(14px,2.5vh,22px)',
                marginInline: 'auto',
                fontWeight: 700,
              }}
            >
              Technology supports people —{' '}
              <span className="accent-text">it never replaces them.</span>
            </p>
          </div>
        </Build>
      </Slide>

      {/* 7 ── WHO WE SERVE */}
      <Bento
        nav="Who we serve"
        notes="We are specific about who comes first: youth aged 12 to 25 in Kigali facing drugs, gambling, peer pressure, or street homelessness — and the parents and caregivers around them. The six-month pilot is sized precisely: 50 at-home youth, 30 street children, 40 families, 10 trained and paid community mentors — over 130 direct beneficiaries, at least 60% of them young women and girls. (~30s)"
        kicker="Who we serve"
        title="Specific people. Not a statistic."
        tiles={[
          {
            k: 'Primary beneficiaries',
            title: 'Youth aged 12–25, Kigali first',
            body: 'Facing substance abuse, gambling, peer pressure, school disengagement, or street homelessness.',
            c: 5,
            r: 2,
            img: '/img/young-man.jpg',
          },
          {
            k: 'Gender focus',
            fig: <CountUp to={60} suffix="%+" />,
            body: 'of youth beneficiaries will be women & girls.',
            c: 4,
            variant: 'accent',
          },
          {
            k: 'Around them',
            title: 'The safety net',
            body: 'Parents & caregivers · community mentors · local leaders · government & NGO partners.',
            c: 3,
          },
          { k: 'At-home youth', fig: <CountUp to={50} />, body: 'in active mentorship', c: 3 },
          { k: 'Street children', fig: <CountUp to={30} />, body: 'in rehabilitation', c: 2 },
          { k: 'Families', fig: <CountUp to={40} />, body: 'guided & supported', c: 2 },
        ]}
      />

      {/* 8 ── TRACTION & ALLIES */}
      <Slide
        nav="Traction"
        notes="We are not starting from zero. In March, Ongera Ubeho was selected as a winning venture at the HATANA Innovation Bootcamp — the Social Entrepreneurship Fund of the Mastercard Foundation Scholars Program at the University of Rwanda. Our platform is live, with a working partner-enquiry pipeline. And we have allies: the University, the Scholars Program, and through our founders, Solid Minds and SANGA INSHUTI. (~30s)"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%),1fr))',
            gap: 'clamp(24px,4vw,56px)',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div>
            <Reveal>
              <div className="kicker" style={{ marginBottom: 12 }}>
                Traction & allies
              </div>
              <h2 className="headline" style={{ marginBottom: 16 }}>
                Momentum before the{' '}
                <span className="accent-text">first grant dollar.</span>
              </h2>
            </Reveal>
            {[
              [
                'Institutionally validated',
                'Winning venture — HATANA Innovation Bootcamp (SEF 2.0), Mastercard Foundation Scholars Program · University of Rwanda, March 2026.',
              ],
              [
                'Already operational online',
                'Live platform at ongera-ubeho.vercel.app with a working partnership & mentor-application pipeline.',
              ],
              [
                'Allies on our side',
                'University of Rwanda · MCF Scholars Program · Solid Minds & SANGA INSHUTI through our founders · community leaders in Kigali.',
              ],
              [
                'Pathway to government',
                'Model designed for MINISANTE & MIGEPROF integration, aligned with NST2 and Vision 2050.',
              ],
            ].map(([t, b], i) => (
              <Build at={i + 1} key={t}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 13 }}>
                  <span
                    style={{
                      color: 'var(--primary)',
                      fontWeight: 800,
                      lineHeight: 1.45,
                    }}
                  >
                    ✓
                  </span>
                  <div>
                    <span style={{ fontWeight: 700 }}>{t}. </span>
                    <span
                      style={{
                        color: 'var(--fg-muted)',
                        fontSize: 'clamp(13.5px,1.55vw,15.5px)',
                      }}
                    >
                      {b}
                    </span>
                  </div>
                </div>
              </Build>
            ))}
          </div>
          <Reveal>
            <BrowserFrame url="ongera-ubeho.vercel.app">
              <img
                src="/img/site-home.jpg"
                alt="The live Ongera Ubeho platform"
                style={{ width: '100%', display: 'block' }}
              />
            </BrowserFrame>
          </Reveal>
        </div>
      </Slide>

      {/* 9 ── MEASURING IMPACT */}
      <Slide
        nav="Impact"
        notes="Impact is measured, not claimed. Every participant gets a baseline assessment and follow-ups — that is how we will demonstrate an 80% mentorship completion rate, 70% of families reporting improved communication, and a 60% reduction in risky behaviours. We also track every referral into education, vocational training, or government services. Monitoring and evaluation is a paid line in our budget, not an afterthought. (~30s)"
      >
        <Reveal>
          <div className="kicker" style={{ textAlign: 'center', marginBottom: 12 }}>
            Measuring impact
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(18px,3vh,28px)',
            }}
          >
            Measured, <span className="accent-text">not claimed.</span>
          </h2>
        </Reveal>
        <Reveal>
          <div style={{ marginBottom: 'clamp(18px,3vh,28px)' }}>
            <Flow
              items={['Inputs', 'Activities', 'Outputs', 'Outcomes', 'Long-term impact']}
            />
          </div>
        </Reveal>
        <Reveal>
          <div className="cols" style={{ maxWidth: 900, marginInline: 'auto' }}>
            {[
              ['80%', 'mentorship completion rate'],
              ['70%', 'families reporting improved communication'],
              ['60%', 'reduction in risky behaviours'],
            ].map(([v, l]) => (
              <div key={l} style={{ ...card, textAlign: 'center' }}>
                <div
                  className="figure accent-text"
                  style={{ fontSize: 'clamp(34px,5vw,54px)', fontWeight: 700 }}
                >
                  {v}
                </div>
                <div
                  style={{
                    color: 'var(--fg-muted)',
                    fontSize: 'clamp(13px,1.5vw,15px)',
                    marginTop: 6,
                  }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Build at={1}>
          <p
            style={{
              textAlign: 'center',
              maxWidth: 700,
              marginInline: 'auto',
              marginTop: 'clamp(16px,2.5vh,24px)',
              color: 'var(--fg-muted)',
              fontSize: 'clamp(13.5px,1.55vw,15.5px)',
            }}
          >
            Baseline + follow-up assessment for every participant · referrals
            tracked into education, vocational training, and government services
            · M&E independently costed at 6% of budget.
          </p>
        </Build>
      </Slide>

      {/* 10 ── SUSTAINABILITY & GROWTH */}
      <Slide
        nav="Sustainability"
        notes="Resolution funds once — so sustainability is designed in. Families who can pay contribute a sliding-scale fee that subsidises free service for street youth; grants, government partnerships, and corporate CSR complete the mix. The venture outlives its founders: documented mentor curriculum, structured team roles, and a transition plan. Six months to prove it, one year to expand, two years to replicate by district, five to a national model. (~35s)"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px,100%),1fr))',
            gap: 'clamp(24px,4vw,52px)',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div>
            <Reveal>
              <div className="kicker" style={{ marginBottom: 12 }}>
                Sustainability & growth
              </div>
              <h2 className="headline" style={{ marginBottom: 16 }}>
                Built to outlive{' '}
                <span className="accent-text">the seed grant.</span>
              </h2>
            </Reveal>
            <Reveal>
              {[
                ['Grants & donor funding', 35],
                ['Sliding-scale family fees', 30],
                ['Government partnerships — MINISANTE · MIGEPROF', 20],
                ['Corporate CSR sponsorship', 15],
              ].map(([label, pct]) => (
                <div key={label as string} style={{ marginBottom: 11 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 'clamp(12.5px,1.45vw,14.5px)',
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ color: 'var(--primary)' }}>{pct}%</span>
                  </div>
                  <div
                    style={{
                      height: 8,
                      borderRadius: 999,
                      background: 'var(--surface-2)',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        width: `${pct}%`,
                        height: '100%',
                        borderRadius: 999,
                        background: 'var(--accent)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </Reveal>
            <Build at={1}>
              <p
                style={{
                  marginTop: 14,
                  color: 'var(--fg-muted)',
                  fontSize: 'clamp(13.5px,1.55vw,15.5px)',
                }}
              >
                <b style={{ color: 'var(--fg)' }}>
                  Built as an organisation, not a project:
                </b>{' '}
                documented mentor curriculum, structured roles, and a leadership
                transition plan for future team members.
              </p>
            </Build>
          </div>
          <div style={{ maxWidth: 520, width: '100%', marginInline: 'auto' }}>
            <Timeline
              items={[
                {
                  time: '6 months',
                  title: 'Pilot — prove the model',
                  body: '130+ beneficiaries in Kigali; evidence base published.',
                },
                {
                  time: 'Year 1',
                  title: 'Expand & earn',
                  body: 'Family fees begin subsidising free street-youth services.',
                },
                {
                  time: 'Year 2',
                  title: 'District replication',
                  body: 'Mentor training replicated with MINISANTE & MIGEPROF.',
                },
                {
                  time: 'Year 5',
                  title: 'National model',
                  body: 'A blueprint any of Rwanda’s 30 districts can adopt.',
                },
              ]}
            />
          </div>
        </div>
      </Slide>

      {/* 11 ── BUDGET */}
      <Slide
        nav="Budget"
        notes="The ask: five thousand US dollars, one time, fully allocated. Every line buys something you can count — the matching platform, weekly street outreach, a safe space, ten trained and paid mentors, community awareness, lean operations, and independent impact tracking. This is the complete cost of a six-month pilot serving over 130 people. (~30s)"
      >
        <Reveal>
          <div className="kicker" style={{ textAlign: 'center', marginBottom: 12 }}>
            The ask
          </div>
          <h2
            className="headline"
            style={{
              textAlign: 'center',
              marginInline: 'auto',
              marginBottom: 'clamp(20px,3.5vh,32px)',
            }}
          >
            US $5,000 → <span className="accent-text">a complete pilot.</span>
          </h2>
        </Reveal>
        <Reveal>
          <Table
            columns={['Line item', 'Amount', 'What it builds']}
            rows={[
              ['Platform development', '$1,200', 'USSD / WhatsApp mentor-matching system'],
              ['Street youth outreach', '$1,200', 'Weekly visits — transport, food, hygiene, first aid'],
              ['Safe space rental', '$700', 'Physical mentorship location in Kigali'],
              ['Mentor training', '$600', '10 community mentors trained, certified & paid'],
              ['Awareness campaign', '$500', 'Radio, flyers, community mobilisation'],
              ['Operations & coordination', '$500', 'Transport and communications, 6 months'],
              ['Monitoring & evaluation', '$300', 'Baseline + follow-up impact tracking'],
              ['Total — one-time seed', '$5,000', 'Six-month pilot · 130+ direct beneficiaries'],
            ]}
            highlightRow={7}
            caption="Line-item budget with expense frequency documented in the operating plan · Resolution grant is one-time"
          />
        </Reveal>
      </Slide>

      {/* 12 ── CLOSING */}
      <Slide
        full
        nav="Close"
        notes="Every child deserves someone who believes in them. Every parent deserves somewhere to turn. Every young person deserves another chance. We are not simply asking for funding — we are inviting Resolution Project to help build a future where no young person walks that journey alone. Murakoze — thank you. We welcome your questions. (~25s)"
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(100deg, rgba(18,38,25,0.93), rgba(18,38,25,0.55)), url(/img/boy-backpack.jpg) center 30% / cover no-repeat`,
          }}
        />
        <div
          style={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 'var(--gutter-y) var(--gutter)',
            color: '#f3f0e8',
          }}
        >
          {[
            'Every child deserves someone who believes in them.',
            'Every parent deserves somewhere to turn.',
            'Every young person deserves another chance.',
          ].map((line, i) => (
            <Build at={i + 1} key={line}>
              <p
                style={{
                  fontFamily: 'var(--font-head)',
                  fontWeight: 600,
                  color: '#f3f0e8',
                  fontSize: 'clamp(20px,3vw,34px)',
                  lineHeight: 1.25,
                  maxWidth: 900,
                  margin: '0 0 10px',
                }}
              >
                {line}
              </p>
            </Build>
          ))}
          <Build at={4}>
            <p
              style={{
                maxWidth: 720,
                margin: 'clamp(16px,3vh,26px) auto 0',
                fontSize: 'clamp(15px,1.9vw,19px)',
                lineHeight: 1.6,
                color: 'rgba(243,240,232,0.92)',
              }}
            >
              We are not simply asking for funding. We are inviting Resolution
              Project to help build a future where{' '}
              <b style={{ color: '#cf9040' }}>
                no young person walks that journey alone.
              </b>
            </p>
          </Build>
          <Build at={4}>
            <div style={{ marginTop: 'clamp(20px,4vh,34px)' }}>
              <img
                src="/img/logo-mark.png"
                alt="Ongera Ubeho"
                style={{ height: 56, marginBottom: 14 }}
              />
              <p
                className="display"
                style={{
                  fontSize: 'clamp(26px,4vw,44px)',
                  color: '#f3f0e8',
                  margin: '0 0 12px',
                }}
              >
                Murakoze — thank you.
              </p>
              <p
                style={{
                  fontSize: 'clamp(12.5px,1.5vw,15px)',
                  color: 'rgba(243,240,232,0.85)',
                  margin: 0,
                }}
              >
                ongera-ubeho.vercel.app · Ongeraubehohubrwanda@gmail.com ·
                +250&nbsp;782&nbsp;250&nbsp;694 · @OngeraubehoHub
              </p>
            </div>
          </Build>
        </div>
      </Slide>
    </Deck>
  );
}
