import { getIssueId } from '@/app/api/IssueService';
import { issues as IssueType } from '@prisma/client';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import IssueFormSkeleton from '../../_components/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_components/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

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
