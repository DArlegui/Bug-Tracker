import { IssueType, getIssueId } from '@/app/api/IssueService';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue: IssueType | null = await getIssueId(parseInt(params.id));
  console.log('from issues/[id]/edit page', issue?.id);

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
