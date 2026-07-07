import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "db.json");

app.use(express.json());

// Initialize Database
function initializeDb() {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, "utf-8");
      const parsed = JSON.parse(data);
      // Ensure S. Venkatesan is the seeded MP, otherwise force-reset
      if (parsed.mps && parsed.mps.length > 0 && parsed.mps.some((m: any) => m.name === "S. Venkatesan")) {
        return parsed;
      }
    } catch (e) {
      console.error("Error reading database file, resetting database:", e);
    }
  }

  // Initial seed data with authentic Madurai constituency S. Venkatesan profile
  const initialDb = {
    users: {
      "citizen1@janvaani.in": {
        id: "usr_citizen1",
        email: "citizen1@janvaani.in",
        password: "password",
        name: "Karthik Raja",
        phone: "+91 94432 10101",
        ward: "Ward 12, Sellur",
        constituency: "Madurai Lok Sabha",
        state: "Tamil Nadu",
        district: "Madurai",
        role: "citizen",
        createdAt: "2026-06-20T10:00:00.000Z"
      },
      "citizen2@janvaani.in": {
        id: "usr_citizen2",
        email: "citizen2@janvaani.in",
        password: "password",
        name: "Anitha Selvam",
        phone: "+91 94888 12345",
        ward: "Ward 45, K.K. Nagar",
        constituency: "Madurai Lok Sabha",
        state: "Tamil Nadu",
        district: "Madurai",
        role: "citizen",
        createdAt: "2026-06-21T11:30:00.000Z"
      },
      "mp@maduraimp.in": {
        id: "usr_mp_venkatesan",
        email: "mp@maduraimp.in",
        password: "password",
        name: "Hon. S. Venkatesan, MP",
        phone: "+91 452 2530455",
        ward: "Madurai Corporation",
        constituency: "Madurai Lok Sabha",
        state: "Tamil Nadu",
        district: "Madurai",
        role: "mp",
        createdAt: "2026-05-01T09:00:00.000Z"
      }
    },
    mps: [
      {
        id: "usr_mp_venkatesan",
        name: "S. Venkatesan",
        email: "mp@maduraimp.in",
        phone: "+91-452-2530455",
        constituency: "Madurai Lok Sabha",
        district: "Madurai",
        state: "Tamil Nadu",
        party: "Communist Party of India (Marxist) [CPI(M)]",
        partyColor: "#cc0000",
        photoUrl: "/src/assets/images/mp_venkatesan_portrait_1783325490674.jpg",
        biography: "S. Venkatesan (Su. Venkatesan) is a distinguished Tamil novelist, progressive thinker, and Member of Parliament representing the Madurai constituency. He is the General Secretary of the Tamil Nadu Progressive Writers and Artists Association and is acclaimed for his Sahitya Akademi Award-winning historical novel 'Kaval Kottam', which explores 600 years of Madurai's history.\n\nAs Madurai's elected representative, he focuses heavily on securing central archaeological grants for Keeladi, modernizing public railways, improving city sanitation, implementing the Mullaiperiyar water scheme, and boosting local youth employment.",
        committees: [
          "Standing Committee on Education, Women, Children, Youth and Sports",
          "Consultative Committee on Ministry of Civil Aviation"
        ],
        recentActivities: [
          "Successfully secured Rs. 15 Crore for Keeladi Archaeological Excavation and Museum site development.",
          "Chaired the high-level coordination committee for Madurai Airport runway expansion and international flights.",
          "Inaugurated the expanded 50-bed pediatric ICU wing at Government Rajaji Hospital, funded via MPLADS.",
          "Presented a memorandum to the Railway Board advocating for the Madurai-Tuticorin double-line electrification."
        ],
        ongoingProjects: [
          {
            id: "proj_mdu_1",
            title: "Mullaiperiyar Water Scheme",
            budget: "Rs. 320 Crore",
            status: "In Progress",
            description: "A major water infrastructure project laying dedicated supply lines from Mullaiperiyar dam to guarantee 24x7 drinking water across Madurai."
          },
          {
            id: "proj_mdu_2",
            title: "Smart Heritage Meenakshi Temple Corridor",
            budget: "Rs. 85 Crore",
            status: "In Progress",
            description: "Upgrading local pedestrian pavements, retrofitting vintage streetlights, and building ecological safety zones surrounding the historic Meenakshi Amman Temple."
          },
          {
            id: "proj_mdu_3",
            title: "Model Corporation Schools Rejuvenation",
            budget: "Rs. 42 Crore",
            status: "Completed",
            description: "Modernizing 15 Corporation schools in Madurai with digital smartboards, science labs, and safe sanitary blocks."
          }
        ]
      }
    ],
    concerns: [
      {
        id: "con_1",
        citizenId: "usr_citizen1",
        citizenName: "Karthik Raja",
        citizenEmail: "citizen1@janvaani.in",
        citizenPhone: "+91 94432 10101",
        title: "Severe Drainage Blockage and Flooding near Goripalayam Junction",
        description: "The primary storm drains surrounding the Goripalayam intersection are completely choked with solid waste and construction debris. Every heavy shower turns the junction into a deep pool, stalling public buses, endangering two-wheelers, and leaking garbage onto the street.",
        ward: "Ward 22, Goripalayam",
        state: "Tamil Nadu",
        district: "Madurai",
        constituency: "Madurai Lok Sabha",
        category: "Sanitation",
        tags: ["drainage-clog", "goripalayam-junction", "monsoon-flooding"],
        status: "In Progress",
        priority: "High",
        isAnonymous: false,
        attachmentNote: "Silt level is blocks deep. Water logging remains for hours.",
        createdAt: "2026-06-21T08:15:00.000Z",
        updatedAt: "2026-06-25T14:00:00.000Z"
      },
      {
        id: "con_2",
        citizenId: "usr_citizen2",
        citizenName: "Anitha Selvam",
        citizenEmail: "citizen2@janvaani.in",
        citizenPhone: "+91 94888 12345",
        title: "Inadequate Bus Transit Frequency to Madurai East Suburbs",
        description: "Residents in the growing Othakadai and Madurai East suburbs are suffering from lack of regular government buses. During peak office and school hours (8:30 AM to 10:30 AM), buses from Mattuthavani are heavily packed, forcing students to stand on footboards. We need at least 4 additional direct services.",
        ward: "Ward 58, Madurai East",
        state: "Tamil Nadu",
        district: "Madurai",
        constituency: "Madurai Lok Sabha",
        category: "Public Transport",
        tags: ["bus-transit", "suburban-mobility", "crowding"],
        status: "Resolved",
        priority: "Medium",
        isAnonymous: false,
        createdAt: "2026-06-25T14:40:00.000Z",
        updatedAt: "2026-07-02T16:20:00.000Z"
      },
      {
        id: "con_3",
        citizenId: "usr_citizen1",
        citizenName: "Karthik Raja",
        citizenEmail: "citizen1@janvaani.in",
        citizenPhone: "+91 94432 10101",
        title: "Frequent Drinking Water Supply Disruptions in Sellur",
        description: "Our residential lane in Sellur receives municipal drinking water only once in every four or five days, for barely 30 minutes. The pressure is too low to reach first-floor tanks. Many families are forced to purchase expensive private water tankers.",
        ward: "Ward 12, Sellur",
        state: "Tamil Nadu",
        district: "Madurai",
        constituency: "Madurai Lok Sabha",
        category: "Water Supply",
        tags: ["drinking-water", "supply-shortage", "sellur"],
        status: "Submitted",
        priority: "High",
        isAnonymous: false,
        createdAt: "2026-07-04T10:10:00.000Z",
        updatedAt: "2026-07-04T10:10:00.000Z"
      },
      {
        id: "con_4",
        citizenId: "usr_citizen2",
        citizenName: "Anitha Selvam",
        citizenEmail: "citizen2@janvaani.in",
        citizenPhone: "+91 94888 12345",
        title: "Dark Zones and Broken Streetlights near Meenakshi Temple West Tower lanes",
        description: "The lanes leading to the West Tower of the Meenakshi Amman Temple are completely dark after sunset due to four consecutive non-functional streetlights. This is a critical tourist path. Female travelers and local women feel extremely vulnerable walking alone.",
        ward: "Ward 3, Simmakkal",
        state: "Tamil Nadu",
        district: "Madurai",
        constituency: "Madurai Lok Sabha",
        category: "Women's Safety",
        tags: ["temple-safety", "broken-streetlights", "dark-zones"],
        status: "Under Review",
        priority: "High",
        isAnonymous: false,
        createdAt: "2026-07-02T11:20:00.000Z",
        updatedAt: "2026-07-03T09:45:00.000Z"
      }
    ],
    concernUpdates: [
      {
        id: "upd_1",
        concernId: "con_1",
        mpId: "usr_mp_venkatesan",
        mpName: "Hon. S. Venkatesan, MP",
        status: "Under Review",
        note: "We have reviewed this flooding concern. Goripalayam is a major arterial junction in Madurai. Instructed the Corporation Assistant Commissioner to inspect the blockages.",
        visibleToCitizen: true,
        createdAt: "2026-06-22T10:30:00.000Z"
      },
      {
        id: "upd_2",
        concernId: "con_1",
        mpId: "usr_mp_venkatesan",
        mpName: "Hon. S. Venkatesan, MP",
        status: "In Progress",
        note: "A sanitation field squad has been deployed to Goripalayam. Silt-clearing machinery is working to clear the sub-surface storm drains. Structural improvements will be made to prevent re-clogging.",
        visibleToCitizen: true,
        createdAt: "2026-06-24T15:00:00.000Z"
      },
      {
        id: "upd_3",
        concernId: "con_2",
        mpId: "usr_mp_venkatesan",
        mpName: "Hon. S. Venkatesan, MP",
        status: "Under Review",
        note: "Taking up the suburban crowding issue with the Madurai Division regional manager of the Tamil Nadu State Transport Corporation (TNSTC).",
        visibleToCitizen: true,
        createdAt: "2026-06-26T09:00:00.000Z"
      },
      {
        id: "upd_4",
        concernId: "con_2",
        mpId: "usr_mp_venkatesan",
        mpName: "Hon. S. Venkatesan, MP",
        status: "In Progress",
        note: "TNSTC has confirmed that two peak-hour additional trial trips will start operating on this route from next Monday. We will evaluate boarding loads.",
        visibleToCitizen: true,
        createdAt: "2026-06-29T11:00:00.000Z"
      },
      {
        id: "upd_5",
        concernId: "con_2",
        mpId: "usr_mp_venkatesan",
        mpName: "Hon. S. Venkatesan, MP",
        status: "Resolved",
        note: "TNSTC has permanented 4 peak-hour trips from Mattuthavani to Othakadai. High school and college students are now boarding safely. Closing the grievance.",
        visibleToCitizen: true,
        createdAt: "2026-07-02T16:20:00.000Z"
      }
    ]
  };

  saveDb(initialDb);
  return initialDb;
}

