import { API_URL } from '@/environment';
import { createIssueSchema } from '../validationSchemas';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

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

// export async function POST(request: NextRequest) {
//   const body = await request.json();

//   const validation = createIssueSchema.safeParse({ title: body.title, description: body.description });

//   if (!validation.success) {
//     throw new Error(validation.error.errors[0].message);
//   }

//   try {
//     const res = await axios.post(`${API_URL}/issues/new`, body, {
//       headers: {
//         'Content-Type': 'application/json',
//         // Authorization: `Bearer ${getJwt()}`,
//       },
//     });

//     if (!res.data) {
//       throw new Error('Failed to create issue');
//     }

//     return res.data;
//   } catch (error) {
//     // If there's an error during fetch or response status is not ok
//     console.error('Error creating issue:', error);
//     throw new Error('Please fill in all fields');
//   }
// }

export const getIssues = async () => {
  try {
    const res = await axios.get(`${API_URL}/issues`, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('fetching data');

    const data: { issues: IssueType[] } = await res.data;
    return data.issues;
  } catch (error) {
    console.error('Error getting issues:', error);
    return null;
  }
};

export const getIssueId = async (id: number) => {
  try {
    const res = await axios.get(`${API_URL}/issues/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.status !== 200) return null;

    const data = await res.data;
    return data;
  } catch (error) {
    console.error('Error getting issue:', error);
    return null;
  }
};
