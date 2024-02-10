import { API_URL } from '@/environment';

interface IssueForm {
  title: string;
  description: string;
}

export const createIssue = async (body: IssueForm) => {
  const res = await fetch(`${API_URL}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${getJwt()}`,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log(data);
  return data;
};
