export async function get(baseUrl: string, path: string, signal?: AbortSignal): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      signal,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    return response.json();
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.message);
    }
    throw new Error(err.message);
  }
}

export async function post<T>({
  baseUrl,
  path,
  body,
  signal,
}: {
  baseUrl: string;
  path: string;
  body?: Record<string, unknown>;
  signal?: AbortSignal;
}): Promise<T> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      signal,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
    });
    return response.json();
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }
}

export async function put<T>(baseUrl: string, path: string, body: string): Promise<T> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body,
    });
    return response.json();
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }
}

export async function remove<T>(baseUrl: string, path: string): Promise<T | null> {
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    return response.json();
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data.message);
    }
    throw new Error(err.message);
  }
}
