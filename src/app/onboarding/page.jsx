// New page -- ports the old site's /onboarding "Plan My Trip" wizard.
// SCOPE NOTE: the old wizard was 14 steps and ended with a real LLM call
// (InvokeLLM) to generate the itinerary. This version is a shorter,
// functionally-equivalent wizard (destination, trip length, interests,
// pace) that builds the itinerary with a rule-based picker from real
// Supabase activity data instead of an LLM call, because there's no LLM
// endpoint wired up yet in this stack. If/when a backend LLM route exists,
// swap the client-side `buildItinerary()` call in OnboardingWizard.jsx for
// a fetch to it -- everything else (the wizard steps, the redirect to
// /itinerary) stays the same.

import { getCities, getAllActivities } from '@/lib/supabaseServer';
import OnboardingWizard from '@/components/OnboardingWizard';

export const metadata = {
  title: 'Plan My Trip — Move to Istanbul',
  description: 'Answer a few questions and get a personalized Türkiye itinerary.',
};

export const revalidate = 3600;

export default async function OnboardingPage() {
  const [cities, activities] = await Promise.all([
    getCities().catch(() => []),
    getAllActivities(500).catch(() => []),
  ]);
  return <OnboardingWizard cities={cities} activities={activities} />;
}
