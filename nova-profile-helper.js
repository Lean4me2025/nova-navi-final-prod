<script>
// --- NOVA profile helpers (used on all NOVA + NAVI pages) ---

function loadNovaProfile() {
  const raw = localStorage.getItem('novaProfile');
  if (!raw) {
    return {
      categoryIds: [],
      traitIds: [],
      roleId: null,
      categories: [],
      traits: [],
      role: {},
      purpose: { whyYou: '', whyThisRole: '', whyNow: '' }
    };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      categoryIds: parsed.categoryIds || [],
      traitIds: parsed.traitIds || [],
      roleId: parsed.roleId || null,
      categories: parsed.categories || [],
      traits: parsed.traits || [],
      role: parsed.role || {},
      purpose: parsed.purpose || { whyYou: '', whyThisRole: '', whyNow: '' }
    };
  } catch (e) {
    console.warn('Could not parse novaProfile; resetting.', e);
    return {
      categoryIds: [],
      traitIds: [],
      roleId: null,
      categories: [],
      traits: [],
      role: {},
      purpose: { whyYou: '', whyThisRole: '', whyNow: '' }
    };
  }
}

function saveNovaProfile(profile) {
  const clean = {
    categoryIds: profile.categoryIds || [],
    traitIds: profile.traitIds || [],
    roleId: profile.roleId || null,
    categories: profile.categories || [],
    traits: profile.traits || [],
    role: profile.role || {},
    purpose: profile.purpose || { whyYou: '', whyThisRole: '', whyNow: '' }
  };
  localStorage.setItem('novaProfile', JSON.stringify(clean));
}
</script>