const db = initializeDb();

function saveDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save database:", e);
  }
}

// Lazy init for Google Gen AI
let aiClient: GoogleGenAI | null = null;
function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      try {
        aiClient = new GoogleGenAI({ apiKey: key });
      } catch (e) {
        console.error("Error creating GoogleGenAI client:", e);
      }
    }
  }
  return aiClient;
}

// Local fallback classifier in case API key is missing or calls fail
function generateLocalClassification(title: string, description: string) {
  const text = (title + " " + description).toLowerCase();
  let category: string = "Others";
  let tags: string[] = ["general"];

  if (text.includes("road") || text.includes("pothole") || text.includes("bridge") || text.includes("street") || text.includes("pavement") || text.includes("flyover")) {
    category = "Roads";
    tags = ["roads", "infrastructure", "potholes"];
  } else if (text.includes("drinking") || text.includes("water supply") || text.includes("pipe") || text.includes("borewell") || text.includes("tank") || text.includes("mullaiperiyar")) {
    category = "Water Supply";
    tags = ["drinking-water", "water-supply", "pipes"];
  } else if (text.includes("electricity") || text.includes("power") || text.includes("blackout") || text.includes("electric") || text.includes("transformer") || text.includes("voltage")) {
    category = "Electricity";
    tags = ["electricity", "power-cuts", "transformer"];
  } else if (text.includes("hospital") || text.includes("clinic") || text.includes("doctor") || text.includes("health") || text.includes("medicine") || text.includes("medical") || text.includes("rajaji") || text.includes("dialysis")) {
    category = "Healthcare";
    tags = ["healthcare", "government-hospital", "medical-care"];
  } else if (text.includes("school") || text.includes("teacher") || text.includes("education") || text.includes("college") || text.includes("student") || text.includes("classroom") || text.includes("library")) {
    category = "Education";
    tags = ["education", "corporation-schools", "smartboards"];
  } else if (text.includes("bus") || text.includes("transport") || text.includes("train") || text.includes("railway") || text.includes("metro") || text.includes("transit") || text.includes("mattuthavani")) {
    category = "Public Transport";
    tags = ["public-transport", "bus-services", "connectivity"];
  } else if (text.includes("sanitation") || text.includes("garbage") || text.includes("waste") || text.includes("drain") || text.includes("sewage") || text.includes("clog") || text.includes("gutter") || text.includes("trash")) {
    category = "Sanitation";
    tags = ["sanitation", "solid-waste", "drainage-block"];
  } else if (text.includes("woman") || text.includes("women") || text.includes("harass") || text.includes("dark zone") || text.includes("streetlights") || text.includes("safety") || text.includes("security") || text.includes("temple-safety")) {
    category = "Women's Safety";
    tags = ["womens-safety", "street-lighting", "public-security"];
  } else if (text.includes("welfare") || text.includes("pension") || text.includes("scheme") || text.includes("ration") || text.includes("card") || text.includes("scholarship") || text.includes("keeladi")) {
    category = "Public Welfare";
    tags = ["public-welfare", "heritage-grants", "citizen-welfare"];
  }

  const aiSummary = title.length > 60 ? title.substring(0, 60) + "..." : title;

  return {
    category,
    tags,
    urgency: "medium",
    aiSummary
  };
}

