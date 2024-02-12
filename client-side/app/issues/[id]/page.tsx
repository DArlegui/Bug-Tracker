import { IssueType, getIssueId } from '@/app/api/IssueService';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue: IssueType = await getIssueId(parseInt(params.id));
  console.log(issue);

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{new Date(issue.createdAt).toDateString()}</p>
    </div>
  );
};

export default IssueDetailPage;
