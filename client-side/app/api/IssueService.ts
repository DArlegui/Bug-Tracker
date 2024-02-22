import { API_URL } from '@/environment';
import axios from 'axios';
import { issues } from '@prisma/client';

export async function getIssues() {
  try {
    const res = await axios.get(`${API_URL}/issues`, {
      headers: { 'Content-Type': 'application/json' },
    });

    console.log('fetching data');

    const data: { issues: issues[] } = await res.data;
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

    const data: issues = await res.data;
    return data;
  } catch (error) {
    console.error('Error getting issue:', error);
    return null;
  }
}
