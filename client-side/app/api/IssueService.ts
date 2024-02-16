import { API_URL } from '@/environment';
import axios from 'axios';

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

export async function getIssues() {
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
}

export async function getIssueId(id: number) {
  try {
    const res = await axios.get(`${API_URL}/issues/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.status !== 200) return null;

    const data: IssueType = await res.data;
    return data;
  } catch (error) {
    console.error('Error getting issue:', error);
    return null;
  }
}

// export const updateIssue = async (id: number, status: Status): Promise<IssueType | null> => {
//   try {
//     const res = await axios.put(
//       `${API_URL}/issues/${id}/edit`,
//       { status },
//       { headers: { 'Content-Type': 'application/json' } }
//     );

//     if (res.status !== 200) {
//       throw new Error(`Failed to update issue: ${res.status}`);
//     }

//     const data: IssueType = await res.data;
//     return data;
//   } catch (error) {
//     console.error('Error updating issue:', error);
//     return null;
//   }
// };