async function classifyConcern(title: string, description: string) {
  const client = getAiClient();
  if (!client) {
    console.log("No GEMINI_API_KEY environment variable. Applying offline classification logic.");
    return generateLocalClassification(title, description);
  }

  const prompt = `You are a civic assistant AI for JanVaani. Analyze this Madurai citizen complaint and classify it.
Title: ${title}
Description: ${description}

Taxonomy Categories (MUST select exactly one):
- Roads
- Water Supply
- Electricity
- Healthcare
- Education
- Public Transport
- Sanitation
- Women's Safety
- Public Welfare
- Others

Output schema guidelines:
- category: One of the listed categories exactly.
- tags: Array of 3 to 5 lowercase strings indicating specific concepts.
- urgency: Exactly 'low', 'medium', or 'high'.
- aiSummary: A concise, human-like one-line summary of the core complaint.`;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            category: {
              type: "STRING",
              enum: [
                "Roads",
                "Water Supply",
                "Electricity",
                "Healthcare",
                "Education",
                "Public Transport",
                "Sanitation",
                "Women's Safety",
                "Public Welfare",
                "Others"
              ]
            },
            tags: {
              type: "ARRAY",
              items: { type: "STRING" }
            },
            urgency: {
              type: "STRING",
              enum: ["low", "medium", "high"]
            },
            aiSummary: {
              type: "STRING"
            }
          },
          required: ["category", "tags", "urgency", "aiSummary"]
        }
      }
    });

    const responseText = response.text;
    if (responseText) {
      return JSON.parse(responseText);
    }
    throw new Error("Empty classification from AI");
  } catch (error) {
    console.error("Gemini classification failed, reverting to local analyzer:", error);
    return generateLocalClassification(title, description);
  }
}

