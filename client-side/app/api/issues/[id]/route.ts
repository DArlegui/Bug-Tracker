import { issueSchema } from '@/app/validationSchemas';
import { API_URL } from '@/environment';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { IssueType } from '../../IssueService';

export async function PATCH(request: NextRequest, { params }: { params: { id: number } }) {
  console.log('Patching Issue');
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  // If validation fails, return a 400 response with validation errors
  if (!validation.success || !params.id) {
    return NextResponse.json('PATCH Request error', { status: 400 });
  }

  try {
    // Send a PATCH request to update the issue
    const updatedIssue = await axios.patch(`${API_URL}/issues/${params.id}/edit`, body);

    // If the request fails, return a 400 response
    if (updatedIssue.status !== 200) {
      return NextResponse.json('Failed to update issue', { status: 400 });
    }

    // If successful, return the updated issue data
    const data: IssueType = updatedIssue.data;
    console.log('Patched Issue successfully');
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the request processing
    console.error('Error updating issue:', error);
    return NextResponse.json('Error updating issue', { status: 400 });
  }
}
