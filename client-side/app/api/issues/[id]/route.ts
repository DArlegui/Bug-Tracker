// import { createIssueSchema } from '@/app/validationSchemas';
// import { API_URL } from '@/environment';
// import { NextRequest, NextResponse } from 'next/server';
// import axios from 'axios';

// export const getIssueId = async (request: NextRequest, { params }: { params: { id: string } }) => {
//   const body = await request.json();
//   const validation = createIssueSchema.safeParse(body);

//   if (!validation.success) return NextResponse.json(validation.error.format(), { status: 400 });

//   try {
//     const issue = await axios.get(`${API_URL}/issues/${params.id}`, {
//       method: 'GET',
//     });

//     if (issue.status === 404 || issue.status === 400 || issue.status === 500) {
//       return null;
//     }

//     let data = issue.data;
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     console.error('Error getting issue:', error);
//     throw new Error('Failed to get issue');
//   }
// };