// Auth Middleware helper
function getAuthenticatedUser(req: express.Request) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.substring(7);
  try {
    const email = Buffer.from(token, "base64").toString("utf-8");
    const user = db.users[email];
    if (user) {
      return user;
    }
  } catch (e) {
    // invalid token
  }
  return null;
}

// --- API ROUTES ---

// Find MPs (Search or filter by State, District, Constituency)
app.get("/api/mps", (req, res) => {
  let mpsList = db.mps || [];
  const { state, district, constituency } = req.query;

  if (state) {
    mpsList = mpsList.filter((m: any) => m.state.toLowerCase() === (state as string).toLowerCase());
  }
  if (district) {
    mpsList = mpsList.filter((m: any) => m.district.toLowerCase() === (district as string).toLowerCase());
  }
  if (constituency) {
    mpsList = mpsList.filter((m: any) => m.constituency.toLowerCase() === (constituency as string).toLowerCase());
  }

  res.json(mpsList);
});

// Get specific MP profile
app.get("/api/mps/:id", (req, res) => {
  const mp = (db.mps || []).find((m: any) => m.id === req.params.id);
  if (!mp) {
    return res.status(404).json({ error: "Member of Parliament profile not found." });
  }
  res.json(mp);
});

// Public landing transparency counters
app.get("/api/transparency-counters", (req, res) => {
  const concernsList = db.concerns || [];
  const totalReceived = concernsList.length;

  // Resolved concerns count
  const resolvedThisMonth = concernsList.filter((c: any) => c.status === "Resolved").length;

  const categoryCounts: Record<string, number> = {};
  concernsList.forEach((c: any) => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
  });

  const topCategories = Object.keys(categoryCounts)
    .map(category => ({ category, count: categoryCounts[category] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  res.json({
    totalReceived,
    resolvedThisMonth,
    topCategories
  });
});

// Auth endpoints
app.post("/api/auth/signup", (req, res) => {
  const { email, password, name, phone, ward, constituency, state, district, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: "Missing required signup details." });
  }

  if (db.users[email]) {
    return res.status(400).json({ error: "An account with this email already exists." });
  }

  const id = "usr_" + Math.random().toString(36).substring(2, 11);
  const newUser = {
    id,
    email,
    password, 
    name,
    phone: phone || "",
    ward: ward || "",
    constituency: constituency || "New Delhi",
    state: state || "Delhi",
    district: district || "New Delhi",
    role,
    createdAt: new Date().toISOString()
  };

  db.users[email] = newUser;
  saveDb(db);

  // Return token
  const token = Buffer.from(email).toString("base64");
  const { password: _, ...profile } = newUser;
  res.json({ token, profile });
});

