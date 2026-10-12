// Shared NOVA profile storage — keep answers intact across every discovery page.
const NOVA_PROFILE_KEY = "novaProfile";
const NOVA_DISCOVERY_SESSION_KEY = "novaDiscoverySession";

function defaultNovaProfile() {
  return {
    categoryIds: [],
    traitIds: [],
    roleId: null,
    categories: [],
    traits: [],
    signals: {},
    role: {},
    purpose: { whyYou: "", whyThisRole: "", whyNow: "" }
  };
}

// Visiting a discovery step must never erase answers from an existing session.
// This function is called by both signals.html and categories.html.
function ensureNovaDiscoverySession() {
  try {
    let started = localStorage.getItem(NOVA_DISCOVERY_SESSION_KEY);
    if (!started) {
      started = new Date().toISOString();
      localStorage.setItem(NOVA_DISCOVERY_SESSION_KEY, started);
    }
    return started;
  } catch (error) {
    console.warn("NOVA could not store the discovery session on this device.", error);
    return null;
  }
}

function loadNovaProfile() {
  const defaults = defaultNovaProfile();
  try {
    const raw = localStorage.getItem(NOVA_PROFILE_KEY);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return defaults;
    return {
      ...defaults,
      ...parsed,
      categoryIds: Array.isArray(parsed.categoryIds) ? parsed.categoryIds : [],
      traitIds: Array.isArray(parsed.traitIds) ? parsed.traitIds : [],
      roleId: parsed.roleId || null,
      categories: Array.isArray(parsed.categories) ? parsed.categories : [],
      traits: Array.isArray(parsed.traits) ? parsed.traits : [],
      signals: parsed.signals && typeof parsed.signals === "object" && !Array.isArray(parsed.signals)
        ? { ...parsed.signals } : {},
      role: parsed.role && typeof parsed.role === "object" && !Array.isArray(parsed.role)
        ? { ...parsed.role } : {},
      purpose: parsed.purpose && typeof parsed.purpose === "object" && !Array.isArray(parsed.purpose)
        ? { ...defaults.purpose, ...parsed.purpose } : { ...defaults.purpose }
    };
  } catch (error) {
    console.warn("NOVA could not read the saved profile; using an empty profile.", error);
    return defaults;
  }
}

function saveNovaProfile(profile) {
  // Merge rather than recreate a short list of fields: new clues, selections,
  // evidence and additional results must survive navigation and return visits.
  const previous = loadNovaProfile();
  const changes = profile && typeof profile === "object" ? profile : {};
  const clean = {
    ...previous,
    ...changes,
    signals: {
      ...previous.signals,
      ...(changes.signals && typeof changes.signals === "object" ? changes.signals : {})
    },
    purpose: {
      ...previous.purpose,
      ...(changes.purpose && typeof changes.purpose === "object" ? changes.purpose : {})
    }
  };
  try {
    localStorage.setItem(NOVA_PROFILE_KEY, JSON.stringify(clean));
  } catch (error) {
    console.warn("NOVA could not save the profile on this device.", error);
  }
  return clean;
}
