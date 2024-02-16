import { issueSchema } from '@/app/validationSchemas';
import { API_URL } from '@/environment';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Creating issue');
  const body = await request.json();

  const validation = issueSchema.safeParse({ title: body.title, description: body.description });

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  try {
    const newIssue = await axios.post(`${API_URL}/issues/new`, body, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!newIssue.data) {
      return NextResponse.json('Failed to create issue', { status: 400 });
    }

    console.log('Issue created successfully');
    return NextResponse.json(newIssue.data, { status: 201 });
  } catch (error) {
    // If there's an error during fetch or response status is not ok
    console.error('Error creating issue:', error);
    return NextResponse.json('Please fill in all fields', { status: 400 });
  }
}
