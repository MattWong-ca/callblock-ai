// Mock authentication system to replace Supabase
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Session {
  access_token: string;
  user: User;
  expires_at: number;
}

// In-memory storage for demo purposes
let currentSession: Session | null = null;
const users: { [email: string]: { password: string; user: User } } = {};

export class MockAuth {
  static async signUp(email: string, password: string): Promise<{ user?: User; error?: string }> {
    if (users[email]) {
      return { error: 'User already exists' };
    }

    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      created_at: new Date().toISOString(),
    };

    users[email] = { password, user };
    
    return { user };
  }

  static async signIn(email: string, password: string): Promise<{ user?: User; session?: Session; error?: string }> {
    const userData = users[email];
    
    if (!userData || userData.password !== password) {
      return { error: 'Invalid email or password' };
    }

    const session: Session = {
      access_token: Math.random().toString(36).substr(2, 20),
      user: userData.user,
      expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    currentSession = session;
    
    return { user: userData.user, session };
  }

  static async signOut(): Promise<{ error?: string }> {
    currentSession = null;
    return {};
  }

  static async getSession(): Promise<{ session?: Session; error?: string }> {
    if (currentSession && currentSession.expires_at > Date.now()) {
      return { session: currentSession };
    }
    
    currentSession = null;
    return { session: null };
  }

  static async signInWithGoogle(): Promise<{ url?: string; error?: string }> {
    // Mock Google OAuth - in a real app, this would redirect to Google
    // For demo purposes, we'll create a mock user
    const mockGoogleUser: User = {
      id: 'google_' + Math.random().toString(36).substr(2, 9),
      email: 'demo@google.com',
      created_at: new Date().toISOString(),
    };

    const session: Session = {
      access_token: Math.random().toString(36).substr(2, 20),
      user: mockGoogleUser,
      expires_at: Date.now() + (24 * 60 * 60 * 1000),
    };

    currentSession = session;
    users[mockGoogleUser.email] = { password: '', user: mockGoogleUser };

    // Return a mock URL - in reality this would be Google's OAuth URL
    return { url: '/auth/callback?provider=google&success=true' };
  }
}