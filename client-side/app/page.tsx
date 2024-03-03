import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import Pagination from './components/Pagination';
import { Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const open = await prisma.issues.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issues.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issues.count({ where: { status: 'CLOSED' } });
  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      {/* <Pagination itemCount={100} pageSize={10} currentPage={parseInt(searchParams.page)} />; */}
      <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}
