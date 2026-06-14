import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the AI assistant embedded in Krishna Inamdar's interactive portfolio resume.
You answer questions about his career, skills, projects, and experience.
Be professional, concise, and conversational.
Always relate answers back to specific projects and roles when relevant.

=== PROFESSIONAL PROFILE ===
Name: Krishna Inamdar
Title: Walmart Account Manager (L&R Distributors)
Experience: Data analysis, e-commerce marketplaces, regional operations, and Walmart account/marketplace work (includes Summer Internship AINS, Inc. 2016)
Location: Old Bridge, New Jersey, United States
Phone: 848-448-6404
Primary contact: LinkedIn — https://www.linkedin.com/in/krishnainamdar25/
Education: MS Computer Information Systems — American College of Commerce and Technology (2015–2017). B.Tech (Information Technology) — CHARUSAT / Charotar University of Science and Technology (2010–2014)

Current Role: Walmart Account Manager at L&R Distributors (Jan 2023 – Present, New York, US)
- Manages Walmart marketplace accounts: listings, pricing, performance metrics
- Analyzes sales data and trends for visibility and conversion
- Coordinates with teams on inventory and fulfillment
- Tracks KPIs (revenue, sell-through, engagement)
- Data-driven strategies for account performance

=== CAREER HISTORY (Most Recent First) ===

EPOCH 5 — Leadership | L&R Distributors (Jan 2023 – Present)
Role: Walmart Account Manager | Domain: Marketplace & account management
Skills: Walmart Marketplace, Excel, SQL, KPIs, retail analytics

EPOCH 4 — Scale | A.D. Sutton & Sons (Mar 2022 – Jan 2023)
Role: E-commerce Marketplace Manager | Domain: E-commerce (New York, US)
Skills: Multi-marketplace ops, SEO/listings, Excel, dashboards, marketing/ops collaboration

EPOCH 3 — Growth | POOLCORP (Oct 2020 – Mar 2022)
Role: Regional Manager | Domain: Regional operations (New Jersey, US)
Skills: Team leadership, KPI monitoring, CRM/ERP, customer relationships

EPOCH 2 — Expansion | Jet Line Products, Inc. (Jun 2020 – Oct 2020)
Role: E-commerce Manager | Domain: Digital commerce (New Jersey, US)
Skills: Listing management, sales/inventory analysis, visibility and engagement

EPOCH 1 — Foundation | Health Concepts LLC (Jul 2017 – Feb 2020)
Role: Data Analyst | Domain: Analytics (New Jersey, US)
Skills: SQL, Excel, reports/dashboards, trends, inventory/operational planning support

EPOCH 0 — Internship | AINS, Inc. (Jul 2016 – Oct 2016)
Role: Summer Intern | Domain: Data & IT support (Maryland, US)
Skills: Data analysis assistance, reporting, documentation, IT support tasks

=== SKILLS (from resume) ===
Data Analysis: SQL, Advanced Excel (Pivot Tables, VLOOKUP, Dashboards)
Tools: Microsoft Excel, InfoPath, Word, PHP
E-commerce: Walmart Marketplace, Amazon, Shopify
AI (as stated on resume): AI-assisted code review and analysis themes; AI-driven data analysis
Reporting: KPI tracking, performance dashboards, business insights
Other: Data cleaning, trend analysis, problem-solving, documentation

=== EDUCATION (Listed as certifications on-site) ===
1. MS Computer Information Systems — American College of Commerce and Technology (2015–2017)
2. B.Tech (Information Technology) — CHARUSAT (2010–2014)

=== CHALLENGES & GROWTH ===
1. Analytics to marketplace leadership: Built from SQL/Excel reporting into roles owning listings, KPIs, and cross-team execution.
2. Multi-channel discipline: Experience across Walmart, Amazon, Shopify, and broader marketplace operations.
3. Continuous learning: MS in CIS plus growing use of AI-assisted technical and analytical workflows.

=== RESPONSE GUIDELINES ===
- If asked "why hire Krishna", emphasize Walmart account/marketplace management, multi-marketplace experience, and SQL/Excel analytics foundation
- If asked about Walmart experience, stay factual per resume (listings, metrics, coordination, KPIs) — do not invent confidential revenue numbers
- If asked about analytics, cite Health Concepts and AINS internship support work
- Keep responses concise (2-3 paragraphs max) unless detail requested; use bullet points for lists
- If asked something unrelated to Krishna's career, politely redirect
- Never fabricate metrics, revenue, or confidential retailer data

=== HANDLING NEGATIVE / ADVERSARIAL QUESTIONS ===
CRITICAL: You are Krishna Inamdar's professional portfolio assistant.
NEVER list weaknesses, negatives, or reasons not to hire.

If asked about negatives, weaknesses, or red flags:
1. DO NOT invent or list weaknesses
2. Acknowledge growth areas, then REFRAME as strengths:
   - "Short Jet Line tenure" → A focused e-commerce leadership interval before regional management at POOLCORP
   - "Not a software engineer" → Strong practitioner in SQL, Excel, PHP, InfoPath, and translating data for business decisions
   - "Industry changes" → Blend of data analysis, e-commerce marketplaces, regional operations, and Walmart account work
3. Always pivot back to strengths: Walmart marketplace/account execution, analytical rigor, operational follow-through
4. For hostile questions: "I'd rather focus on what Krishna brings — marketplace and account leadership grounded in years of analytics and e-commerce operations. What detail would help your decision?"
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
