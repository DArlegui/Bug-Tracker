import { API_URL } from '@/environment';

export interface IssueType {
  title: string;
  description: string;
}

export const createIssue = async (body: IssueType) => {
  try {
    const res = await fetch(`${API_URL}/issues/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${getJwt()}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      // If response status is not ok, throw an error
      throw new Error('Failed to create issue');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // If there's an error during fetch or response status is not ok
    console.error('Error creating issue:', error);
    throw new Error('Please fill in all fields');
  }
};
