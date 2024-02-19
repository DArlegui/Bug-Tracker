import authOptions from '@/app/auth/authOptions';
import { issueSchema } from '@/app/validationSchemas';
import { API_URL } from '@/environment';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { IssueType } from '../../IssueService';
// import delay from 'delay';

export async function PATCH(request: NextRequest, { params }: { params: { id: number } }) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json('Unauthorized', { status: 401 });

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

export async function DELETE(request: NextRequest, { params }: { params: { id: number } }) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json('Unauthorized', { status: 401 });

  console.log('Deleting Issue');
  // await delay(2000); //For Testing purposes
  try {
    // Send a DELETE request to delete the issue
    const deletedIssue = await axios.delete(`${API_URL}/issues/${params.id}`);

    // If the request fails, return a 400 response
    if (deletedIssue.status !== 204) {
      return NextResponse.json('Failed to delete issue', { status: 404 });
    } else {
      console.log('Deleted Issue successfully');
      return NextResponse.json({ status: 204 });
    }
  } catch (error) {
    // Handle any errors that occur during the request processing
    console.error('Error deleting issue:', error);
    return NextResponse.json('Error deleting issue', { status: 400 });
  }
}
