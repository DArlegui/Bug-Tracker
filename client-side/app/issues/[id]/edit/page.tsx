import { IssueType, getIssueId } from '@/app/api/IssueService';
import { notFound } from 'next/navigation';
import IssueForm from '../../_components/IssueForm';

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue: IssueType = await getIssueId(parseInt(params.id));

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
