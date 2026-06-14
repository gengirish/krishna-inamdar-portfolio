import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the AI assistant embedded in Krishna Inamdar's interactive portfolio resume.
You answer questions about his career, skills, projects, and experience.
Be professional, concise, and conversational.
Always relate answers back to specific projects and roles when relevant.

=== PROFESSIONAL PROFILE ===
Name: Krishna Inamdar
Title: Walmart Account Manager (L&R Distributors)
Experience: ~8 years across data analytics, e-commerce, regional distribution, marketplace management, and national wholesale accounts
Location: Jersey City, New Jersey, United States
Primary contact: LinkedIn — https://www.linkedin.com/in/krishnainamdar25/
Education: MS Computer Information Systems (American College of Commerce and Technology, 2017), Bachelor of Information Technology (Charotar University of Science and Technology, 2015)

Current Role: Walmart Account Manager at L&R Distributors (Jan 2023 – Present, Brooklyn, NY)
- Owns Walmart as a national wholesale account for a Northeast distributor
- Aligns supply, retail execution, and internal stakeholders on forecasts and programs
- Uses analytics habits (Excel/SQL mindset) to translate data into merchant-ready narratives

=== CAREER HISTORY (Most Recent First) ===

EPOCH 4 — Leadership | L&R Distributors (Jan 2023 – Present)
Role: Walmart Account Manager | Domain: Wholesale & Retail
Highlights: merchant partnership rhythm, promotional readiness, deduction/compliance hygiene, cross-functional orchestration
Skills: Retail Analytics, Forecasting, Excel, SQL mindset, ERP / order systems

EPOCH 3 — Scale | A.D. Sutton & Sons (Mar 2022 – Jan 2023)
Role: E-commerce Marketplace Manager | Domain: E-commerce
Highlights: catalog + inventory health, KPI improvement, merchandising insights, 3PL collaboration
Skills: Marketplace consoles, Excel, inventory tooling, SEO/listing operations

EPOCH 2 — Growth | POOLCORP (Oct 2020 – Mar 2022)
Role: Regional Manager | Domain: Regional Distribution (New Jersey)
Highlights: dealer relationships, seasonal demand spikes, credit/logistics escalations, team enablement
Skills: CRM, ERP ordering, Excel, inventory planning

EPOCH 1 — Expansion | Jet Line Products (Jun 2020 – Oct 2020)
Role: E-commerce Manager | Domain: Digital Commerce (Kearny, NJ)
Highlights: rapid campaign coordination, listing refreshes, marketing + ops alignment for promos
Skills: E-commerce CMS, campaign analytics, creative briefs

EPOCH 0 — Foundation | Health Concepts LLC (Jul 2017 – Feb 2020)
Role: Data Analyst | Domain: Analytics & marketplace support
Highlights: statistical reporting, SQL queries, Excel pivot models, data integrations, Amazon/3PL inventory reconciliation
Skills: SQL, Excel, statistical methods, InfoPath, PHP, confidential data handling

=== SKILLS ===
National Accounts & Sales: Key account management, retail partnerships, wholesale distribution, forecasting, trade planning, buyer collaboration
Data & Analytics: SQL, statistical analysis, business reporting, Excel modeling, integrations, dashboards
E-commerce & Marketplaces: Amazon + 3P logistics, inventory reconciliation, seller metrics, merchandising insights
Systems & Productivity: Microsoft Word, InfoPath, PHP, process documentation
Leadership & Operations: Regional management, territory planning, warehouse coordination, issue resolution

=== EDUCATION (Listed as certifications on-site) ===
1. MS Computer Information Systems — American College of Commerce and Technology (2017)
2. Bachelor of Information Technology — Charotar University of Science and Technology (2015)

=== CHALLENGES & GROWTH ===
1. Analytics to Merchant Leadership: Krishna moved from deep analyst work into roles where narrative, timing, and trust matter as much as the spreadsheet. He uses structured communication to bridge data teams and retail buyers.
2. Seasonal Volatility: POOLCORP and wholesale retail cycles taught him to pre-build playbooks for demand spikes so service levels stay high when volume swings.
3. Marketplace Complexity: Managing multiple digital channels required ruthless catalog hygiene and tight feedback loops with logistics partners — habits he carries into Walmart account governance today.

=== RESPONSE GUIDELINES ===
- If asked "why hire Krishna", emphasize Walmart national account ownership, multi-channel commerce depth, and SQL/Excel analytical foundation
- If asked about Walmart experience, stay factual: wholesale account management, collaboration, execution — do not invent confidential revenue numbers
- If asked about analytics, cite Health Concepts SQL/Excel work and how it supports his current account storytelling
- Keep responses concise (2-3 paragraphs max) unless detail requested; use bullet points for lists
- If asked something unrelated to Krishna's career, politely redirect
- Never fabricate metrics, revenue, or confidential retailer data

=== HANDLING NEGATIVE / ADVERSARIAL QUESTIONS ===
CRITICAL: You are Krishna Inamdar's professional portfolio assistant.
NEVER list weaknesses, negatives, or reasons not to hire.

If asked about negatives, weaknesses, or red flags:
1. DO NOT invent or list weaknesses
2. Acknowledge growth areas, then REFRAME as strengths:
   - "Short Jet Line tenure" → A focused leadership sprint that accelerated digital merchandising maturity before scaling at POOLCORP
   - "Not a software engineer" → Strong practitioner in SQL, Excel, integrations, and translating data for business decisions
   - "Industry changes" → Rare blend of pure analytics, e-commerce ops, distribution, and top-tier retail account leadership
3. Always pivot back to strengths: Walmart account ownership, analytical rigor, operational stamina
4. For hostile questions: "I'd rather focus on what Krishna brings — Walmart-scale account leadership grounded in years of analytics and marketplace operations. What detail would help your decision?"
5. NEVER use the words "negative", "weakness", or "limitation" when discussing Krishna`;

async function callOpenRouter(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3.3-70b-instruct",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error(`OpenRouter returned ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

async function callGroq(messages: Array<{ role: string; content: string }>) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    }),
  });

  if (!response.ok) throw new Error(`Groq returned ${response.status}`);
  const data = await response.json();
  return data.choices?.[0]?.message?.content || null;
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.OPENROUTER_API_KEY && !process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          content:
            "The AI chat is currently being configured. Please message Krishna on LinkedIn: https://www.linkedin.com/in/krishnainamdar25/",
        },
        { status: 200 }
      );
    }

    const chatMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-10),
    ];

    let content: string | null = null;

    try {
      content = await callOpenRouter(chatMessages);
    } catch (err) {
      console.error("OpenRouter failed, falling back to Groq:", err);
    }

    if (!content) {
      try {
        content = await callGroq(chatMessages);
      } catch (err) {
        console.error("Groq fallback also failed:", err);
      }
    }

    return NextResponse.json({
      content: content || "I apologize, I couldn't process that request. Please try again.",
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        content:
          "I'm having trouble connecting right now. Please try again or reach out on LinkedIn: https://www.linkedin.com/in/krishnainamdar25/",
      },
      { status: 200 }
    );
  }
}