app.post("/api/auth/signin", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = db.users[email];
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = Buffer.from(email).toString("base64");
  const { password: _, ...profile } = user;
  res.json({ token, profile });
});

app.get("/api/auth/me", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  const { password: _, ...profile } = user;
  res.json({ profile });
});

// Authenticated Concern Submission (generates JV- tracking ID)
app.post("/api/concerns", async (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "citizen") {
    return res.status(403).json({ error: "Only registered citizens can submit concerns." });
  }

  const { title, description, state, district, constituency, ward, category, isAnonymous, attachmentNote } = req.body;
  if (!title || !description || !constituency) {
    return res.status(400).json({ error: "Title, description, and constituency are required." });
  }

  try {
    const aiResult = await classifyConcern(title, description);
    
    // Generate a unique professional tracking ID: e.g., JV-78294
    const trackingDigits = Math.floor(100000 + Math.random() * 900000);
    const trackingId = `JV-${trackingDigits}`;

    const newConcern = {
      id: trackingId,
      citizenId: user.id,
      citizenName: isAnonymous ? "Anonymous Citizen" : user.name,
      citizenEmail: isAnonymous ? "" : user.email,
      citizenPhone: isAnonymous ? "" : user.phone,
      title,
      description,
      state: state || user.state || "Delhi",
      district: district || user.district || "New Delhi",
      constituency: constituency || user.constituency || "New Delhi",
      ward: ward || user.ward || "General Area",
      category: category || aiResult.category,
      tags: aiResult.tags,
      status: "Submitted",
      isAnonymous: !!isAnonymous,
      attachmentNote: attachmentNote || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.concerns.unshift(newConcern); 
    saveDb(db);

    res.json(newConcern);
  } catch (err) {
    console.error("Failed to submit concern:", err);
    res.status(500).json({ error: "Failed to submit concern." });
  }
});

// Guest / Public / Anonymous Concern Submission (does not require login, generates JV- tracking ID)
app.post("/api/concerns/public", async (req, res) => {
  const { title, description, state, district, constituency, ward, category, isAnonymous, citizenName, citizenEmail, citizenPhone, attachmentNote } = req.body;
  if (!title || !description || !constituency) {
    return res.status(400).json({ error: "Title, description, and constituency are required." });
  }

  try {
    const aiResult = await classifyConcern(title, description);
    
    const trackingDigits = Math.floor(100000 + Math.random() * 900000);
    const trackingId = `JV-${trackingDigits}`;

    const newConcern = {
      id: trackingId,
      citizenId: "guest",
      citizenName: isAnonymous ? "Anonymous Citizen" : (citizenName || "Guest Citizen"),
      citizenEmail: isAnonymous ? "" : (citizenEmail || ""),
      citizenPhone: isAnonymous ? "" : (citizenPhone || ""),
      title,
      description,
      state: state || "Delhi",
      district: district || "New Delhi",
      constituency,
      ward: ward || "General Area",
      category: category || aiResult.category,
      tags: aiResult.tags,
      status: "Submitted",
      isAnonymous: !!isAnonymous,
      attachmentNote: attachmentNote || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    db.concerns.unshift(newConcern); 
    saveDb(db);

    res.json(newConcern);
  } catch (err) {
    console.error("Failed to submit public concern:", err);
    res.status(500).json({ error: "Failed to submit concern." });
  }
});

// Public Tracking retrieve endpoint (No Auth Required)
app.get("/api/concerns/track/:id", (req, res) => {
  const trackingId = req.params.id.trim();
  const concern = db.concerns.find((c: any) => c.id.toLowerCase() === trackingId.toLowerCase());
  
  if (!concern) {
    return res.status(404).json({ error: "No concern found with this Tracking ID." });
  }

  // Retrieve updates for this concern
  const updates = (db.concernUpdates || []).filter((u: any) => u.concernId === concern.id && u.visibleToCitizen);

  res.json({ concern, updates });
});

// List authenticated user's concerns
app.get("/api/concerns", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ error: "Authentication required." });
  }

  let concernsList = db.concerns || [];

  if (user.role === "citizen") {
    // Citizens see their own concerns (non-anonymous + matched citizenId)
    concernsList = concernsList.filter((c: any) => c.citizenId === user.id);
  } else if (user.role === "mp") {
    // MPs see concerns in their constituency
    // In our seed database, we map the logged-in MP's constituency
    const mpProfile = db.mps.find((m: any) => m.id === user.id || m.email === user.email);
    const constName = mpProfile ? mpProfile.constituency : user.constituency;
    concernsList = concernsList.filter((c: any) => c.constituency.toLowerCase() === constName.toLowerCase());
  }

  res.json(concernsList);
});

