const baseUrl = "http://localhost:8080/api/v1";
const urls = {
  blogs: `${baseUrl}/blogs`,
  blogsId: `${baseUrl}/blogs`,
  blogsCreate: `${baseUrl}/blogs/create`,
  user: `${baseUrl}/user`,
  login: `${baseUrl}/auth/login`,
  register: `${baseUrl}/auth/register`,
};

// Signup
export function signupUser(username: string, password: string) {
  return fetch(urls.register, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}


// Login
export function loginUser(username: string, password: string) {
  return fetch(urls.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

// Get all blogs
export function getAllBlogs() {
  return fetch(urls.blogs, {
    method: "GET",
  });
}

// Get a single blog
export function getBlog(id: string) {
  return fetch(`${urls.blogsId}/${id}`, {
    method: "GET",
  });
}

// Create a new blog
export function createBlog(title: string, content: string) {
  return fetch(urls.blogsCreate, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      title,
      content,
    }),
  });
}

// Get user
export function getUser() {
  return fetch(urls.user, {
    method: "GET",
    credentials: 'include'
  });
}

// logout user
export function logoutUser() {
  return fetch("/api/logout", {
    method: "POST",
  });
}
