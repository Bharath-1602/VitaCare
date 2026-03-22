// ==================== VitaCare Auth Utilities ====================
const API_BASE = '';  // empty because Nginx proxies /api/* to backend services

// Token management
function getToken() {
  return localStorage.getItem('vitacare_token');
}

function setToken(token) {
  localStorage.setItem('vitacare_token', token);
}

function removeToken() {
  localStorage.removeItem('vitacare_token');
  localStorage.removeItem('vitacare_user');
}

function getUser() {
  const user = localStorage.getItem('vitacare_user');
  return user ? JSON.parse(user) : null;
}

function setUser(user) {
  localStorage.setItem('vitacare_user', JSON.stringify(user));
}

function isLoggedIn() {
  return !!getToken();
}

function logout() {
  removeToken();
  window.location.href = '/login.html';
}

// Redirect if not logged in
function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

// Redirect if not correct role
function requireRole(...roles) {
  const user = getUser();
  if (!user || !roles.includes(user.role)) {
    alert('Access denied. You do not have permission to view this page.');
    window.location.href = '/dashboard.html';
    return false;
  }
  return true;
}

// API Helper
async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const options = { method, headers };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

// Update navbar based on auth state
function updateNavbar() {
  const navAuth = document.getElementById('nav-auth');
  const navUser = document.getElementById('nav-user');
  if (!navAuth || !navUser) return;

  if (isLoggedIn()) {
    const user = getUser();
    navAuth.style.display = 'none';
    navUser.style.display = 'flex';
    const userName = document.getElementById('nav-user-name');
    if (userName) userName.textContent = user ? user.name : 'User';
  } else {
    navAuth.style.display = 'flex';
    navUser.style.display = 'none';
  }
}

// Show toast notification
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Format date
function formatDate(dateStr) {
  if (!dateStr) return 'N/A';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// On page load
document.addEventListener('DOMContentLoaded', () => {
  updateNavbar();
});
