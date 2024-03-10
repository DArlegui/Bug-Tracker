import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const open = await prisma.issues.count({ where: { status: 'OPEN', deleted_flag: 0 } });
  const inProgress = await prisma.issues.count({ where: { status: 'IN_PROGRESS', deleted_flag: 0 } });
  const closed = await prisma.issues.count({ where: { status: 'CLOSED', deleted_flag: 0 } });
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};