// Get a specific concern detailed view for logged in user
app.get("/api/concerns/:id", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user) {
    return res.status(401).json({ error: "Authentication required." });
  }

  const concern = db.concerns.find((c: any) => c.id === req.params.id);
  if (!concern) {
    return res.status(404).json({ error: "Concern not found." });
  }

  // Auth check
  if (user.role === "citizen" && concern.citizenId !== user.id) {
    return res.status(403).json({ error: "Access denied." });
  }
  
  if (user.role === "mp") {
    const mpProfile = db.mps.find((m: any) => m.id === user.id || m.email === user.email);
    const constName = mpProfile ? mpProfile.constituency : user.constituency;
    if (concern.constituency.toLowerCase() !== constName.toLowerCase()) {
      return res.status(403).json({ error: "This concern belongs to another MP's constituency." });
    }
  }

  // Get updates
  const updates = (db.concernUpdates || [])
    .filter((u: any) => u.concernId === concern.id)
    .filter((u: any) => user.role === "mp" || u.visibleToCitizen);

  res.json({ concern, updates });
});

// Update concern (MPs only)
app.post("/api/concerns/:id/updates", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "mp") {
    return res.status(403).json({ error: "Only MPs can update concerns." });
  }

  const concern = db.concerns.find((c: any) => c.id === req.params.id);
  if (!concern) {
    return res.status(404).json({ error: "Concern not found." });
  }

  const mpProfile = db.mps.find((m: any) => m.id === user.id || m.email === user.email);
  const constName = mpProfile ? mpProfile.constituency : user.constituency;

  if (concern.constituency.toLowerCase() !== constName.toLowerCase()) {
    return res.status(403).json({ error: "Access denied to foreign constituency concerns." });
  }

  const { status, note, visibleToCitizen, priority } = req.body;
  if (!status || !note) {
    return res.status(400).json({ error: "Status and note are required." });
  }

  // Add Update
  const updateId = "upd_" + Math.random().toString(36).substring(2, 11);
  const newUpdate = {
    id: updateId,
    concernId: concern.id,
    mpId: user.id,
    mpName: user.name,
    status,
    note,
    visibleToCitizen: visibleToCitizen !== undefined ? visibleToCitizen : true,
    createdAt: new Date().toISOString()
  };

  if (!db.concernUpdates) {
    db.concernUpdates = [];
  }
  db.concernUpdates.push(newUpdate);

  // Update Concern Status & priority if provided
  concern.status = status;
  if (priority) {
    concern.priority = priority;
  }
  concern.updatedAt = new Date().toISOString();

  saveDb(db);

  res.json({ concern, update: newUpdate });
});

