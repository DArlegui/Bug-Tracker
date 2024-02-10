import { API_URL } from '@/environment';
import { NextRequest, NextResponse } from 'next/server';

export const createIssue = async (request: NextRequest) => {
  const res = await fetch(`${API_URL}/issues`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: `Bearer ${getJwt()}`,
    },
    body: JSON.stringify(request.body),
  });

  const data = await res.json();
  console.log(data);
  return NextResponse.json(data, { status: res.status });
};
