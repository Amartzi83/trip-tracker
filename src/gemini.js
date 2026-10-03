// ─────────────────────────────────────────────────────────────
// Gemini (Google Generative Language API) — extract travel
// itinerary segments from an uploaded document (image or PDF).
// The user's API key is passed in (stored privately, never bundled).
// ─────────────────────────────────────────────────────────────
// "…-latest" tracks the current Flash model, so the app keeps working as Google
// retires old versions (gemini-2.0 / 2.5 are already gone for new keys).
const MODEL = "gemini-flash-latest";

const PROMPT = `You parse travel documents (flight tickets, hotel/car-rental confirmations, train tickets, booking emails).
Extract EVERY travel segment you find. Return ONLY a JSON array (no markdown, no prose).
Each element:
{"type":"flight|hotel|car|transport|activity|other",
 "provider":"airline + flight number, or hotel / rental company name",
 "from":"origin — IATA airport code for flights, pickup location for cars",
 "to":"destination — IATA airport code for flights, dropoff for cars",
 "startDate":"YYYY-MM-DD",     // departure / check-in / pickup / start
 "startTime":"HH:MM",          // 24-hour, empty string if unknown
 "endDate":"YYYY-MM-DD",       // arrival / check-out / dropoff / end (empty if same/unknown)
 "endTime":"HH:MM",
 "confirmation":"booking / confirmation / PNR code",
 "seat":"seat number if present",
 "location":"full address for hotels / activities",
 "title":"",
 "note":""}
Rules: dates MUST be ISO YYYY-MM-DD; times MUST be 24-hour HH:MM. Use "" for anything not found.
If the year is missing, assume the next occurrence in the future. Do not invent data.`;

export async function extractItinerary(apiKey, base64Data, mimeType) {
  const body = {
    contents: [{ parts: [
      { text: PROMPT },
      { inline_data: { mime_type: mimeType || "image/jpeg", data: base64Data } },
    ] }],
    generationConfig: { temperature: 0, responseMimeType: "application/json" },
  };
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": (apiKey || "").trim() },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let msg = `שגיאה ${res.status}`;
    try { const e = await res.json(); if (e?.error?.message) msg = e.error.message; } catch {}
    if (res.status === 401) msg = "המפתח לא התקבל. ודא שהעתקת את מפתח ה-Gemini המלא מ-aistudio.google.com/apikey";
    else if (res.status === 400 || res.status === 403) msg = "מפתח לא תקין או ללא הרשאה ל-Generative Language API";
    else if (res.status === 404) msg = "מודל ה-AI לא זמין יותר — צריך לעדכן את האפליקציה";
    else if (res.status === 429) msg = "חרגת ממכסת ה-AI החינמית — נסה שוב מאוחר יותר";
    throw new Error(msg);
  }
  const d = await res.json();
  const text = d?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
  let arr;
  try { arr = JSON.parse(text); }
  catch { const m = text.match(/\[[\s\S]*\]/); arr = m ? JSON.parse(m[0]) : []; }
  if (!Array.isArray(arr)) arr = [];
  // keep only the fields we use + sane defaults
  return arr.map((s) => ({
    type: ["flight","hotel","car","transport","activity","other"].includes(s.type) ? s.type : "other",
    provider: s.provider || "", from: s.from || "", to: s.to || "",
    startDate: s.startDate || "", startTime: s.startTime || "",
    endDate: s.endDate || "", endTime: s.endTime || "",
    confirmation: s.confirmation || "", seat: s.seat || "",
    location: s.location || "", title: s.title || "", note: s.note || "",
  }));
}