// Bulk update (MPs only)
app.post("/api/concerns/bulk-update", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "mp") {
    return res.status(403).json({ error: "Only MPs can perform bulk operations." });
  }

  const { concernIds, status, category, priority } = req.body;
  if (!concernIds || !Array.isArray(concernIds)) {
    return res.status(400).json({ error: "concernIds array is required." });
  }

  const mpProfile = db.mps.find((m: any) => m.id === user.id || m.email === user.email);
  const constName = mpProfile ? mpProfile.constituency : user.constituency;

  let updatedCount = 0;
  const now = new Date().toISOString();

  db.concerns.forEach((c: any) => {
    if (concernIds.includes(c.id) && c.constituency.toLowerCase() === constName.toLowerCase()) {
      if (status) {
        c.status = status;
        const updateId = "upd_" + Math.random().toString(36).substring(2, 11);
        if (!db.concernUpdates) db.concernUpdates = [];
        db.concernUpdates.push({
          id: updateId,
          concernId: c.id,
          mpId: user.id,
          mpName: user.name,
          status,
          note: `Systemic status update to "${status}" via bulk MP action.`,
          visibleToCitizen: true,
          createdAt: now
        });
      }
      if (category) {
        c.category = category;
      }
      if (priority) {
        c.priority = priority;
      }
      c.updatedAt = now;
      updatedCount++;
    }
  });

  if (updatedCount > 0) {
    saveDb(db);
  }

  res.json({ success: true, updatedCount });
});

