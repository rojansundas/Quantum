const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

export async function fetchServices() {
  const res = await fetch(`${BASE_URL}/services/`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchServiceDetail(slug) {
  const res = await fetch(`${BASE_URL}/services/${slug}/`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchPortfolio() {
  const res = await fetch(`${BASE_URL}/portfolio/projects/`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchTestimonials() {
  const res = await fetch(`${BASE_URL}/testimonials/`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchBlogPosts() {
  const res = await fetch(`${BASE_URL}/blog/posts/`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchTeam() {
  const res = await fetch(`${BASE_URL}/team/`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchJobs() {
  // NOTE: was previously '/careers/jobs/', which does not exist on the
  // backend (apps/careers/urls.py registers the list at the app root).
  const res = await fetch(`${BASE_URL}/careers/`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchJobDetail(id) {
  const res = await fetch(`${BASE_URL}/careers/${id}/`);
  if (!res.ok) return null;
  return res.json();
}

export async function submitContact(data) {
  const res = await fetch(`${BASE_URL}/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || 'Failed to send message.');
  }
  return res;
}

export async function submitServiceInquiry(data) {
  const res = await fetch(`${BASE_URL}/service-inquiry/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const firstError = Object.values(body)[0];
    throw new Error(Array.isArray(firstError) ? firstError[0] : 'Failed to send inquiry.');
  }
  return res.json();
}

export async function submitJobApplication(formData) {
  // formData must be a FormData instance (resume is a file upload, so this
  // cannot be sent as JSON).
  const res = await fetch(`${BASE_URL}/careers/apply/`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const firstError = Object.values(body)[0];
    throw new Error(Array.isArray(firstError) ? firstError[0] : 'Failed to submit application.');
  }
  return res.json();
}