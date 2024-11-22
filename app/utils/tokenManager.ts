class TokenManager {
  private token: string | null = null;
  private onTokenInvalidCallback: (() => void) | null = null;

  setToken(token: string | null) {
    this.token = token;
    if (token) {
      localStorage.setItem("token", token);
    } else if (!token) {
      localStorage.removeItem("token");
    }
  }

  getToken() {
    if (this.token) return this.token;
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      this.token = storedToken;
      return storedToken;
    }

    return null;
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  onTokenInvalid(callback: () => void) {
    this.onTokenInvalidCallback = callback;
  }

  invalidateToken() {
    this.setToken(null);
    if (this.onTokenInvalidCallback) {
      this.onTokenInvalidCallback();
    }
  }
}

export const tokenManager = new TokenManager();