// MP Analytics endpoint
app.get("/api/analytics", (req, res) => {
  const user = getAuthenticatedUser(req);
  if (!user || user.role !== "mp") {
    return res.status(403).json({ error: "Access denied." });
  }

  const mpProfile = db.mps.find((m: any) => m.id === user.id || m.email === user.email);
  const constName = mpProfile ? mpProfile.constituency : user.constituency;

  // Filter to constituency
  const constituencyConcerns = db.concerns.filter((c: any) => c.constituency.toLowerCase() === constName.toLowerCase());

  // Group by category
  const categoryCounts: Record<string, number> = {};
  const statusCounts: Record<string, number> = {};
  const wardCounts: Record<string, number> = {};
  const dateCounts: Record<string, number> = {};

  const categories = [
    "Roads",
    "Water Supply",
    "Electricity",
    "Healthcare",
    "Education",
    "Public Transport",
    "Sanitation",
    "Women's Safety",
    "Public Welfare",
    "Others"
  ];

  // Initialize categories with zeros
  categories.forEach(cat => {
    categoryCounts[cat] = 0;
  });

  const statuses = ["Submitted", "Under Review", "In Progress", "Resolved"];
  statuses.forEach(st => {
    statusCounts[st] = 0;
  });

  const sortedByDate = [...constituencyConcerns].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  sortedByDate.forEach((c: any) => {
    // Category
    if (categoryCounts[c.category] !== undefined) {
      categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
    } else {
      categoryCounts["Others"] = (categoryCounts["Others"] || 0) + 1;
    }

    // Status
    if (statusCounts[c.status] !== undefined) {
      statusCounts[c.status] = (statusCounts[c.status] || 0) + 1;
    }

    // Ward
    const wd = c.ward || "General Area";
    wardCounts[wd] = (wardCounts[wd] || 0) + 1;

    // Volume over time (grouped by YYYY-MM-DD or simple readable date)
    const dateStr = new Date(c.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dateCounts[dateStr] = (dateCounts[dateStr] || 0) + 1;
  });

  // Convert categories object to list
  const byCategory = Object.keys(categoryCounts).map(category => ({
    category,
    count: categoryCounts[category]
  }));

  // Convert status object to list
  const byStatus = Object.keys(statusCounts).map(status => ({
    status,
    count: statusCounts[status]
  }));

  // Convert dates object to list
  const volumeOverTime = Object.keys(dateCounts).map(date => ({
    date,
    count: dateCounts[date]
  }));

  // Sort and list wards
  const topWards = Object.keys(wardCounts)
    .map(ward => ({ ward, count: wardCounts[ward] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  res.json({
    byCategory,
    byStatus,
    volumeOverTime,
    topWards
  });
});

app.post("/api/ai-assistant", async (req, res) => {
  const { message, context } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required." });
  }

  const prompt = `You are "JanVaani Assistant", a highly specialized local civic AI for the Madurai Lok Sabha Constituency under MP S. Venkatesan.
The user asks: "${message}"

Current Page context (if any): "${context || 'General Overview'}"

Information about Madurai Lok Sabha Constituency under S. Venkatesan MP:
- S. Venkatesan (Su. Venkatesan) is a famous Tamil novelist, CPI(M) MP, and Sahitya Akademi winner.
- Active mega projects in Madurai:
  1. Mullaiperiyar Drinking Water Scheme Phase II (₹320 Crore, 92% Completed, pipeline and water plant work in progress).
  2. Goripalayam Junction Flyover (₹185 Crore, 65% Completed, foundation and pillar works underway).
  3. Meenakshi Temple Smart Corridor Development (₹95 Crore, 80% Completed, heritage lighting, underground cabling).
  4. Corporation Schools Rejuvenation (₹15 Crore MPLADS, Completed, 48 schools upgraded with smart classrooms).
  5. Keeladi Excavation & Museum (Secured ₹15 Cr central grants, completed).
- Our key wards:
  * Ward 12, Sellur (water pipeline repairs & desilting under active planning/execution).
  * Ward 22, Goripalayam (traffic decongestion, hospital expansion).
  * Ward 45, K.K. Nagar (walkers park upgrades, solid waste compactor sensors).
  * Ward 3, Simmakkal (women safety streetlights, Meenakshi temple west tower zones).
  * Ward 15, Tallakulam (high-speed BSNL fiber, eco-parks).

Guidelines:
- Answer the user's question concisely, warm, and structured.
- If they ask how to file a complaint, instruct them to click "Raise Concern" button.
- If they want to track progress, advise they use the "Track Complaint" tab or input their grievance tracking ID (format like JV-XXXXXX).
- Speak politely. Be helpful.`;

  try {
    const client = getAiClient();
    if (!client) {
      throw new Error("Offline Mode: No Gemini API Key");
    }

    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text;
    res.json({ reply: text });
  } catch (err) {
    console.log("AI Assistant model fallback triggered. Message:", message);
    // Sophisticated keyword fallback
    let reply = "";
    const msg = message.toLowerCase();
    if (msg.includes("hello") || msg.includes("hi ") || msg.includes("hey")) {
      reply = "Vanakkam! I am your JanVaani AI Assistant. How can I help you engage with Madurai municipal updates or your Member of Parliament today? 👋";
    } else if (msg.includes("water") || msg.includes("mullaiperiyar") || msg.includes("pipe") || msg.includes("sellur")) {
      reply = "Regarding drinking water in Madurai: The **Mullaiperiyar Drinking Water Scheme (Phase II)** is currently **92% completed** (₹320 Crores budget). S. Venkatesan MP is actively coordinating with corporation engineers to finalize pipeline linkages across Sellur and Goripalayam. Wards like Ward 12, Sellur are prioritized for municipal desilting and pressure testing.";
    } else if (msg.includes("flyover") || msg.includes("traffic") || msg.includes("goripalayam") || msg.includes("road")) {
      reply = "Regarding roads and congestion: S. Venkatesan MP has secured clearance for the **Goripalayam Junction Flyover (₹185 Crores)**, which is currently **65% completed**. Ground desilting and pillar works are actively underway to decongest the main routes connecting Government Rajaji Hospital. He also secured ₹95 Cr for Meenakshi Temple smart heritage cabling.";
    } else if (msg.includes("complaint") || msg.includes("raise") || msg.includes("grievance") || msg.includes("issue")) {
      reply = "To raise a new concern: Click the **'Raise Concern'** button in the header (or 'Submit a New Concern' after logging into your Citizen account). Once submitted, our AI will classify and route it to S. Venkatesan MP's desk, and you'll receive a tracking ID (e.g. JV-102948) to monitor the resolution lifecycle.";
    } else if (msg.includes("track") || msg.includes("status") || msg.includes("jv-") || msg.includes("id")) {
      reply = "To track an existing issue: Navigate to the **'Track Complaint'** tab in the main menu, paste your 8-digit tracking code (e.g. `JV-MDU-101`), and click Search. You will see a vertical timeline displaying municipal notes, department triage steps, and resolution statuses.";
    } else if (msg.includes("mp") || msg.includes("venkatesan") || msg.includes("who is")) {
      reply = "Hon. S. Venkatesan is your Member of Parliament for the Madurai Lok Sabha constituency. He is a prominent Tamil novelist, Sahitya Akademi laureate (for *Kaval Kottam*), and active voice in parliament. He maintains a **96% attendance record**, has raised **142 parliamentary questions**, and is dedicated to Keeladi museum grants and Madurai AIIMS allocations.";
    } else {
      reply = "Thank you for reaching out! I am the JanVaani Civic AI Assistant. S. Venkatesan MP has spearheaded major projects in Madurai, including the Mullaiperiyar Drinking Water Scheme (92% complete), the Goripalayam Flyover (65% complete), and Meenakshi Temple heritage corridors. For specific issues, please use the 'Raise Concern' tab to submit them officially.";
    }
    res.json({ reply });
  }
});


// --- VITE DEV / PRODUCTION FLOW SERVING ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Mount Vite dev server
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    // Production static files serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`JanVaani Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
