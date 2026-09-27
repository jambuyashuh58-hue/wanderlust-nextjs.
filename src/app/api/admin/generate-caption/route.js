import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabaseServer';
import { isAdminRequest } from '@/lib/adminAuth';

export async function POST(request) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { topic, content_pillar, post_type } = body || {};
  if (!topic) {
    return NextResponse.json({ error: 'topic is required' }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
  }

  const supabase = getSupabaseServer();
  const { data: character } = await supabase
    .from('brand_avatar')
    .select('name, personality, backstory, narrative_style')
    .eq('active', true)
    .maybeSingle();

  const personaBlock = character
    ? `You are writing as the brand's on-camera character, "${character.name}".
Personality: ${character.personality || 'warm, knowledgeable local guide'}
Backstory: ${character.backstory || 'an expat who relocated to Istanbul and now helps others do the same'}
Narrative style / voice: ${character.narrative_style || 'friendly, concise, first-person, a little playful'}
Write every caption fully in this voice — consistent tone, vocabulary, and sentence rhythm across posts.`
    : `Write as a warm, knowledgeable "Move to Istanbul" relocation guide/expat voice, friendly and concise.`;

  const prompt = `${personaBlock}

Write an Instagram ${post_type || 'single'} post caption for the "Move to Istanbul" account.
Topic: ${topic}
Content pillar: ${content_pillar || 'general Istanbul relocation / lifestyle content'}

Requirements:
- 2-4 short paragraphs or a punchy few lines, native-Instagram-caption feel (not a blog post)
- End with a soft call-to-action relevant to a relocation/travel audience (e.g. save this, DM us, link in bio)
- Then on a new line, provide 15-20 relevant hashtags (mix of broad + niche + Istanbul/Turkey specific), space-separated, no numbering

Respond ONLY as strict JSON, no markdown fences, in this exact shape:
{"caption": "...", "hashtags": "#tag1 #tag2 ..."}`;

  // Gemini model names get retired periodically; try a short list in order
  // instead of hardcoding one, so a future retirement doesn't hard-break this
  // route the way gemini-2.0-flash's shutdown did.
  const MODEL_CANDIDATES = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-2.5-flash'];

  try {
    let resp;
    let lastErrText = '';
    for (const model of MODEL_CANDIDATES) {
      resp = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.9, responseMimeType: 'application/json' },
          }),
        }
      );
      if (resp.ok) break;
      lastErrText = await resp.text();
      // Only fall through to the next candidate if this one is gone/not found;
      // any other error (bad key, quota, etc.) should surface immediately.
      const isModelMissing = resp.status === 404 || /not found|no longer available/i.test(lastErrText);
      if (!isModelMissing) break;
    }

    if (!resp.ok) {
      return NextResponse.json({ error: `Gemini API error: ${lastErrText}` }, { status: 502 });
    }

    const data = await resp.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: 'Model returned non-JSON output', raw: text }, { status: 502 });
    }

    return NextResponse.json({
      caption: parsed.caption || '',
      hashtags: parsed.hashtags || '',
    });
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Generation failed' }, { status: 500 });
  }
}
