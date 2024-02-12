import { API_URL } from '@/environment';
import { createIssueSchema } from '../validationSchemas';

export interface IssueType {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date | null;
}

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

export const createIssue = async (body: IssueType) => {
  const validation = createIssueSchema.safeParse({ title: body.title, description: body.description });

  if (!validation.success) {
    throw new Error(validation.error.errors[0].message);
  }

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

export const getIssues = async () => {
  try {
    const res = await fetch(`${API_URL}/issues`, {
      method: 'GET',
    });
    console.log('fetching data');

    const data: { issues: IssueType[] } = await res.json();
    return data.issues;
  } catch (error) {
    console.error('Error getting issues:', error);
    throw new Error('Failed to get issues');
  }
};

export const getIssueId = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}/issues/${id}`, {
      method: 'GET',
    });

    if (res.status === 404 || res.status === 400 || res.status === 500) {
      return null;
    }

    let data = await res.json();
    return data;
  } catch (error) {
    console.error('Error getting issue:', error);
    throw new Error('Failed to get issue');
  }
};
