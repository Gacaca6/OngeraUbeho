const pptxgen = require('pptxgenjs');
const path = require('path');

const SHOTS = 'C:/Users/GODWIN/AppData/Local/Temp/claude/C--Users-GODWIN-Downloads-ONGERA-UBEHO-SITE/24b179bb-1fc1-4f9d-a5fc-8d1263f64433/scratchpad/deckshots3';
const OUT = 'C:/Users/GODWIN/Downloads/ONGERA UBEHO SITE/Pitchdeck/ONGERA_UBEHO_Resolution_SVC_Deck.pptx';

const notes = [
  "Muraho — good morning. I'm Macrine, with my co-founders Serge and Henriette, from the University of Rwanda. Ongera Ubeho means 'Live More — Choose Life' in Kinyarwanda. It is a community-based youth and family mentorship hub, and today we'd like to show you why Rwanda needs it now. (~25s)",
  "We grew up watching classmates and neighbours disappear — into drugs, into gambling, onto the streets. Not because nobody loved them, but because their families had nowhere to turn. We are engineers, but this is personal: our own communities held us when we struggled. Ongera Ubeho is us turning to hold others. (~30s)",
  "We are youth-created and youth-led — and we bring complementary strengths. Macrine leads strategy and community partnerships and serves as Secretary of the SANGA INSHUTI Initiative. Serge is our full-stack engineer building the USSD and WhatsApp platform. Henriette leads operations and is a member of Solid Minds, Rwanda's mental-health community. A women-led team, all Mastercard Foundation Scholars at UR. (~25s)",
  "The scale: more than seven thousand children live on Kigali's streets. Over six thousand young people are in addiction treatment centres. 776 students dropped out of school because of drugs. And it follows a pattern — family conflict, isolation, substance abuse, dropout, street life. Parents see the warning signs early. They simply have nowhere affordable or culturally relevant to turn. (~35s) — VERIFY the three statistics and be ready to name sources in Q&A (RBC/NRS, NISR, MINEDUC).",
  "Why hasn't this been solved? Professional counselling costs more than twenty thousand francs and lives in urban clinics — most families cannot reach it. Everything on offer is reactive, English-speaking, smartphone-dependent, one-off. We flip every one of those: community mentors at two to five thousand francs a month, preventive, in Kinyarwanda, on any basic phone, long-term. (~30s)",
  "Ongera Ubeho is one hub with two connected tracks. Track one — prevention: a parent dials a USSD code or messages WhatsApp from any phone, describes the problem, and is matched with a trained, paid, Kinyarwanda-speaking mentor from their own community. Track two — rehabilitation: weekly street outreach builds trust, brings youth into a safe space, and walks them home — life skills, psychosocial support, family reintegration. Technology supports people. It never replaces them. (~35s)",
  "We are specific about who comes first: youth aged 12 to 25 in Kigali facing drugs, gambling, peer pressure, or street homelessness — and the parents and caregivers around them. The six-month pilot is sized precisely: 50 at-home youth, 30 street children, 40 families, 10 trained and paid community mentors — over 130 direct beneficiaries, at least 60% of them young women and girls. (~30s)",
  "We are not starting from zero. In March, Ongera Ubeho was selected as a winning venture at the HATANA Innovation Bootcamp — the Social Entrepreneurship Fund of the Mastercard Foundation Scholars Program at the University of Rwanda. Our platform is live, with a working partner-enquiry pipeline. And we have allies: the University, the Scholars Program, and through our founders, Solid Minds and SANGA INSHUTI. (~30s)",
  "Impact is measured, not claimed. Every participant gets a baseline assessment and follow-ups — that is how we will demonstrate an 80% mentorship completion rate, 70% of families reporting improved communication, and a 60% reduction in risky behaviours. We also track every referral into education, vocational training, or government services. Monitoring and evaluation is a paid line in our budget, not an afterthought. (~30s)",
  "Resolution funds once — so sustainability is designed in. Families who can pay contribute a sliding-scale fee that subsidises free service for street youth; grants, government partnerships, and corporate CSR complete the mix. The venture outlives its founders: documented mentor curriculum, structured team roles, and a transition plan. Six months to prove it, one year to expand, two years to replicate by district, five to a national model. (~35s)",
  "The ask: five thousand US dollars, one time, fully allocated. Every line buys something you can count — the matching platform, weekly street outreach, a safe space, ten trained and paid mentors, community awareness, lean operations, and independent impact tracking. This is the complete cost of a six-month pilot serving over 130 people. (~30s) — Do NOT read the table rows aloud; they are for Q&A.",
  "Every child deserves someone who believes in them. Every parent deserves somewhere to turn. Every young person deserves another chance. We are not simply asking for funding — we are inviting Resolution Project to help build a future where no young person walks that journey alone. Murakoze — thank you. We welcome your questions. (~25s) — Leave this slide on screen during Q&A.",
];

const pres = new pptxgen();
pres.layout = 'LAYOUT_16x9';
pres.author = 'Ongera Ubeho Team';
pres.title = 'Ongera Ubeho — Resolution Project Social Venture Challenge';

for (let i = 1; i <= 12; i++) {
  const slide = pres.addSlide();
  slide.addImage({
    path: path.join(SHOTS, `s${i}.png`),
    x: 0,
    y: 0,
    w: 10,
    h: 5.625,
  });
  slide.addNotes(notes[i - 1]);
}

pres.writeFile({ fileName: OUT }).then(() => console.log('written:', OUT));
