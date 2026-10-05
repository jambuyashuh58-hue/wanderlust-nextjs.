// Ports the old Base44 site's full /onboarding "Plan My Trip" wizard
// (13 steps: name, gender, age group, travel type, children, interests,
// pace, budget, current location, destination, travel dates, accessibility,
// contact). Now that /api/generate-itinerary (a real Claude/Gemini-backed
// LLM route) exists, the wizard submits every answer there; it falls back
// to a rule-based local picker only if that call errors out.

import { getCities, getAllActivities } from '@/lib/supabaseServer';
import OnboardingWizard from '@/components/OnboardingWizard';

export const metadata = {
  title: 'Plan My Trip — Move to Istanbul',
  description: 'Answer a few questions and get a personalized Türkiye itinerary.',
  alternates: { canonical: '/onboarding' },
};

export const revalidate = 3600;

export default async function OnboardingPage() {
  const [cities, activities] = await Promise.all([
    getCities().catch(() => []),
    getAllActivities(500).catch(() => []),
  ]);
  return <OnboardingWizard cities={cities} activities={activities} />;
}
