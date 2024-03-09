import { getIssueId } from '@/app/api/IssueService';
import authOptions from '@/app/auth/authOptions';
import prisma from '@/prisma/client';
import { issues as IssueType } from '@prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import AssigneeSelect from './AssigneeSelect';
import DeleteIssueButton from './DeleteIssueButton';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

interface Props {
  params: { id: string };
}

const fetchIssues = cache((issueId: number) => prisma.issues.findUnique({ where: { id: issueId } }));

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  // const issue: IssueType | null = await getIssueId(parseInt(params.id));
  const issue = await fetchIssues(parseInt(params.id));
  console.log('From issues/[id] Page', issue?.id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      {/* Takes 4 out of 5 columns */}
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex gap="4" direction="column">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchIssues(parseInt(params.id));

  return {
    title: issue?.title,
    description: 'Details if issue ' + issue?.id,
  };
}

export default IssueDetailPage;
